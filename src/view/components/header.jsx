import React from "react";
import styles from "../../static/css/components.module.css";
import Login from "./login";
import Register from "./register";
import { Icon, Input } from "antd";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginshow: false,
      registershow: false,
      keyword: ""
    };
  }
  openlg = () => {
    this.setState({
      loginshow: true
    });
  };
  openreg = () => {
    this.setState({
      registershow: true
    });
  };
  close = type => {
    if (type == "login") {
      this.setState({
        loginshow: false
      });
    } else {
      this.setState({
        registershow: false
      });
    }
  };
  search = () => {
    console.log("搜索");
  };
  entersearch = e => {
    if (e.keyCode === 13) {
      this.search();
    }
  };
  keywordchange=(e)=>{
    this.setState({
      keyword: e.target.value
    });
  };
  render() {
    return (
      <div className={styles.header}>
        <div className={styles.headerbox}>
          <div>学习系统</div>
          <div className="flexstart">
            <div className={styles.searchbox}>
              <Input
                onKeyDown={this.entersearch}
                value={this.state.keyword}
                onChange={this.keywordchange}
                placeholder="搜索"
                suffix={
                  <Icon
                    onClick={this.search}
                    style={{ cursor: "pointer" }}
                    type="search"
                  />
                }
              />
            </div>
            <div className={`${styles.lgbox} flexstart`}>
              <span onClick={this.openreg}>注册</span>
              <span onClick={this.openlg}>登录</span>
            </div>
          </div>
        </div>
        {this.state.loginshow ? (
          <Login openreg={this.openreg} close={this.close} />
        ) : (
          ""
        )}
        {this.state.registershow ? (
          <Register openlg={this.openlg} close={this.close} />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default Header;
