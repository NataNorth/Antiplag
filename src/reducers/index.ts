import {CheckPlagRoutine, AddTextRoutine} from '../sagas/routines'
import {reducer as toastrReducer} from 'react-redux-toastr'
import {combineReducers} from 'redux';

export interface IState {
    text?: string;
    answer?: string;
    isLoading: boolean;
}

const initialState = {
    isLoading: false
};

const mainReducer = (state: IState = initialState, action: any) => {
    switch(action.type) {
        case AddTextRoutine.TRIGGER:
        case CheckPlagRoutine.TRIGGER:
            return { 
                ...state,
                isLoading: true
            };
        case AddTextRoutine.FAILURE:
        case AddTextRoutine.SUCCESS:
        case CheckPlagRoutine.FAILURE:
            return {
                ...state,
                isLoading: false
            };
        case CheckPlagRoutine.SUCCESS:
            return {
                ...state,
                isLoading: false,
                answer: action.payload
            };
        default:
            return state;
    }
}

const reducers = {
    mainReducer: mainReducer,
    toastr: toastrReducer
}

export default combineReducers(reducers);