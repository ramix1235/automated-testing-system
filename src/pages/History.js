import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import * as passedTestActions from '../store/actions/passedTest';

import {
    List,
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

    renderPassedTests() {
        const { passedTests } = this.props;
        const {
            isLoading,
            cardLoadingIds,
            selectedItem
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