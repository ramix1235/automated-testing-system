import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import * as testActions from '../store/actions/test';

import {
    List,
    Icon,
    Card as CardItem
} from 'antd';
import Card from '../components/Card'
import TestPopup from './TestPopup';

// const cards = [
//     {
//         id: '0',
//         title: 'Add new test',
//         description: ''
//     },
//     {
//         id: '1',
//         title: 't vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti',
//         description: 't vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium t vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium t vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium t vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium t vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium t vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium t vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium t vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium'
//     },
//     {
//         id: '2',
//         title: 'New Test2',
//         description: 't vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium t vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium t vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium t vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium t vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium t vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium t vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium t vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium'
//     },
//     {
//         id: '3',
//         title: 'New Test3',
//         description: 'Description3'
//     },
//     {
//         id: '4',
//         title: 'New Test4',
//         description: 'Description4'
//     },
//     {
//         id: '5',
//         title: 'New Test5',
//         description: 'Description5'
//     },
//     {
//         id: '6',
//         title: 'New Test6',
//         description: 'Description6'
//     },
//     {
//         id: '7',
//         title: 'New Test7',
//         description: 'Description7'
//     },
//     {
//         id: '8',
//         title: 'New Test8',
//         description: 'Description8'
//     },
//     {
//         id: '9',
//         title: 'New Test9',
//         description: 'Description9'
//     },
// ];

class Tests extends PureComponent {
    state = {
        isLoading: false,
        cardLoadingIds: []
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(testActions.getTest('5dc57cf2d2f26e43b8744bd3'));

        this.setState({ isLoading: true }, () => {
            dispatch(testActions.getAllTests())
                .finally(() => this.setState({ isLoading: false }))
        });
    }

    handleTestAction = id => {
        console.log('action');
    }

    handleTestEdit = id => {
        console.log('edit');
    }

    handleTestDelete = id => {
        this.setState(state => ({ cardLoadingIds: [...state.cardLoadingIds, id] }), () => {
            setTimeout(() => {
                this.setState(state => {
                    const idIndex = state.cardLoadingIds.findIndex(i => i === id);
                    const cardLoadingIds = [...state.cardLoadingIds];

                    cardLoadingIds.splice(idIndex, 1);

                    return { cardLoadingIds };
                });
            }, 3000);
        });
    }

    render() {
        const { tests } = this.props;
        const { isLoading, cardLoadingIds } = this.state;

        return (
            <List
                grid={{
                    gutter: 16,
                    xs: 2,
                    sm: 2,
                    md: 2,
                    lg: 2,
                    xl: 3,
                    xxl: 4
                }}
                loading={isLoading}
                dataSource={[{ title: 'New test' }, ...tests]}
                renderItem={(item, index) => {
                    if (!index) {
                        return (
                            <List.Item>
                                <TestPopup>
                                    <CardItem
                                        hoverable
                                        bordered
                                    >
                                        <div className="action-description">
                                            <div><Icon className="f-s-50" type="plus" /></div>
                                            <div className="f-s-16">{item.title}</div>
                                        </div>
                                    </CardItem>
                                </TestPopup>
                            </List.Item>
                        );
                    }

                    return (
                        <List.Item>
                            <Card
                                actionCard={index === 0}
                                item={item}
                                loading={cardLoadingIds.includes(item.id)}
                                onAction={this.handleTestAction}
                                onEdit={this.handleTestEdit}
                                onDelete={this.handleTestDelete}
                            />
                        </List.Item>
                    )
                }}
            />
        );
    }
}

export default connect(state => ({
    tests: state.test.tests
}))(Tests);