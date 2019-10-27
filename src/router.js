import React from 'react';
import { Router,Route,Switch,Redirect } from 'react-router-dom';
import asyncComponent from './static/jsx/asyncComponent';
import {createBrowserHistory} from 'history';
const history = createBrowserHistory()
class RouteConfig extends React.Component{
    render(){
        return(
            <Router history={history}>
            <Switch>
                <Route path='/index' component={asyncComponent(()=>import('./view/index/index.jsx'))} />
                <Route path='/details/:id' component={asyncComponent(()=>import('./view/details/details.jsx'))} />
                <Redirect from='/' to='/index' />
            </Switch>
            </Router>
        )
    }
}
export default RouteConfig;