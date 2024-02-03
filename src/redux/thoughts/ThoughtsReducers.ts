import _ from "lodash";
import {ADD_THOUGHT} from "./ThoughtsActions";
import {ThoughtsList} from "../../models/thoughts-models/ThoughtsModels";

export interface ThoughtsState {
    thoughtsList: ThoughtsList
}

export const thoughtsInitialState:any = {

};

function addThoughtsReduction(state:any, action:any) {
    const newState = _.cloneDeep(state);
    console.log(action.thought);
    return newState;
}

export const ThoughtsReducers = {
    [ADD_THOUGHT]: addThoughtsReduction
};