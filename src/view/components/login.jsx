import React from 'react';
import styles from '../../static/css/components.module.css';
import { Icon } from "antd";

class Login extends React.Component{
    render(){
        return (
          <div className="alertmasking">
            <div className={styles.alertbox}>
              <Icon onClick={()=>{this.props.close('login')}} className={styles.alertclose} type="close" />
            </div>
          </div>
        );
    }
}
export default Login;