import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import * as userActions from '../store/actions/user';

import {
    Button
} from 'antd';

class Main extends PureComponent {
    state = {
        isLoading: false
    }

    componentDidMount() {
        const { user, dispatch } = this.props;

        if (!user) {
            this.setState({ isLoading: true }, () => {
                const userId = localStorage.getItem('userId');

                dispatch(userActions.getUser(userId))
                    .finally(() => this.setState({ isLoading: false }))
            });
        }
    }

    render() {
        const { user } = this.props;
        const { isLoading } = this.state;

        return (
            <div>
                {isLoading}
                {user && user.email}
            </div>
        );
    }
}

export default connect(state => ({
    user: state.user.info
}))(Main);