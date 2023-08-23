import _ from 'lodash';

import { removeExercise, setNewExercise, updateExercise } from '@/store/exercises/slice';
import { BasicExercise, EXERCISE_CATEGORY } from '@/types/workout';
import { HOW_TO_CHANGE_EXERCISE } from '@/types/workout';
import { getCategoryExercise } from '@/utils/exercise';
import { getCurrentUserId } from '@/utils/user';

import { createAppThunk } from '../utils/thunk';

import { ExerciseDataThunk } from './types';

export const changeExerciseAsync = createAppThunk(
    'exercise/changeExercise',
    (exerciseData: ExerciseDataThunk) =>
        async (
            dispatch: (arg0: { payload: any; type: string }) => void,
            getState: () => { exercise: { exerciseList: any } },
        ) => {
            const { exercise, howToChange } = exerciseData;
            const uid = getCurrentUserId(getState);
            const {
                exercise: { exerciseList },
            } = getState();
            const category = getCategoryExercise(exercise.category as EXERCISE_CATEGORY);

            try {
                // Simulate asynchronous operations here (e.g., API calls, database queries)
                switch (howToChange) {
                    case HOW_TO_CHANGE_EXERCISE.CREATE:
                        dispatch(setNewExercise({ exercise, category }));
                        return;
                    case HOW_TO_CHANGE_EXERCISE.DELETE:
                        dispatch(removeExercise({ exercise, category }));
                        return;
                    case HOW_TO_CHANGE_EXERCISE.UPDATE:
                        const updatedExerciseCategory: BasicExercise[] = exerciseList[category].map(
                            (ex: BasicExercise) => (ex.id === exercise.id ? exercise : ex),
                        );
                        dispatch(updateExercise({ updatedExerciseCategory, category }));
                        return;
                }
            } catch (error: any) {
                console.log(error.message);
            }
        },
);
