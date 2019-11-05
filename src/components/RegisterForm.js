import React, { PureComponent } from 'react';
import { Link } from "react-router-dom";

import {
    Form,
    Input,
    Icon,
    Button
} from 'antd';

import ERRORS from '../constants/errors'

const { Item } = Form;

class RegisterForm extends PureComponent {
    handleSubmit = e => {
        const { form } = this.props;

        e.preventDefault();

        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { form: { getFieldDecorator } } = this.props;

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
                    <div className="d-f f-d-column ai-c">
                        <Button type="primary" htmlType="submit">Register</Button>
                        <Link className="as-fs m-t-10" to="/login">
                            <span className="m-r-5 f-s-20">&lsaquo;</span>
                            <span>Back</span>
                        </Link>
                    </div>
                </Item>
            </Form>
        );
    }
}

export default Form.create({ name: 'registerForm' })(RegisterForm);