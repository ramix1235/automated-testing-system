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
    Select,
    InputNumber
} from 'antd';
import Graph from './Graph';

import ERRORS from '../constants/errors';
import EVALUATOR_TYPE from '../constants/evaluators'

const { Item } = Form;
const { Option } = Select;

class TestPopup extends PureComponent {
    state = {
        visible: false,
        confirmLoading: false,
        closedQuestions: [],
        openedQuestions: [],
        graphsData: []
    };

    componentDidUpdate(prevProps) {
        if (
            prevProps.selectedItem !== this.props.selectedItem
            && this.props.selectedItem
        ) {

            this.setState({
                closedQuestions: this.props.selectedItem.closedQuestions,
                openedQuestions: this.props.selectedItem.openedQuestions,
                graphsData: this.props.selectedItem.openedQuestions.map(question => ({
                    id: question.id,
                    nodes: question.etalonNodes,
                    links: question.etalonLinks
                }))
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
                                openedQuestions: [],
                                graphsData: []
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

        this.setState({
            closedQuestions: [],
            openedQuestions: [],
            graphsData: []
        });

        form.resetFields();
    }

    handleUpdateGraph = data => {
        const { graphsData } = this.state;
        const copyGraphsData = [...graphsData];
        const dataIndex = copyGraphsData.findIndex(graph => graph.id === data.id);

        copyGraphsData[dataIndex] = data;

        this.setState({ graphsData: copyGraphsData });
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
        const { openedQuestions, graphsData } = this.state;

        const questionIndex = openedQuestions.findIndex(cq => cq.id === openedQuestion.id);
        const updatedOpenedQuestions = [...openedQuestions];
        updatedOpenedQuestions.splice(questionIndex, 1);

        const graphIndex = graphsData.findIndex(graph => graph.id === openedQuestion.id);
        const updatedGraphsData = [...graphsData];
        updatedGraphsData.splice(graphIndex, 1);

        this.setState({
            openedQuestions: updatedOpenedQuestions,
            graphsData: updatedGraphsData
        });
    };

    addOpenedQuestion = () => {
        const { openedQuestions } = this.state;

        this.setState(state => ({
            graphsData: [
                ...state.graphsData,
                {
                    id: openedQuestions.length ? openedQuestions[openedQuestions.length - 1].id + 1 : 0,
                    nodes: [{ id: "H1", name: "Harry" }, { id: "S1", name: "Sally" }, { id: "A1", name: "Alice" }],
                    links: [{ source: "H1", target: "S1" }, { source: "H1", target: "A1" }]
                }
            ],
            openedQuestions: [
                ...state.openedQuestions,
                {
                    id: openedQuestions.length ? openedQuestions[openedQuestions.length - 1].id + 1 : 0,
                    question: '',
                    etalon: '',
                    etalonNodes: [],
                    etalonLinks: [],
                    weightOfWords: [],
                    type: EVALUATOR_TYPE.shingles
                }
            ]
        }));
    };

    removeWordWeight = (openedQuestion, wordWeight) => {
        const { openedQuestions } = this.state;
        const updatedOpenedQuestions = [...openedQuestions];
        const questionIndex = updatedOpenedQuestions.findIndex(q => q.id === openedQuestion.id);
        const weightWordIndex = updatedOpenedQuestions[questionIndex].weightOfWords.findIndex(w => w.id === wordWeight.id);

        updatedOpenedQuestions[questionIndex].weightOfWords.splice(weightWordIndex, 1);

        this.setState({ openedQuestions: updatedOpenedQuestions });
    }

    addWordWeight = openedQuestion => {
        const { openedQuestions } = this.state;
        const updatedOpenedQuestions = [...openedQuestions];
        const questionIndex = updatedOpenedQuestions.findIndex(q => q.id === openedQuestion.id);

        updatedOpenedQuestions[questionIndex].weightOfWords.push({
            id: updatedOpenedQuestions[questionIndex].weightOfWords.length ? updatedOpenedQuestions[questionIndex].weightOfWords[updatedOpenedQuestions[questionIndex].weightOfWords.length - 1].id + 1 : 0,
            word: '',
            weight: 0
        })

        this.setState({ openedQuestions: updatedOpenedQuestions });
    }

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

    renderShingles(openedQuestion, index) {
        const { form: { getFieldDecorator }, isEdit } = this.props;
        const { openedQuestions } = this.state;

        return (
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
        );
    }

    renderProximityOfWords(openedQuestion, index) {
        const { form: { getFieldDecorator }, isEdit } = this.props;
        const { openedQuestions } = this.state;

        return (
            <div className="m-l-10 flx-1">
                <Item required={false} label={index === 0 ? 'Correct answer' : ''}>
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
                <div className="m-b-10">Weight of Words:</div>
                {openedQuestion.weightOfWords.map((weightOfWord, weightOfWordIndex) => (
                    <div key={weightOfWord.id} className="d-f jc-fs ai-fs">
                        <Item required={false} label={weightOfWordIndex === 0 ? 'Word:' : ''}>
                            {getFieldDecorator(`openedQuestions[${this.getFieldIndex(openedQuestions, openedQuestion.id)}].weightOfWords[${this.getFieldIndex(openedQuestion.weightOfWords, weightOfWord.id)}].word`, {
                                initialValue: isEdit ? weightOfWord.word : ''
                            })(
                                <Input />
                            )}
                        </Item>
                        <Item className="m-l-10" required={false} label={weightOfWordIndex === 0 ? 'Weight:' : ''}>
                            {getFieldDecorator(`openedQuestions[${this.getFieldIndex(openedQuestions, openedQuestion.id)}].weightOfWords[${this.getFieldIndex(openedQuestion.weightOfWords, weightOfWord.id)}].weight`, {
                                initialValue: isEdit ? weightOfWord.weight : 1
                            })(
                                <InputNumber min={1} max={10} />
                            )}
                        </Item>
                        <Item className="m-l-20 f-s-20" required={false} style={{ marginTop: weightOfWordIndex === 0 ? 40 : 0 }}>
                            <Icon
                                className="dynamic-delete-button"
                                type="minus-circle-o"
                                onClick={() => this.removeWordWeight(openedQuestion, weightOfWord)}
                            />
                        </Item>
                    </div>
                ))}
                <Item className="d-f jc-fs ai-c">
                    <Button
                        type="dashed"
                        onClick={() => this.addWordWeight(openedQuestion)}
                    >
                        Add
                    </Button>
                </Item>
            </div>
        );
    }

    renderGraph(openedQuestion, index) {
        const { form: { getFieldDecorator, getFieldValue }, isEdit } = this.props;
        const { openedQuestions } = this.state;

        return (
            <div className="m-l-10 flx-1">
                <Item className="m-b-0" required={false} label={index === 0 ? 'Correct nodes' : ''}>
                    {getFieldDecorator(`openedQuestions[${this.getFieldIndex(openedQuestions, openedQuestion.id)}].etalonNodes`, {
                        rules: [
                            {
                                required: true,
                                message: ERRORS.required.answer,
                            }
                        ],
                        initialValue: isEdit ? openedQuestion.etalonNodes : '{ "id": "H1", name: "Harry" }, { "id": "S1", name: "Sally" }, { "id": "A1", name: "Alice" }'
                    })(
                        <Input.TextArea />
                    )}
                </Item>
                <Item required={false} label={index === 0 ? 'Correct links' : ''}>
                    {getFieldDecorator(`openedQuestions[${this.getFieldIndex(openedQuestions, openedQuestion.id)}].etalonLinks`, {
                        initialValue: isEdit ? openedQuestion.etalonLinks : '{ "source": "H1", "target": "S1" }, { "source": "H1", "target": "A1" }'
                    })(
                        <Input.TextArea />
                    )}
                </Item>
                <Button onClick={() => this.handleUpdateGraph({
                    id: openedQuestion.id,
                    nodes: getFieldValue('openedQuestions')[this.getFieldIndex(openedQuestions, openedQuestion.id)].etalonNodes.split("|").map(node => JSON.parse(node.trim())),
                    links: getFieldValue('openedQuestions')[this.getFieldIndex(openedQuestions, openedQuestion.id)].etalonLinks.split("|").map(link => JSON.parse(link.trim()))
                })}>Update Graph View</Button>
            </div>
        );
    }

    renderOpenedQuestions() {
        const { form: { getFieldDecorator, getFieldValue }, isEdit } = this.props;
        const { openedQuestions, graphsData } = this.state;

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
                                <Option value={EVALUATOR_TYPE.graph}>Graph</Option>
                            </Select>
                        )}
                    </Item>
                </div>
                <div className="d-f f-d-column jc-fs ai-fs w-100">
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
                            {getFieldValue('openedQuestions')[this.getFieldIndex(openedQuestions, openedQuestion.id)].evaluatorType === EVALUATOR_TYPE.shingles
                                ? this.renderShingles(openedQuestion, index)
                                : getFieldValue('openedQuestions')[this.getFieldIndex(openedQuestions, openedQuestion.id)].evaluatorType === EVALUATOR_TYPE.proximityOfWords
                                    ? this.renderProximityOfWords(openedQuestion, index)
                                    : this.renderGraph(openedQuestion, index)}
                        </div>
                        <Item className="m-l-20 f-s-20 flx-1" required={false} style={{ marginTop: index === 0 ? 40 : 0 }}>
                            <Icon
                                className="dynamic-delete-button"
                                type="minus-circle-o"
                                onClick={() => this.removeOpenedQuestion(openedQuestion)}
                            />
                        </Item>
                    </div>
                    {getFieldValue('openedQuestions')[this.getFieldIndex(openedQuestions, openedQuestion.id)].evaluatorType === EVALUATOR_TYPE.graph && (
                        <Graph
                            id={`graph-${openedQuestion.id}`}
                            data={{
                                nodes: graphsData.find(graph => graph.id === openedQuestion.id).nodes,
                                links: graphsData.find(graph => graph.id === openedQuestion.id).links
                            }}
                        />
                    )}
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