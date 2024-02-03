import {ADD_THOUGHT} from "./ThoughtsActions";
import {callFirestore} from "../../index";
import {firestore} from "firebase";

export const addThought = (thought:any) => {
    return (dispatch:any, getState:any) => {
        // Check whether user is authenticated
        if(!getState().firebase.auth.isEmpty) {
            Object.assign(thought, {user: getState().firebase.auth.uid});
            Object.assign(thought, {timestamp: firestore.Timestamp.fromDate(new Date())});

            callFirestore.collection('thoughts').add({
                ...thought
            }).then(() => {
                dispatch({ type: ADD_THOUGHT, thought });
            }).catch((error:any) => {
                console.log(error);
            })
        }
    }
};