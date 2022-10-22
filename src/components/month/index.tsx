import { type Dayjs } from 'dayjs';
import React, { memo, useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux-hook';
import { getMonthIndex, getWorkoutsForCalendar } from '../../store/selectors';
import { getMonthMatrix } from '../../utils/dayjs';
import { getWorkoutsForMonth } from '../../utils/workout';
import { Day } from '../day';
import styles from './index.module.scss';

export const Month: React.FC = memo(() => {
    console.log('render');
    const [currentMonth, setCurrentMonth] = useState(getMonthMatrix()); // В стейте двумерный массив

    const monthIndex = useAppSelector(getMonthIndex);
    const workoutsForCalendar = useAppSelector(getWorkoutsForCalendar);

    useEffect(() => {
        setCurrentMonth(getMonthMatrix(monthIndex));
    }, [monthIndex]);

    const workoutsForMonth = getWorkoutsForMonth(workoutsForCalendar, monthIndex);

    return (
        <div className={styles.wrapper}>
            {currentMonth.map((row: Dayjs[], i: number) => (
                <React.Fragment key={i}>
                    {row.map((day: Dayjs, index: number) => (
                        <Day day={day} key={index} row={i} workoutsForMonth={workoutsForMonth} />
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
});
