import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import * as userActions from '../store/actions/user';

import {
    Menu,
} from 'antd';

const MENU = [
    {
        id: '1',
        name: 'Tests'
    },
    {
        id: '2',
        name: 'Management'
    }
]
const defaultSelectedMenu = '1';

class Main extends PureComponent {
    state = {
        isLoading: false,
        selectedMenu: defaultSelectedMenu
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

    handleMenuClick = e => {
        console.log('click ', e);

        this.setState({ selectedMenu: e.key });
    }

    renderMenu() {
        const { selectedMenu } = this.state;

        return (
            <Menu
                className="main-menu"
                defaultSelectedKeys={[defaultSelectedMenu]}
                selectedKeys={[selectedMenu]}
                onClick={this.handleMenuClick}
            >
                {MENU.map(item => <Menu.Item key={item.id}>{item.name}</Menu.Item>)}
            </Menu>
        );
    }

    render() {
        const { user } = this.props;
        const { isLoading } = this.state;

        return (
            <div className="d-f w-100 m-t-15">
                <div className="flx-1 m-10">
                    {this.renderMenu()}
                </div>
                <div className="flx-6 m-10">
                    Hello!
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    user: state.user.info
}))(Main);