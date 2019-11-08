import React, { PureComponent } from 'react';

// import * as testActions from '../store/actions/test';

import {
    Button,
    Form,
    Switch,
    Input
} from 'antd';

import ERRORS from '../constants/errors';

class PassingTest extends PureComponent {
    handleClose = () => {
        const { onClose } = this.props;

        if (onClose) {
            onClose();
        }
    }

    render() {
        const {
            passingTest: {
                title,
                description,
                closedQuestions,
                openedQuestions
            },
            form: { getFieldDecorator }
        } = this.props;

        console.log(this.props.passingTest);

        return (
            <div>
                <div>{title}</div>
                <div>{description}</div>
                <div>
                    <Form>
                        {closedQuestions.length > 0 && (
                            <div>
                                <div className="m-b-10">Closed Questions:</div>
                                {closedQuestions.map((closedQuestion, index) => (
                                    <div>
                                        <div>
                                            {closedQuestion.question}
                                        </div>
                                        <Form.Item required={false}>
                                            {getFieldDecorator(`closedQuestions[${index}]`, {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: ERRORS.required.question
                                                    }
                                                ]
                                            })(
                                                <Switch checkedChildren={<span className="f-s-14">Yes</span>} unCheckedChildren={<span className="f-s-14">No</span>} />
                                            )}
                                        </Form.Item>
                                    </div>
                                ))}
                            </div>
                        )}
                        {openedQuestions.length > 0 && (
                            <div>
                                <div className="m-b-10">Opened Questions:</div>
                                {openedQuestions.map((openedQuestion, index) => (
                                    <div>
                                        <div>
                                            {openedQuestion.question}
                                        </div>
                                        <Form.Item required={false}>
                                            {getFieldDecorator(`openedQuestions[${index}]`, {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: ERRORS.required.answer
                                                    }
                                                ]
                                            })(
                                                <Input.TextArea />
                                            )}
                                        </Form.Item>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Form>
                </div>
                <Button type="ghost" onClick={this.handleClose}>Close</Button>
            </div>
        );
    }
}

export default Form.create({ name: 'passingTestForm' })(PassingTest);