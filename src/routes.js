import React from 'react';
import {
    Switch,
    Route,
    BrowserRouter
} from 'react-router-dom';

import App from './pages/App';
import Login from './pages/Login';
import Register from './pages/Register';
import Forgot from './pages/Forgot';

export default (
    <BrowserRouter>
        <App>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/forgot" component={Forgot} />
            </Switch>
        </App>
    </BrowserRouter>
);