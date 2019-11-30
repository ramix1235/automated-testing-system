import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import * as testActions from '../store/actions/test';

import {
    Form,
    Button,
    Modal,
    Input,
    Icon,
    Switch,
    message,
    Select
} from 'antd';

import ERRORS from '../constants/errors';
import EVALUATOR_TYPE from '../constants/evaluators'

const { Item } = Form;
const { Option } = Select;

class TestPopup extends PureComponent {
    state = {
        visible: false,
        confirmLoading: false,
        closedQuestions: [],
        openedQuestions: []
    };

    componentDidUpdate(prevProps) {
        if (
            prevProps.selectedItem !== this.props.selectedItem
            && this.props.selectedItem
        ) {

            this.setState({
                closedQuestions: this.props.selectedItem.closedQuestions,
                openedQuestions: this.props.selectedItem.openedQuestions
            });
        }
    }

    showModal = () => this.setState({ visible: true });

    getFieldIndex = (questions, questionId) => {
        const { isEdit } = this.props;

        return isEdit ? questions.findIndex(question => question.id === questionId) : questionId;
    }

    handleOk = () => {
        const { form, user, isEdit, dispatch, selectedItem } = this.props;
        const { openedQuestions, closedQuestions } = this.state;
        const isNoQuestions = !openedQuestions.length && !closedQuestions.length

        if (isNoQuestions) {
            return message.warning('You should add at least 1 question', 5);
        }

        form.validateFields((err, values) => {
            if (err) return;

            console.log('Received values of form: ', values);

            this.setState({ confirmLoading: true }, () => {
                const test = {
                    author: user.id,
                    title: values.title,
                    description: values.description,
                    closedQuestions: values.closedQuestions ? values.closedQuestions.filter(Boolean) : [],
                    openedQuestions: values.openedQuestions ? values.openedQuestions.filter(Boolean) : []
                }

                if (isEdit) {
                    test.id = selectedItem.id;
                }

                const action = isEdit ? testActions.edit : testActions.create;

                dispatch(action(test))
                    .then(() => {
                        if (!isEdit) {
                            this.setState({
                                closedQuestions: [],
                                openedQuestions: []
                            });

                            form.resetFields();
                        }

                        message.success(`Test has been ${isEdit ? 'edited' : 'created'} successfully`, 5);
                    })
                    .catch(() => message.error('Something went wrong', 5))
                    .finally(() => this.setState({ confirmLoading: false }))
            });

        });

    };

    handleCancel = () => {
        const { onCancel } = this.props;

        this.setState({ visible: false });

        if (onCancel) {
            onCancel();
        }
    };

    handleAfterClose = () => {
        const { form } = this.props;

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
                    etalon: false
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
                    etalon: '',
                    type: EVALUATOR_TYPE.shingles
                }
            ]
        }));
    };

    renderClosedQuestions() {
        const { form: { getFieldDecorator }, isEdit } = this.props;
        const { closedQuestions } = this.state;

        return closedQuestions.map((closedQuestion, index) => (
            <div key={closedQuestion.id} className="d-f jc-fs ai-fs">
                <div className="d-f flx-6">
                    <Item className="m-r-10 flx-1" required={false} label={index === 0 ? 'Question' : ''}>
                        {getFieldDecorator(`closedQuestions[${this.getFieldIndex(closedQuestions, closedQuestion.id)}].question`, {
                            rules: [
                                {
                                    required: true,
                                    message: ERRORS.required.question,
                                }
                            ],
                            initialValue: isEdit ? closedQuestion.question : ''
                        })(
                            <Input.TextArea />
                        )}
                    </Item>
                    <Item className="m-l-10 flx-1" required={false} label={index === 0 ? 'Correct answer' : ''}>
                        {getFieldDecorator(`closedQuestions[${this.getFieldIndex(closedQuestions, closedQuestion.id)}].etalon`, {
                            valuePropName: 'checked',
                            initialValue: isEdit ? closedQuestion.etalon : false
                        })(
                            <Switch
                                checkedChildren={<span className="f-s-14">Yes</span>}
                                unCheckedChildren={<span className="f-s-14">No</span>}
                            />
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
        const { form: { getFieldDecorator }, isEdit } = this.props;
        const { openedQuestions } = this.state;

        return openedQuestions.map((openedQuestion, index) => (
            <div key={openedQuestion.id} className="d-f f-d-column jc-fs ai-fs">
                <div className="d-f jc-fs ai-fs w-25">
                    <Item className="flx-1" required={false} label='Evaluator Type'>
                        {getFieldDecorator(`openedQuestions[${this.getFieldIndex(openedQuestions, openedQuestion.id)}].evaluatorType`, {
                            initialValue: isEdit ? openedQuestion.evaluatorType : EVALUATOR_TYPE.shingles
                        })(
                            <Select>
                                <Option value={EVALUATOR_TYPE.shingles}>Shingles</Option>
                                <Option value={EVALUATOR_TYPE.proximityOfWords}>Proximity Of Words</Option>
                            </Select>
                        )}
                    </Item>
                </div>
                <div className="d-f jc-fs ai-fs w-100">
                    <div className="d-f flx-6">
                        <Item className="m-r-10 flx-1" required={false} label={index === 0 ? 'Question' : ''}>
                            {getFieldDecorator(`openedQuestions[${this.getFieldIndex(openedQuestions, openedQuestion.id)}].question`, {
                                rules: [
                                    {
                                        required: true,
                                        message: ERRORS.required.question,
                                    }
                                ],
                                initialValue: isEdit ? openedQuestion.question : ''
                            })(
                                <Input.TextArea />
                            )}
                        </Item>
                        <Item className="m-l-10 flx-1" required={false} label={index === 0 ? 'Correct answer' : ''}>
                            {getFieldDecorator(`openedQuestions[${this.getFieldIndex(openedQuestions, openedQuestion.id)}].etalon`, {
                                rules: [
                                    {
                                        required: true,
                                        message: ERRORS.required.answer,
                                    }
                                ],
                                initialValue: isEdit ? openedQuestion.etalon : ''
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
            </div>
        ));
    }

    render() {
        const { children, form: { getFieldDecorator }, isEdit, selectedItem } = this.props;
        const { visible, confirmLoading } = this.state;

        return (
            <div>
                <div onClick={this.showModal}>
                    {children}
                </div>
                <Modal
                    title={isEdit ? "Edit test" : "New test"}
                    centered
                    maskClosable={false}
                    visible={visible || (isEdit && !!selectedItem)}
                    okText={isEdit ? "Update" : "Create"}
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
                                        }
                                    ],
                                    initialValue: isEdit && selectedItem ? selectedItem.title : ''
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
                                        }
                                    ],
                                    initialValue: isEdit && selectedItem ? selectedItem.description : ''
                                })(
                                    <Input.TextArea />
                                )}
                            </Item>
                            <div className="m-t-60">
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

export default connect(state => ({
    user: state.user.info
}))(Form.create({ name: 'testForm' })(TestPopup));