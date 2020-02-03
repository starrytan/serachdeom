import React from "react";
import styles from "../../static/css/components.module.css";
import Login from "./login";
import Register from "./register";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginshow: false,
      registershow: true
    };
  }
  openlg = () => {
    this.setState({
      loginshow: true
    });
  };
  openreg=() => {
    this.setState({
      registershow: true
    });
  };
  close=(type)=>{
      if(type=='login'){
          this.setState({
            loginshow:false
          });
      }else{
          this.setState({
            registershow: false
          });
      }
  }
  render() {
    return (
      <div className={styles.header}>
        <div className={styles.headerbox}>
          <div>学习系统</div>
          <div>
            <span onClick={this.openreg}>注册</span>
            <span onClick={this.openlg}>登录</span>
          </div>
        </div>
        {this.state.loginshow ? <Login openreg={this.openreg} close={this.close} /> : ""}
        {this.state.registershow ? <Register openlg={this.openlg} close={this.close} /> : ""}
      </div>
    );
  }
}
export default Header;
