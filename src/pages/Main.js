import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import * as userActions from '../store/actions/user';

import {
    Menu
} from 'antd';
import Tests from './Tests';
import History from './History';

const MENU = [
    {
        id: '1',
        name: 'Tests'
    },
    {
        id: '2',
        name: 'History'
    }
]

class Main extends PureComponent {
    state = {
        isLoading: false,
        selectedMenu: MENU[0].id
    }

    componentDidMount() {
        const { dispatch } = this.props;

        this.setState({ isLoading: true }, () => {
            dispatch(userActions.getUser())
                .finally(() => this.setState({ isLoading: false }))
        });
    }

    handleMenuClick = e => {
        this.setState({ selectedMenu: e.key });
    }

    renderMenu() {
        const { selectedMenu } = this.state;

        return (
            <Menu
                defaultSelectedKeys={[MENU[0].id]}
                selectedKeys={[selectedMenu]}
                onClick={this.handleMenuClick}
            >
                {MENU.map(item => <Menu.Item key={item.id}>{item.name}</Menu.Item>)}
            </Menu>
        );
    }

    renderContent() {
        const { selectedMenu } = this.state;
        let content = null;

        switch (selectedMenu) {
            case MENU[0].id: content = <Tests />; break;
            case MENU[1].id: content = <History />; break;
            default: break;
        }

        return content;
    }

    render() {
        return (
            <div className="d-f w-100 m-t-15">
                <div className="flx-1 m-10">
                    {this.renderMenu()}
                </div>
                <div className="flx-4 m-10 m-r-20">
                    {this.renderContent()}
                </div>
            </div>
        );
    }
}

export default connect()(Main);