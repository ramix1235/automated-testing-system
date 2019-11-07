import React from 'react';
import {
    Switch,
    Route,
    BrowserRouter,
    Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';

import createStore from './store/store';

import App from './pages/App';
import Auth from './pages/Auth';
import Main from './pages/Main';

const store = createStore();

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => {
        const token = localStorage.getItem('token');

        return token ? <Component {...props} /> : <Redirect to='/login' />
    }} />
);

export default (
    <Provider store={store}>
        <BrowserRouter>
            <App>
                <Switch>
                    <PrivateRoute exact path="/" component={Main} />
                    {/* <Route exact path="/login" render={props => <Auth {...props} type="login" />} />
                    <Route exact path="/register" render={props => <Auth {...props} type="register" />} />
                    <Route exact path="/forgot" render={props => <Auth {...props} type="forgot" />} /> */}
                    <Route exact path="/login" component={() => <Auth type="login" />} />
                    <Route exact path="/register" component={() => <Auth type="register" />} />
                    <Route exact path="/forgot" component={() => <Auth type="forgot" />} />
                </Switch>
            </App>
        </BrowserRouter>
    </Provider>
);