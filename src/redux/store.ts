import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {thoughtsInitialState, ThoughtsReducers, ThoughtsState} from "./thoughts/ThoughtsReducers";

const allReducers:any = {
    ThoughtsReducers
};

export interface State {

}

const initialState:State = {

};

const persistConfig = {
    key: 'root',
    storage,
    whitelist: []
};

export const reduxStore = persistReducer(persistConfig, function reduxStore(state:State = initialState, action:any) {
    if ( allReducers.hasOwnProperty(action.type) ) {
        return allReducers[action.type](state, action)
    } else {
        return state
    }
});


