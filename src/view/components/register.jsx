import React from "react";
import styles from "../../static/css/components.module.css";
import { Form, Input, Button, Icon,Select } from "antd";
import Sendcode from "./sendcode";
class Register extends React.Component {
    handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { Option } = Select;
        const prefixSelector = getFieldDecorator("prefix", {
          initialValue: "86"
        })(
          <Select style={{ width: 70 }}>
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
          </Select>
        );
    return (
      <div className="alertmasking">
        <div className={styles.alertbox}>
          <Icon
            onClick={() => {
              this.props.close("reg");
            }}
            className={styles.alertclose}
            type="close"
          />
          <div className={styles.alerttitle}>注册</div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator("phone", {
                rules: [{ required: true, message: "请输入手机号" }]
              })(
                <Input
                  name="phone"
                  placeholder="请输入手机号"
                  addonBefore={prefixSelector}
                  style={{ width: "100%" }}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "请输入密码" }]
              })(
                <Input
                  name="password"
                  type="password"
                  placeholder="请输入密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("repassword", {
                rules: [{ required: true, message: "请确认密码" }]
              })(
                <Input
                  name="repassword"
                  type="password"
                  placeholder="请再次输入密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              <div className="flexbet">
                {getFieldDecorator("code", {
                  rules: [{ required: true, message: "请输入验证码" }]
                })(
                  <Input
                    name="code"
                    style={{ marginRight: "10px" }}
                    type="number"
                    placeholder="请输入验证码"
                  />
                )}
                <Sendcode />
              </div>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className={styles.btn1}>
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
const WrappedNormalRegForm = Form.create({ name: "reg" })(Register);
export default WrappedNormalRegForm;
