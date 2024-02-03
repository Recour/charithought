import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import FeedView from "./features/feed/views/FeedView";
import ThoughtDetailView from './features/thought-detail/views/ThoughtDetailView';
import Navbar from "./features/core/components/Navbar";
import ProfileView from "./features/profile/views/ProfileView";
import { Scrollbars } from 'react-custom-scrollbars';
import DonateView from "./features/donate/views/DonateView";
import AuthenticatedRoute from "./shared/AuthenticatedRoute";
import LandingView from "./features/landing/views/LandingView";

function App() {
    return (
        <div className="App">
            <Router>
                <Scrollbars style={{height: '100%'}} autoHide={true} autoHideTimeout={0}>
                    <Navbar/>

                    <Switch>
                        <AuthenticatedRoute exact path={"/profile"} component={ProfileView}/>
                        <AuthenticatedRoute exact path={"/donate"} component={DonateView}/>
                        <Route exact path={"/thought/:id"} component={ThoughtDetailView}/>
                        <Route exact path={"/feed"} component={FeedView}/>
                        <Route exact path={"/"} component={LandingView}/>
                    </Switch>
                </Scrollbars>
            </Router>
        </div>
    );
}

export default App;
