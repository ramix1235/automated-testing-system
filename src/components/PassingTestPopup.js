import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { proximityOfWords, shingles } from '../helper';

import * as passedTestActions from '../store/actions/passedTest';

import {
    message,
    Form,
    Switch,
    Input,
    Modal
} from 'antd';

import ERRORS from '../constants/errors';

const { Item } = Form;

class PassingTestPopup extends PureComponent {
    state = {
        confirmLoading: false,
        test: undefined
    };

    componentDidUpdate(prevProps) {
        if (
            prevProps.passingTest !== this.props.passingTest
            && this.props.passingTest
        ) {

            this.setState({ test: this.props.passingTest });
        }
    }

    handleOk = () => {
        const { form, user, dispatch } = this.props;
        const { test } = this.state;

        form.validateFields((err, values) => {
            if (err) return;

            this.setState({ confirmLoading: true }, () => {
                const passedTest = {
                    user: user.id,
                    title: test.title,
                    description: test.description,
                    closedQuestions: values.closedQuestions ? values.closedQuestions.map((answer, index) => ({
                        question: test.closedQuestions[index].question,
                        etalon: test.closedQuestions[index].etalon,
                        answer
                    })) : [],
                    openedQuestions: values.openedQuestions ? values.openedQuestions.map((answer, index) => ({
                        question: test.openedQuestions[index].question,
                        etalon: test.openedQuestions[index].etalon,
                        evaluatorType: test.openedQuestions[index].evaluatorType,
                        answer
                    })) : []
                }

                // passedTest.openedQuestions.forEach(({ answer, etalon }) => {
                //     shingles(answer, etalon)
                //     proximityOfWords(answer, etalon);
                // })

                dispatch(passedTestActions.create(passedTest))
                    .then(() => {
                        message.success(`Test has been passed successfully. Please check your result in the History`, 5);
                        this.handleCancel();
                    })
                    .catch(() => message.error('Something went wrong', 5))
                    .finally(() => this.setState({ confirmLoading: false }))
            })
        })
    }

    handleCancel = () => {
        const { onCancel } = this.props;

        if (onCancel) {
            onCancel();
        }
    };

    handleAfterClose = () => {
        const { form } = this.props;

        form.resetFields();
    }

    render() {
        const {
            form: { getFieldDecorator },
            passingTest
        } = this.props;
        const { confirmLoading, test } = this.state;
        const title = test ? test.title : '';
        const closedQuestions = test && test.closedQuestions.length ? test.closedQuestions : [];
        const openedQuestions = test && test.openedQuestions.length ? test.openedQuestions : [];

        return (
            <Modal
                title={title}
                centered
                visible={!!passingTest}
                maskClosable={false}
                okText={"Send"}
                width={'50%'}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
                afterClose={this.handleAfterClose}
            >
                <Form>
                    {closedQuestions.length > 0 && (
                        <div>
                            <div className="m-b-10">Closed Questions:</div>
                            {closedQuestions.map((closedQuestion, index) => (
                                <Item key={closedQuestion.id} required={false} label={closedQuestion.question}>
                                    {getFieldDecorator(`closedQuestions[${index}]`, {
                                        valuePropName: 'checked',
                                        initialValue: false
                                    })(
                                        <Switch
                                            checkedChildren={<span className="f-s-14">Yes</span>}
                                            unCheckedChildren={<span className="f-s-14">No</span>}
                                        />
                                    )}
                                </Item>
                            ))}
                        </div>
                    )}
                    {openedQuestions.length > 0 && (
                        <div>
                            <div className={classnames("m-b-10", { 'm-t-60': closedQuestions.length > 0 })}>Opened Questions:</div>
                            {openedQuestions.map((openedQuestion, index) => (
                                <Item key={openedQuestion.id} required={false} label={openedQuestion.question}>
                                    {getFieldDecorator(`openedQuestions[${index}]`, {
                                        rules: [
                                            {
                                                required: true,
                                                message: ERRORS.required.answer
                                            }
                                        ],
                                        initialValue: ''
                                    })(
                                        <Input.TextArea />
                                    )}
                                </Item>
                            ))}
                        </div>
                    )}
                </Form>
            </Modal>
        );
    }
}

export default connect(state => ({
    user: state.user.info
}))(Form.create({ name: 'passingTestForm' })(PassingTestPopup));