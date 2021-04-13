import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Error from "./views/Error";
import UploadV from "./views/UploadV";
import { AuthContext } from "./context/AuthContext";
import VideoComponent from "./views/VideoComponent";

const App = () => (
    <AuthContext>
        <Router>
            <Switch>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/">
                    <Dashboard />
                </Route>
                <Route exact path="/video/:id">
                    <VideoComponent />
                </Route>
                <Route exact path="/upload">
                    <UploadV />
                </Route>
                <Route path="*">
                    <Error />
                </Route>
            </Switch>
        </Router>
    </AuthContext>
);

export default App;
