import React, { PureComponent } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

// import * as userActions from '../store/actions/user';

import {
    Form,
    Input,
    Icon,
    Button
} from 'antd';

import ERRORS from '../constants/errors'

const { Item } = Form;

class ForgotForm extends PureComponent {
    state = {
        isLoading: false
    }

    handleSubmit = e => {
        const { form } = this.props;

        e.preventDefault();

        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                // this.setState({ isLoading: true }, () => {
                //     dispatch(userActions.forgot(values.email))
                //         .finally(() => this.setState({ isLoading: false }))
                // });
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
                    <div className="d-f f-d-column ai-c">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                        >
                            Help me
                        </Button>
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

export default connect(state => ({
    user: state.user.info
}))(Form.create({ name: 'forgotForm' })(ForgotForm));