import React, { Component } from 'react';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import LoginUser from './layouts/LoginUser/LoginUser';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
class RouterWrap extends Component {
    render() {
        return (
            <Router browserHistory>
                <Switch>

                <Route  name={'DefaultLayout'} path={'/main'}  component={DefaultLayout} />
                <Route  name={'LoginUser'} path={'/'} exact component={LoginUser} />
                </Switch>
            </Router>
        );
    }
}
export default RouterWrap;