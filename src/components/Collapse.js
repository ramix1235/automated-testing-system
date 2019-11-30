import React, { PureComponent } from 'react';
import moment from 'moment'
import classnames from 'classnames';
import EVALUATOR_TYPE from '../constants/evaluators'

import {
    Collapse as CollapseItem,
    Icon,
    Switch,
    Popconfirm
} from 'antd';

const { Panel } = CollapseItem;

export default class Collapse extends PureComponent {
    getEvaluatorType = openedQuestion => {
        const [key, value] = Object.entries(EVALUATOR_TYPE).find(([key, value]) => value === openedQuestion.evaluatorType);

        return <span>{value}</span>;
    }

    handleDelete = e => {
        const { item, onDelete, loading } = this.props;

        if (loading) return;

        if (onDelete) {
            onDelete(item.id);
        }

        e.stopPropagation();
    }

    renderClosedQuestions() {
        const {
            item: {
                closedQuestions
            }
        } = this.props;

        return closedQuestions.length > 0 && (
            <div className="m-t-50">
                <div className="f-s-14" htmlFor="closedQuestions">Closed questions:</div>
                <div name="closedQuestions">
                    <div className="d-f">
                        <div className="flx-2 p-v-5 p-h-20">
                            <label>Question:</label>
                        </div>
                        <div className="flx-2 p-v-5 p-h-20">
                            <label>Your answer:</label>
                        </div>
                        <div className="flx-2 p-v-5 p-h-20">
                            <label>Correct answer:</label>
                        </div>
                        <div className="flx-1 p-v-5 p-h-20">
                            <label>Evaluation:</label>
                        </div>
                    </div>
                    {closedQuestions.map((closedQuestion, index) => (
                        <div key={`closedQuestions-${index}`} className="d-f">
                            <div className="flx-2 p-v-5 p-h-20">
                                <div name={`closedQuestions-question-${index}`}>{closedQuestion.question}</div>
                            </div>
                            <div className="flx-2 p-v-5 p-h-20">
                                <div name={`closedQuestions-answer-${index}`}>
                                    <Switch
                                        className={classnames({ error: closedQuestion.answer !== closedQuestion.etalon })}
                                        checked={closedQuestion.answer}
                                        checkedChildren={<span className="f-s-14">Yes</span>}
                                        unCheckedChildren={<span className="f-s-14">No</span>}
                                    />
                                </div>
                            </div>
                            <div className="flx-2 p-v-5 p-h-20">
                                <div name={`closedQuestions-etalon-${index}`}>
                                    <Switch
                                        checked={closedQuestion.etalon}
                                        checkedChildren={<span className="f-s-14">Yes</span>}
                                        unCheckedChildren={<span className="f-s-14">No</span>}
                                    />
                                </div>
                            </div>
                            <div className="flx-1 p-v-5 p-h-20">
                                <div name={`closedQuestions-evaluation-${index}`}>
                                    {closedQuestion.evaluation}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    renderOpenedQuestions() {
        const {
            item: {
                openedQuestions
            }
        } = this.props;

        return openedQuestions.length > 0 && (
            <div className="m-t-50">
                <div className="f-s-14" htmlFor="openedQuestions">Opened questions:</div>
                <div name="openedQuestions">
                    <div className="d-f">
                        <div className="flx-2 p-v-5 p-h-20">
                            <label>Question:</label>
                        </div>
                        <div className="flx-2 p-v-5 p-h-20">
                            <label>Your answer:</label>
                        </div>
                        <div className="flx-2 p-v-5 p-h-20">
                            <label>Correct answer:</label>
                        </div>
                        <div className="flx-1 p-v-5 p-h-20">
                            <label>Evaluation:</label>
                        </div>
                        <div className="flx-1 p-v-5 p-h-20">
                            <label>Evaluator Type:</label>
                        </div>
                    </div>
                    {openedQuestions.map((openedQuestion, index) => (
                        <div key={`openedQuestions-${index}`} className="d-f">
                            <div className="flx-2 p-v-5 p-h-20">
                                <div name={`openedQuestions-question-${index}`}>{openedQuestion.question}</div>
                            </div>
                            <div className="flx-2 p-v-5 p-h-20">
                                <div name={`openedQuestions-answer-${index}`}>
                                    {openedQuestion.answer}
                                </div>
                            </div>
                            <div className="flx-2 p-v-5 p-h-20">
                                <div name={`openedQuestions-etalon-${index}`}>
                                    {openedQuestion.etalon}
                                </div>
                            </div>
                            <div className="flx-1 p-v-5 p-h-20">
                                <div name={`openedQuestions-evaluation-${index}`}>
                                    {Number.parseInt(openedQuestion.evaluation)}
                                </div>
                            </div>
                            <div className="flx-1 p-v-5 p-h-20">
                                <div name={`openedQuestions-evaluatorType-${index}`}>
                                    {this.getEvaluatorType(openedQuestion)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    render() {
        const {
            item: {
                id,
                title,
                description,
                updatedAt,
                totalEvaluation
            },
            loading
        } = this.props;

        return (
            <CollapseItem
                bordered={false}
                expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
            >
                <Panel
                    key={id}
                    header={title}
                    extra={
                        <div className="d-f jc-fe ai-c">
                            <div className="m-r-20">
                                {`${Number.parseInt(totalEvaluation)}/100`}
                            </div>
                            <div className="m-r-20">
                                {moment(updatedAt).format('DD/MM/YY HH:mm')}
                            </div>
                            <Popconfirm
                                title="Are you sure delete this passed test?"
                                onConfirm={this.handleDelete}
                                onCancel={e => e.stopPropagation()}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Icon onClick={e => e.stopPropagation()} className="dangerous" type={loading ? "loading" : "delete"} key="delete" />
                            </Popconfirm>
                        </div>
                    }
                >
                    <div className="m-v-10">
                        <label htmlFor="description">Description</label>
                        <div className="p-v-5 p-h-20" name="description">{description}</div>
                    </div>
                    {this.renderClosedQuestions()}
                    {this.renderOpenedQuestions()}
                </Panel>
            </CollapseItem>
        );
    }
}