import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';

import * as testActions from '../store/actions/test';

import {
    List,
    Icon,
    message,
    Card as CardItem
} from 'antd';
import Card from '../components/Card'
import TestPopup from '../components/TestPopup';
import PassingTestPopup from '../components/PassingTestPopup';

const { Item } = List;

class Tests extends PureComponent {
    state = {
        isLoading: false,
        cardLoadingIds: [],
        selectedItem: undefined
    }

    componentDidMount() {
        const { dispatch } = this.props;

        this.setState({ isLoading: true }, () => {
            dispatch(testActions.getAll())
                .finally(() => this.setState({ isLoading: false }))
        });
    }

    handleTestAction = item => {
        this.setState({ passingTest: item });
    }

    handlePassingTestCancel = () => this.setState({ passingTest: undefined })

    handleTestEdit = item => {
        this.setState({ selectedItem: item });
    }

    handleCancelEditTest = () => this.setState({ selectedItem: undefined })

    handleTestDelete = id => {
        const { dispatch } = this.props;

        this.setState(state => ({ cardLoadingIds: [...state.cardLoadingIds, id] }), () => {
            setTimeout(() => {
                dispatch(testActions.remove(id))
                    .then(() => message.success('Test has been deleted successfully', 5))
                    .catch(() => message.error('Something went wrong', 5))
                    .finally(() => {
                        this.setState(state => {
                            const idIndex = state.cardLoadingIds.findIndex(i => i === id);
                            const cardLoadingIds = [...state.cardLoadingIds];

                            cardLoadingIds.splice(idIndex, 1);

                            return { cardLoadingIds };
                        });
                    })
            }, 3000);
        });
    }

    renderTests() {
        const { tests } = this.props;
        const {
            isLoading,
            cardLoadingIds,
            selectedItem
        } = this.state;

        return (
            <Fragment>
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
                                <Item>
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
                                </Item>
                            );
                        }

                        return (
                            <Item>
                                <Card
                                    item={item}
                                    loading={cardLoadingIds.includes(item.id)}
                                    onAction={this.handleTestAction}
                                    onEdit={this.handleTestEdit}
                                    onDelete={this.handleTestDelete}
                                />
                            </Item>
                        )
                    }}
                />
                <TestPopup isEdit selectedItem={selectedItem} onCancel={this.handleCancelEditTest} />
            </Fragment>
        );
    }

    render() {
        const { passingTest } = this.state;

        return (
            <Fragment>
                {this.renderTests()}
                <PassingTestPopup passingTest={passingTest} onCancel={this.handlePassingTestCancel} />
            </Fragment>
        );
    }
}

export default connect(state => ({
    tests: state.test.tests
}))(Tests);