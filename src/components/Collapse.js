import React, { PureComponent } from 'react';
import moment from 'moment'
import classnames from 'classnames';

import {
    Collapse as CollapseItem,
    Icon,
    Switch,
    Popconfirm
} from 'antd';

const { Panel } = CollapseItem;

export default class Collapse extends PureComponent {
    handleDelete = e => {
        const { item, onDelete, loading } = this.props;

        if (loading) return;

        if (onDelete) {
            onDelete(item.id);
        }

        e.stopPropagation();
    }

    render() {
        const {
            item: {
                id,
                title,
                description,
                closedQuestions,
                updatedAt
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
                        <div name="description">{description}</div>
                    </div>
                    {closedQuestions.length > 0 &&
                        <div className="m-t-50">
                            <div className="m-b-10 f-s-14" htmlFor="closedQuestions">Closed questions:</div>
                            <div name="closedQuestions">
                                <div className="d-f m-b-10">
                                    <div className="flx-3">
                                        <label>Question:</label>
                                    </div>
                                    <div className="flx-2">
                                        <label>Your answer:</label>
                                    </div>
                                    <div className="flx-2">
                                        <label>Correct answer:</label>
                                    </div>
                                    <div className="flx-1">
                                        <label>Evaluation:</label>
                                    </div>
                                </div>
                                {closedQuestions.map((closedQuestion, index) => (
                                    <div key={`closedQuestions-${index}`} className="d-f">
                                        <div className="flx-3" style={index !== 0 ? { marginTop: 10 } : null}>
                                            <div name={`closedQuestions-question-${index}`}>{closedQuestion.question}</div>
                                        </div>
                                        <div className="flx-2" style={index !== 0 ? { marginTop: 10 } : null}>
                                            <div name={`closedQuestions-answer-${index}`}>
                                                <Switch
                                                    className={classnames({ error: closedQuestion.answer !== closedQuestion.etalon })}
                                                    checked={closedQuestion.answer}
                                                    checkedChildren={<span className="f-s-14">Yes</span>}
                                                    unCheckedChildren={<span className="f-s-14">No</span>}
                                                />
                                            </div>
                                        </div>
                                        <div className="flx-2" style={index !== 0 ? { marginTop: 10 } : null}>
                                            <div name={`closedQuestions-etalon-${index}`}>
                                                <Switch
                                                    checked={closedQuestion.etalon}
                                                    checkedChildren={<span className="f-s-14">Yes</span>}
                                                    unCheckedChildren={<span className="f-s-14">No</span>}
                                                />
                                            </div>
                                        </div>
                                        <div className="flx-1" style={index !== 0 ? { marginTop: 10 } : null}>
                                            <div name={`closedQuestions-evaluation-${index}`}>
                                                {closedQuestion.evaluation}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </Panel>
            </CollapseItem>
        );
    }
}