import React, { PureComponent } from 'react';

import {
    Form,
    Button,
    Modal,
    Input,
    Icon
} from 'antd';

import ERRORS from '../constants/errors';

const { Item } = Form;

let id = 1;

class TestPopup extends PureComponent {
    state = {
        visible: false,
        confirmLoading: false,
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    remove = k => {
        const { form } = this.props;

        // can use data-binding to get
        const keys = form.getFieldValue('keys');

        // We need at least one question
        if (keys.length === 1) return;

        // can use data-binding to set
        form.setFieldsValue({ keys: keys.filter(key => key !== k) });
    };

    add = () => {
        const { form } = this.props;

        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = [...keys, id++];

        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({ keys: nextKeys });
    };

    handleOk = () => {
        const { form } = this.props;

        form.validateFields((err, values) => {
            if (err) return;

            console.log('Received values of form: ', values);

            const { keys, names } = values;
            console.log('Merged values:', keys.map(key => names[key]));

            this.setState({ confirmLoading: true }, () => {
                setTimeout(() => {

                    this.setState({
                        // visible: false,
                        confirmLoading: false,
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

        form.resetFields()
    }

    renderDynamicFormItems() {
        const { getFieldDecorator, getFieldValue } = this.props.form;

        getFieldDecorator('keys', { initialValue: [0] });
        const keys = getFieldValue('keys');

        const formItems = keys.map(k => (
            <Item required={false} key={k}>
                {getFieldDecorator(`names[${k}]`, {
                    // validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            // whitespace: true,
                            message: ERRORS.required.question,
                        },
                    ],
                })(
                    <Input style={{ width: '60%' }} />
                )}
                {keys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button m-l-10 f-s-20"
                        type="minus-circle-o"
                        onClick={() => this.remove(k)}
                    />
                ) : null}
            </Item>
        ));

        return formItems;
    }

    render() {
        const { children } = this.props;
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
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    afterClose={this.handleAfterClose}
                >
                    <Form>
                        <div className="m-b-10">Questions:</div>
                        {this.renderDynamicFormItems()}
                        <Item>
                            <Button
                                type="dashed"
                                onClick={this.add}
                                style={{ width: '60%' }}
                            >
                                Add question
                            </Button>
                        </Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default (Form.create({ name: 'testForm' }))(TestPopup);