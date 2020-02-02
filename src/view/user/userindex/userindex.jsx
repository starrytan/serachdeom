import React from 'react'
import { Route, Switch } from "react-router-dom";
import Login from "../../user/login/login.jsx";
import Register from "../../user/register/register";
import Header from '../../components/header';
class Userindex extends React.Component {
    render() {
        return (
          <div>
            <Header />
            <div className="mainbox">
              <Route path="/userindex/Login" component={Login} />
              <Route path="/userindex/Register" component={Register} />
            </div>
          </div>
        );
    }
}
export default Userindex;