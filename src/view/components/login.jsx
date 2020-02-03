import React from "react";
import styles from "../../static/css/components.module.css";
import { Form, Input, Button, Icon } from "antd";

class Login extends React.Component {
  constructor(props){
    super(props)
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  openreg= ()=>{
    this.props.close("login");
    this.props.openreg();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="alertmasking">
        <div className={styles.alertbox}>
          <div className={styles.alerttitle}>登录</div>
          <Icon
            onClick={() => {
              this.props.close("login");
            }}
            className={styles.alertclose}
            type="close"
          />
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [{ required: true, message: "请输入用户名" }]
              })(<Input placeholder="请输入用户名" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "请输入密码" }]
              })(<Input type="password" placeholder="请输入密码" />)}
            </Form.Item>
            <Form.Item>
              <div className="flexbet">
                <span>
                  没有账号？
                  <a onClick={this.openreg} className="textbtn">
                    立即注册
                  </a>
                </span>
                <a className="textbtn">忘记密码</a>
              </div>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className={styles.btn1}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Login);
export default WrappedNormalLoginForm;
