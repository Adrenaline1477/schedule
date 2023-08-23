import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import {
    addSomeWorkoutsToCalendar,
    addWorkoutToCalendar,
    deleteSomeWorkoutFromCalendar,
    deleteWorkoutFromCalendar,
    setIsLoadingWorkoutCalendar,
    updateExerciseInWorkoutOnCalendar,
} from '@/store/workout-on-calendar/slice';
import { EnqueueSnackbar } from '@/types/other';
import {
    DELETE_WORKOUT_FROM_CALENDAR,
    ExerciseInWorkoutOnCalendar,
    HOW_TO_REPEAT,
    WorkoutOnCalendar,
} from '@/types/workout';
import { generateArrWorkoutsForCalendar, getArrWorkoutsIdToDelete, getWorkoutsDates } from '@/utils/workout';
import { Dispatch } from '@reduxjs/toolkit';

import { RootState } from '..';

// Моки функций для работы с данными
const addWorkoutToStorage = async (uid: any, workout: any) => {
    // Здесь можно добавить логику сохранения тренировки
};

const deleteWorkoutFromStorage = async (uid: any, id: any, type: any) => {
    // Здесь можно добавить логику удаления тренировки
};

const updateExerciseInWorkoutOnStorage = async (
    uid: any,
    selectedWorkoutId: any,
    selectedExerciseId: any,
    exercise: any,
) => {
    // Здесь можно добавить логику обновления упражнения в тренировке
};

export const addWorkoutToCalendarAsync = (
    workout: WorkoutOnCalendar,
    howToRepeat: HOW_TO_REPEAT,
    repeatInterval: number,
    enqueueSnackbar: EnqueueSnackbar,
) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        dispatch(setIsLoadingWorkoutCalendar(true));
        const uid = uuidv4(); // Пример ID пользователя
        const setWorkoutsData = async (
            howToRepeat: HOW_TO_REPEAT,
            workout: WorkoutOnCalendar,
            repeatInterval?: number,
        ) => {
            const workoutDates = getWorkoutsDates(howToRepeat, workout, repeatInterval);
            const workoutsArr = generateArrWorkoutsForCalendar(workout, workoutDates);

            try {
                // Сохраняем тренировки в "хранилище"
                await addWorkoutToStorage(uid, workoutsArr);

                dispatch(setIsLoadingWorkoutCalendar(false));
                dispatch(addSomeWorkoutsToCalendar(workoutsArr));
                enqueueSnackbar('Тренировки на календарь успешно добавлены', { variant: 'success' });
            } catch (err) {
                console.log(err);
                enqueueSnackbar('Не удалось добавить тренировку', { variant: 'error' });
            }
        };

        try {
            // Остальная часть кода без Firebase
        } catch (err) {
            console.log(err);
            enqueueSnackbar('Не удалось добавить тренировку', { variant: 'error' });
        }
    };
};

export const deleteWorkoutFromCalendarAsync = (
    id: string,
    type: DELETE_WORKOUT_FROM_CALENDAR,
    enqueueSnackbar: EnqueueSnackbar,
) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        dispatch(setIsLoadingWorkoutCalendar(true));
        const uid = uuidv4(); // Пример ID пользователя
        const {
            workoutCalendar: { workoutsOnTheCalendar },
        } = getState() as RootState;

        try {
            // Остальная часть кода без Firebase
        } catch (err) {
            console.log(err);
            enqueueSnackbar('Не получилось удалить тренировку', { variant: 'error' });
        }

        dispatch(setIsLoadingWorkoutCalendar(false));
    };
};

export const updateExerciseInWorkoutOnCalendarAsync = (exercise: ExerciseInWorkoutOnCalendar) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        const {
            modal: {
                workoutModal: { selectedExerciseId, selectedWorkoutId },
            },
        } = getState();

        if (!selectedExerciseId || !selectedWorkoutId) {
            return;
        }

        try {
            // Остальная часть кода без Firebase
        } catch (err) {
            console.log(err);
        }
    };
};
