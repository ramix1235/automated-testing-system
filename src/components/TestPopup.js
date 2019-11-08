import React, { PureComponent } from 'react';

import {
    Form,
    Button,
    Modal,
    Input,
    Icon,
    Switch,
    message
} from 'antd';

import ERRORS from '../constants/errors';

const { Item } = Form;

class TestPopup extends PureComponent {
    state = {
        visible: false,
        confirmLoading: false,
        closedQuestions: [],
        openedQuestions: []
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        const { form } = this.props;
        const { openedQuestions, closedQuestions } = this.state;
        const isNoQuestions = !openedQuestions.length && !closedQuestions.length

        if (isNoQuestions) {
            return message.warning('You should add at least 1 question', 5);
        }

        form.validateFields((err, values) => {
            if (err) return;

            console.log('Received values of form: ', values);

            this.setState({ confirmLoading: true }, () => {
                setTimeout(() => {
                    this.setState({
                        // visible: false,
                        confirmLoading: false,
                        closedQuestions: [],
                        openedQuestions: []
                    });

                    form.resetFields();
                }, 2000);
            });

        });

    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleAfterClose = () => {
        const { form } = this.props;

        this.setState({
            confirmLoading: false,
            closedQuestions: [],
            openedQuestions: []
        });

        form.resetFields();
    }

    removeClosedQuestion = closedQuestion => {
        const { closedQuestions } = this.state;

        const questionIndex = closedQuestions.findIndex(cq => cq.id === closedQuestion.id);
        const updatedClosedQuestions = [...closedQuestions];

        updatedClosedQuestions.splice(questionIndex, 1);

        this.setState({ closedQuestions: updatedClosedQuestions });
    };

    addClosedQuestion = () => {
        const { closedQuestions } = this.state;

        this.setState(state => ({
            closedQuestions: [
                ...state.closedQuestions,
                {
                    id: closedQuestions.length ? closedQuestions[closedQuestions.length - 1].id + 1 : 0,
                    question: '',
                    answer: false
                }
            ]
        }));
    };

    removeOpenedQuestion = openedQuestion => {
        const { openedQuestions } = this.state;

        const questionIndex = openedQuestions.findIndex(cq => cq.id === openedQuestion.id);
        const updatedOpenedQuestions = [...openedQuestions];

        updatedOpenedQuestions.splice(questionIndex, 1);

        this.setState({ openedQuestions: updatedOpenedQuestions });
    };

    addOpenedQuestion = () => {
        const { openedQuestions } = this.state;

        this.setState(state => ({
            openedQuestions: [
                ...state.openedQuestions,
                {
                    id: openedQuestions.length ? openedQuestions[openedQuestions.length - 1].id + 1 : 0,
                    question: '',
                    answer: ''
                }
            ]
        }));
    };

    renderClosedQuestions() {
        const { closedQuestions } = this.state;
        const { getFieldDecorator } = this.props.form;

        return closedQuestions.map((closedQuestion, index) => (
            <div key={closedQuestion.id} className="d-f jc-fs ai-fs">
                <div className="d-f flx-6">
                    <Item className="m-r-10 flx-1" required={false} label={index === 0 ? 'Question' : ''}>
                        {getFieldDecorator(`closedQuestions[${closedQuestion.id}].question`, {
                            rules: [
                                {
                                    required: true,
                                    message: ERRORS.required.question,
                                },
                            ],
                        })(
                            <Input.TextArea />
                        )}
                    </Item>
                    <Item className="m-l-10 flx-1" required={false} label={index === 0 ? 'Correct answer' : ''}>
                        {getFieldDecorator(`closedQuestions[${closedQuestion.id}].answer`, {
                            valuePropName: 'checked'
                        })(
                            <Switch checkedChildren={<span className="f-s-14">Yes</span>} unCheckedChildren={<span className="f-s-14">No</span>} />
                        )}
                    </Item>
                </div>
                <Item required={false} className="f-s-20 flx-1" style={{ marginTop: index === 0 ? 40 : 0 }}>
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.removeClosedQuestion(closedQuestion)}
                    />
                </Item>
            </div>
        ));
    }

    renderOpenedQuestions() {
        const { openedQuestions } = this.state;
        const { getFieldDecorator } = this.props.form;

        return openedQuestions.map((openedQuestion, index) => (
            <div key={openedQuestion.id} className="d-f jc-fs ai-fs">
                <div className="d-f flx-6">
                    <Item className="m-r-10 flx-1" required={false} label={index === 0 ? 'Question' : ''}>
                        {getFieldDecorator(`openedQuestions[${openedQuestion.id}].question`, {
                            rules: [
                                {
                                    required: true,
                                    message: ERRORS.required.question,
                                },
                            ],
                        })(
                            <Input.TextArea />
                        )}
                    </Item>
                    <Item className="m-l-10 flx-1" required={false} label={index === 0 ? 'Correct answer' : ''}>
                        {getFieldDecorator(`openedQuestions[${openedQuestion.id}].answer`, {
                            rules: [
                                {
                                    required: true,
                                    message: ERRORS.required.answer,
                                },
                            ],
                        })(
                            <Input.TextArea />
                        )}
                    </Item>
                </div>
                <Item className="m-l-20 f-s-20 flx-1" required={false} style={{ marginTop: index === 0 ? 40 : 0 }}>
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.removeOpenedQuestion(openedQuestion)}
                    />
                </Item>
            </div>
        ));
    }

    render() {
        const { children, form: { getFieldDecorator } } = this.props;
        const { visible, confirmLoading } = this.state;

        return (
            <div>
                <div onClick={this.showModal}>
                    {children}
                </div>
                <Modal
                    title="New test"
                    centered
                    visible={visible}
                    okText="Create"
                    width={'50%'}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    afterClose={this.handleAfterClose}
                >
                    <Form>
                        <div>
                            <Item className="w-60" label='Title'>
                                {getFieldDecorator('title', {
                                    rules: [
                                        {
                                            required: true,
                                            message: ERRORS.required.title,
                                        },
                                    ],
                                })(
                                    <Input />
                                )}
                            </Item>
                            <Item className="w-60" label='Description'>
                                {getFieldDecorator('description', {
                                    rules: [
                                        {
                                            required: true,
                                            message: ERRORS.required.description,
                                        },
                                    ],
                                })(
                                    <Input.TextArea />
                                )}
                            </Item>
                            <div className="m-b-10">Closed Questions:</div>
                            {this.renderClosedQuestions()}
                            <Item className="d-f jc-fs ai-c">
                                <Button
                                    type="dashed"
                                    onClick={this.addClosedQuestion}
                                >
                                    Add
                                </Button>
                            </Item>
                        </div>
                        <div className="m-t-60">
                            <div className="m-b-10">Opened Questions:</div>
                            {this.renderOpenedQuestions()}
                            <Item className="d-f jc-fs ai-c">
                                <Button
                                    type="dashed"
                                    onClick={this.addOpenedQuestion}
                                >
                                    Add
                                </Button>
                            </Item>
                        </div>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default (Form.create({ name: 'testForm' }))(TestPopup);