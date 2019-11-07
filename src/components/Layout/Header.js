import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as userActions from '../../store/actions/user';

import logo from '../../images/logo.svg';

import { Button } from 'antd';

class Header extends PureComponent {
    state = {
        isLoading: false
    }

    handleLogOut = () => {
        const { history, dispatch } = this.props;
        const userId = localStorage.getItem('userId');
        const location = {
            pathname: '/login',
            state: { fromLogOut: true }
        };

        this.setState({ isLoading: true }, () => {
            dispatch(userActions.logout(userId))
                .then(() => {
                    this.setState({ isLoading: false }, () => history.replace(location));
                })
                .catch(() => this.setState({ isLoading: false }))
        });
    }

    render() {
        const { user } = this.props;
        const { isLoading } = this.state;

        return (
            <div className="header d-f jc-sb ai-c w-100">
                <img src={logo} className="logo m-v-10 m-h-15" alt="logo" />
                {user && (
                    <div className="d-f jc-c ai-c">
                        <div>{user.email}</div>
                        <Button
                            className="m-v-10 m-h-15"
                            type="ghost"
                            loading={isLoading}
                            onClick={this.handleLogOut}
                        >
                            Log out
                        </Button>
                    </div>
                )}
            </div>
        );
    }
}

export default connect(state => ({
    user: state.user.info
}))(withRouter(Header));