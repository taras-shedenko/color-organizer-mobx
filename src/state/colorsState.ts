// Implemantation of the application's state

import { useReducer } from 'react';
import { v4 } from 'uuid';

import { ColorsList } from '../types';
import {
    AddColorAction,
    RateColorAction,
    DeleteColorAction,
    ColorActions,
} from './types';

/**
 * Add Color reducer
 * @param colors - current Colors list
 * @param action - action object
 */
export const addColor = (
    colors: ColorsList,
    action: AddColorAction
): ColorsList => [
    ...colors,
    {
        id: v4(),
        title: action.title,
        color: action.color,
        rating: action.rating,
    },
];

/**
 * Rate Color reducer
 * @param colors - current Colors list
 * @param action - action object
 */
export const rateColor = (
    colors: ColorsList,
    action: RateColorAction
): ColorsList =>
    colors.map(color =>
        color.id == action.id ? { ...color, rating: action.rating } : color
    );

/**
 * Delete Color reducer
 * @param colors - current Colors list
 * @param action - action object
 */
export const deleteColor = (
    colors: ColorsList,
    action: DeleteColorAction
): ColorsList => colors.filter(color => color.id != action.id);

/**
 * Reducer implementation
 * @param state - current state
 * @param action - action to perform
 */
export const colorsReducer = (
    state: ColorsList,
    action: ColorActions
): ColorsList => {
    switch (action.type) {
        case 'ADD_COLOR':
            return addColor(state, action);
        case 'RATE_COLOR':
            return rateColor(state, action);
        case 'DELETE_COLOR':
            return deleteColor(state, action);
        default:
            return state;
    }
};

/**
 * A wrapper function which saves reducer's result to the LocalStorage
 * @param state - current state to send to the reducer
 * @param action - action to perform to send to the reducer
 */
const colorsReducerWithStorage = (
    state: ColorsList,
    action: ColorActions
): ColorsList => {
    const newState = colorsReducer(state, action);
    localStorage.setItem('color-organizer', JSON.stringify(newState));
    return newState;
};

/**
 * Get inititial state from the LocalStorage
 */
const initialState: ColorsList =
    JSON.parse(String(localStorage.getItem('color-organizer'))) || [];

/**
 * API of the Color State
 * @colors - current state
 * @addColor - add a color to the state
 * @setRating - set color's rating
 * @deleteColor - remove a color from the state
 */
export type ColorsStateApi = {
    colors: ColorsList;
    addColor: (title: string, color: string, rating: number) => void;
    rateColor: (id: string, rating: number) => void;
    deleteColor: (id: string) => void;
};

/**
 * Export State's API
 * state itself and action creators
 */
export const useColorsState = (): ColorsStateApi => {
    const [state, dispatch] = useReducer(
        colorsReducerWithStorage,
        initialState
    );

    const dispachAddColor = (
        title: string,
        color: string,
        rating: number
    ): void =>
        dispatch({
            type: 'ADD_COLOR',
            title,
            color,
            rating,
        });

    const dispatchRateColor = (id: string, rating: number): void =>
        dispatch({
            type: 'RATE_COLOR',
            id,
            rating,
        });

    const dispatchDeleteColor = (id: string): void =>
        dispatch({
            type: 'DELETE_COLOR',
            id,
        });

    return {
        colors: state,
        addColor: dispachAddColor,
        rateColor: dispatchRateColor,
        deleteColor: dispatchDeleteColor,
    };
};
