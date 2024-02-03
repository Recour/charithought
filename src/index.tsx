import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from "redux";
import {persistStore} from "redux-persist";
import {reduxStore} from "./redux/store";
import {composeWithDevTools} from "redux-devtools-extension";
import {ReactReduxFirebaseProvider, firebaseReducer} from "react-redux-firebase";
import {createFirestoreInstance, firestoreReducer} from "redux-firestore";
import thunk from "redux-thunk";
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDW3MJmFpUOVkea1W4AP6sIkLdsdnTl27k",
    authDomain: "share-a-thought-64ca8.firebaseapp.com",
    databaseURL: "https://share-a-thought-64ca8.firebaseio.com",
    projectId: "share-a-thought-64ca8",
    storageBucket: "share-a-thought-64ca8.appspot.com",
    messagingSenderId: "561115683102",
    appId: "1:561115683102:web:3c637374ee072015c7d10f",
    measurementId: "G-33BJ33RQDL"
};

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true,
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const callFirestore = firebaseApp.firestore();
export const firebaseInst = firebase;

const rootReducer = combineReducers({
    store: reduxStore,
    firebase: firebaseReducer,
    firestore: firestoreReducer
});

const initialState = {};

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
const pStore = persistStore(store);

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
};

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App/>
        </ReactReduxFirebaseProvider>
    </Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();