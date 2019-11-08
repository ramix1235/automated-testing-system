import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import * as userActions from '../store/actions/user';

import {
    Menu
} from 'antd';
import Tests from '../components/Tests';

const MENU = [
    {
        id: '1',
        name: 'Tests'
    },
    {
        id: '2',
        name: 'Results'
    }
]
const defaultSelectedMenu = '1';

class Main extends PureComponent {
    state = {
        isLoading: false,
        selectedMenu: defaultSelectedMenu
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
                defaultSelectedKeys={[defaultSelectedMenu]}
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
            case '1': content = <Tests />; break;
            case '2': break;
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