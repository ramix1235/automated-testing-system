import React, { PureComponent } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import * as userActions from '../store/actions/user';

import {
    Form,
    Input,
    Icon,
    Checkbox,
    Button
} from 'antd';

import ERRORS from '../constants/errors'

const { Item } = Form;

class LoginForm extends PureComponent {
    state = {
        isLoading: false
    }

    handleSubmit = e => {
        const { form, dispatch } = this.props;

        e.preventDefault();

        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                this.setState({ isLoading: true }, () => {
                    dispatch(userActions.login(values.email, values.password))
                        .finally(() => this.setState({ isLoading: false }))
                });
            }
        });
    };

    render() {
        const { form: { getFieldDecorator } } = this.props;
        const { isLoading } = this.state;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: ERRORS.required.email }],
                    })(
                        <Input
                            prefix={<Icon type="mail" />}
                            type="email"
                            placeholder="Email"
                        />
                    )}
                </Item>
                <Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: ERRORS.required.password }],
                    })(
                        <Input
                            prefix={<Icon type="lock" />}
                            type="password"
                            placeholder="Password"
                        />
                    )}
                </Item>
                <Item>
                    <div className="d-f jc-sb">
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: false,
                        })(
                            <Checkbox className="m-r-20">Remember me</Checkbox>
                        )}
                        <Link className="m-l-20" to="/forgot">Forgot password</Link>
                    </div>
                    <div className="d-f f-d-column ai-c m-t-50">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                        >Log in
                        </Button>
                        <span className="m-t-10">or</span>
                        <Link to="/register">Register</Link>
                    </div>
                </Item>
            </Form>
        );
    }
}

export default connect(state => ({
    user: state.user
}), null)(Form.create({ name: 'loginForm' })(LoginForm));