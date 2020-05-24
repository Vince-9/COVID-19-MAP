import React from 'react';
import { Form, Input, Button, message } from 'antd';
import './login.css';
import { reqLogin } from '../../api';

const layout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 30,
  },
};

message.info('测试账号：用户名 admin  密码 123456', 5);

export default function Login() {

  const onFinish = values => {
    console.log('Success:', values);
    reqLogin(values.username, values.password).then(data => {
      console.log(data.data);
      if (data.data.status === 0) {
        message.info(data.data.msg);
        window.sessionStorage.setItem('user', values.username);
        window.location.reload();
      } else {
        message.error(data.data.msg);
      }
    })
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      className="login-form"
      name="basic"
      initialValues={{
        username: 'admin',
        password: '123456'
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <h1>登录</h1>
      <Form.Item
        className="login-form-item"
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        className="login-form-item"
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item >
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}
