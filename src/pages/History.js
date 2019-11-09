import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import * as passedTestActions from '../store/actions/passedTest';

import {
    List,
    message
} from 'antd';
import Collapse from '../components/Collapse'

const { Item } = List;

class History extends PureComponent {
    state = {
        isLoading: false,
        cardLoadingIds: [],
        selectedItem: undefined
    }

    componentDidMount() {
        const { dispatch } = this.props;

        this.setState({ isLoading: true }, () => {
            dispatch(passedTestActions.getAll())
                .finally(() => this.setState({ isLoading: false }))
        });
    }

    handlePassedTestDelete = id => {
        const { dispatch } = this.props;

        this.setState(state => ({ cardLoadingIds: [...state.cardLoadingIds, id] }), () => {
            setTimeout(() => {
                dispatch(passedTestActions.remove(id))
                    .then(() => message.success('Passed test has been deleted successfully', 5))
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

    renderPassedTests() {
        const { passedTests } = this.props;
        const {
            isLoading,
            cardLoadingIds
        } = this.state;

        return (
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 1,
                    md: 1,
                    lg: 1,
                    xl: 1,
                    xxl: 1
                }}
                loading={isLoading}
                dataSource={passedTests}
                renderItem={item => {
                    return (
                        <Item>
                            <Collapse
                                item={item}
                                loading={cardLoadingIds.includes(item.id)}
                                onDelete={this.handlePassedTestDelete}
                            />
                            {/* <Card
                            item={item}
                            loading={cardLoadingIds.includes(item.id)}
                            onAction={this.handleTestAction}
                            onEdit={this.handleTestEdit}
                            onDelete={this.handleTestDelete}
                        /> */}
                        </Item>
                    )
                }}
            />
        );
    }

    render() {
        return (
            <div>
                {this.renderPassedTests()}
            </div>
        );
    }
}

export default connect(state => ({
    passedTests: state.passedTest.passedTests
}))(History);