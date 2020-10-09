import React, { Component } from 'react';
import axios from "axios";
import 'antd/dist/antd.css';
import { Form, Input, Button, Alert } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

class Login extends Component {
    getUserToken = async (credentials) => {
        try {
            const resp = await axios.post('/users/login', credentials);
            if (!resp.data.status > 399) {
                throw new Error('Unable to login');
            }

            const token = resp.data.data.token
            return token;
        } catch (error) {
            throw error;
        }
    }

    onFinish = async (values) => {
        try {
            if (!values) {
                return;
            }
            const token = await this.getUserToken(values);
            this.props.login(token);
        } catch (error) {
            throw error;
        }
    }

    onFinishFailed = (error) => Alert(error);

    render() {
        return (
            <Form
                layout="vertical"
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
            >
                <Form.Item
                    label="Email"
                    name="email"
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

                <Form.Item>
                    <Button type="primary" htmlType="submit" shape="round" style={{ background: 'rgba(0, 0, 0, 0.85)', borderColor: 'rgba(0, 0, 0, 0.85)' }} icon={<LoginOutlined />}>
                        Login / Register
                            </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default Login;