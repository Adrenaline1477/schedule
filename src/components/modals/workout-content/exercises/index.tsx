import { FC } from 'react';
import { STEP_MODAL } from '..';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hook';
import { setStepWorkoutModale, setTempIdExercise } from '../../../../store/slices/modaleSlice';
import { getWorkoutById } from '../../../../store/selectors';
import { MdArrowBack } from 'react-icons/md';
import _ from 'lodash';
import { ExerciseInWorkoutOnCalendar } from '../../../../types/workout';
import { getSortedExerciseByPosition } from '../../../../utils/exercise';
import styles from './index.module.scss';

export const Exercises: FC = () => {
    const dispatch = useAppDispatch();
    const { exercises, workoutName } = useAppSelector(getWorkoutById);
    const sortByExerciseNumber = getSortedExerciseByPosition(exercises);
    const exerciseClickHandler = (id: string) => {
        dispatch(setStepWorkoutModale(STEP_MODAL.SETS));
        dispatch(setTempIdExercise(id));
    };
    const cn = (ex: ExerciseInWorkoutOnCalendar) => {
        if (ex.sets?.every((set) => set.amount && set.weight)) {
            return `${styles.item} ${styles.complete}`;
        } else if (ex.sets?.some((set) => set.amount || set.weight)) {
            return `${styles.item} ${styles.partly}`;
        } else {
            return `${styles.item}`;
        }
    };
    return (
        <div className={styles.content}>
            <span className={styles.back} onClick={() => dispatch(setStepWorkoutModale(STEP_MODAL.WORKOUTS))}>
                <MdArrowBack size={20} />
            </span>
            <h3 className={styles.title}>{workoutName}</h3>
            <ul>
                {sortByExerciseNumber.map((ex) => (
                    <li key={ex.id} onClick={() => exerciseClickHandler(ex.id)} className={cn(ex)}>
                        {ex.position}. {ex.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};
