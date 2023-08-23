import {
    addOrEditUserWorkout,
    deleteUserWorkout,
    setIsLoadingWorkout,
    workoutsFetchComplete,
} from '@/store/workout/slice';
import { workoutsToCalendarFetchComplete } from '@/store/workout-on-calendar/slice';
import { EnqueueSnackbar } from '@/types/other';
import { Workout, WorkoutOnCalendar } from '@/types/workout';
import { ExerciseListType } from '@/types/workout';
import { Dispatch } from '@reduxjs/toolkit';

import { exerciseListFetchComplete } from '../exercises/slice';

// Моки функций для работы с данными
const addOrEditWorkoutToStorage = async (uid: any, workout: any) => {
    // Здесь можно добавить логику для сохранения тренировки
};

const deleteWorkoutFromStorage = async (uid: any, id: any) => {
    // Здесь можно добавить логику для удаления тренировки
};

const fetchWorkoutsDataFromStorage = async (uid: any) => {
    // Здесь можно добавить логику для получения данных о тренировках
};

export const createOrEditWorkout = (
    workout: WorkoutOnCalendar | Workout,
    type: 'edit' | 'create',
    enqueueSnackbar: EnqueueSnackbar,
) => {
    return async (dispatch: Dispatch, getState: any) => {
        const uid = 'user123'; // Пример ID пользователя
        try {
            if (type === 'create') {
                await addOrEditWorkoutToStorage(uid, workout);
                enqueueSnackbar('Тренировка создана, теперь вы можете добавить её на календарь', {
                    variant: 'success',
                });
            } else {
                await addOrEditWorkoutToStorage(uid, workout);
                enqueueSnackbar('Тренировка отредактирована', { variant: 'success' });
            }
            dispatch(addOrEditUserWorkout(workout as WorkoutOnCalendar));
        } catch (err) {
            console.log(err);
            enqueueSnackbar('Не получилось создать/отредактировать тренировку', { variant: 'error' });
        }
    };
};

export const deleteWorkout = (id: string, enqueueSnackbar: EnqueueSnackbar) => {
    return async (dispatch: Dispatch, getState: any) => {
        const uid = 'user123'; // Пример ID пользователя
        try {
            await deleteWorkoutFromStorage(uid, id);
            dispatch(deleteUserWorkout(id));
            enqueueSnackbar('Тренировка успешно удалена', { variant: 'success' });
        } catch (err) {
            console.log(err);
            enqueueSnackbar('Не получилось удалить тренировку', { variant: 'error' });
        }
    };
};

export const loadWorkoutsData = () => {
    return async (dispatch: Dispatch, getState: any) => {
        dispatch(setIsLoadingWorkout(true));
        const uid = 'user123'; // Пример ID пользователя
        try {
            const workoutsData = await fetchWorkoutsDataFromStorage(uid);

            // Остальной код для обработки данных
        } catch (err) {
            console.log(err);
        }
        dispatch(setIsLoadingWorkout(false));
    };
};
