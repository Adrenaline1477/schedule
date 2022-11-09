import { FC, RefObject, useMemo, useRef } from 'react';
import { Dayjs } from 'dayjs';

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { selectSelectedDay, selectTempIdWorkout } from '@/store/modal/selectors';
import { changeDaySelected, setModalWorkoutIsOpen, setStepWorkoutModal, setTempIdWorkout } from '@/store/modal/slice';
import { DAY_FORMAT } from '@/types/day';
import { STEP_MODAL } from '@/types/modal';
import { WorkoutOnCalendar } from '@/types/workout';
import { getCurrentDay, getMonthIndexFromDate, getMonthIndexFromZeroToEleven } from '@/utils/dayjs';
import { getWorkoutForTheDay } from '@/utils/workout';
import Slide from '@mui/material/Slide';

import styles from './index.module.scss';

interface DayProps {
    day: Dayjs;
    row: number;
    workoutsForMonth: WorkoutOnCalendar[];
    monthIndex: number;
    changeDayRef: (ref: RefObject<any>) => void;
}

export const Day: FC<DayProps> = ({ day, row, workoutsForMonth, monthIndex, changeDayRef }) => {
    const dispatch = useAppDispatch();
    const selectedWorkoutId = useAppSelector(selectTempIdWorkout);
    const daySelected = useAppSelector(selectSelectedDay);

    const dayRef = useRef(null);

    const dayFormat = day.format(DAY_FORMAT.YYYY_MM_DD);
    const isDayNotThisMonth = day.month() !== getMonthIndexFromZeroToEleven(monthIndex);

    const workoutsForTheDay = useMemo(() => {
        return getWorkoutForTheDay(dayFormat, workoutsForMonth);
    }, [workoutsForMonth]);

    const clickHandler = (type: 'workout' | 'day', id?: string) => {
        if (!isDayNotThisMonth) {
            changeDayRef(dayRef);
            dispatch(changeDaySelected(dayFormat));
            dispatch(setModalWorkoutIsOpen(true));
            if (type === 'workout') {
                dispatch(setTempIdWorkout(id!));
                dispatch(setStepWorkoutModal(STEP_MODAL.EXERCISES));
            }
            if (type === 'day') {
                dispatch(setStepWorkoutModal(STEP_MODAL.WORKOUTS));
            }
        }
    };

    const dayCN = () => {
        const currentDayClass = dayFormat === getCurrentDay() ? `${styles.currentDay}` : '';
        const dayNotThisMonth = isDayNotThisMonth ? `${styles.dayOfTheLastMonth}` : '';
        const daySelectedClass = daySelected === dayFormat ? `${styles.daySelect}` : '';
        return `${styles.wrapper} ${currentDayClass} ${dayNotThisMonth} ${daySelectedClass}`;
    };

    const workoutCN = (id: string) => {
        const workoutClass =
            getMonthIndexFromDate(dayFormat) !== getMonthIndexFromZeroToEleven(monthIndex)
                ? `${styles.workout} ${styles.disabled}`
                : `${styles.workout}`;
        const workoutSelected = selectedWorkoutId === id ? `${styles.selectWorkout}` : '';
        return `${workoutClass} ${workoutSelected}`;
    };

    return (
        <div className={dayCN()} onClick={() => clickHandler('day')} ref={dayRef}>
            <div className={styles.dayHeader}>
                {row === 0 && <span className={styles.dayWeek}>{day.format('dd').toUpperCase()}</span>}
                <span className={styles.number}>{day.format('DD')}</span>
            </div>
            <div className={styles.workoutList}>
                {workoutsForTheDay.map(({ id, workoutName, color }) => (
                    <Slide key={id} direction="right" in={!!workoutName} mountOnEnter unmountOnExit>
                        <div
                            style={{ backgroundColor: color }}
                            className={workoutCN(id)}
                            onMouseDown={() => clickHandler('workout', id)}
                        >
                            {workoutName}
                        </div>
                    </Slide>
                ))}
            </div>
        </div>
    );
};
