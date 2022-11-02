import { FC, memo } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

import { ButtonOutline } from '@/components/buttons/button-outline';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { getMonthIndex, getWorkoutCalendarError } from '@/store/selectors';
import { changeDaySelected, setModaleWorkoutIsOpen, setStepWorkoutModale } from '@/store/slices/modaleSlice';
import { decMonthIndex, incMonthIndex, resetMonthIndex } from '@/store/slices/monthSlice';
import { STEP_MODAL } from '@/types/modal';
import { getCurrentDay, getYear } from '@/utils/dayjs';
import Alert from '@mui/material/Alert';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

import styles from './index.module.scss';

export const CalendarHeader: FC = memo(() => {
    console.log('render');
    const dispatch = useAppDispatch();
    const monthIndex = useAppSelector(getMonthIndex);
    const error = useAppSelector(getWorkoutCalendarError);
    const buttonClickHandler = (reducer: ActionCreatorWithoutPayload<string>) => {
        dispatch(reducer());
    };
    const workoutForDayClickHandler = () => {
        dispatch(changeDaySelected(getCurrentDay()));
        dispatch(setStepWorkoutModale(STEP_MODAL.WORKOUTS));
        dispatch(setModaleWorkoutIsOpen(true));
    };
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.wrapperGroupBtn}>
                    <div className={styles.btnWrapper}>
                        <ButtonOutline text="Тренировка на сегодня" handleClick={workoutForDayClickHandler} />
                    </div>
                </div>
                <div className={styles.wrapperGroupBtn}>
                    <div className={styles.btnWrapper}>
                        <ButtonOutline text="Сегодня" handleClick={() => buttonClickHandler(resetMonthIndex)} />
                    </div>
                    <div className={styles.arrowWrapper} onClick={() => buttonClickHandler(decMonthIndex)}>
                        <MdArrowBackIosNew />
                    </div>
                    <div className={styles.arrowWrapper} onClick={() => buttonClickHandler(incMonthIndex)}>
                        <MdArrowForwardIos />
                    </div>
                    <h3 className={styles.data}>{getYear(monthIndex)}</h3>
                </div>
            </div>
            {error && (
                <Alert
                    severity="error"
                    sx={{
                        position: 'absolute',
                        width: '70%',
                        left: '50%',
                        top: '10%',
                        translate: '-50%',
                    }}
                >
                    {error}
                </Alert>
            )}
        </>
    );
});
