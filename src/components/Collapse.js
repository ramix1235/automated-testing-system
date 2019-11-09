import React, { PureComponent } from 'react';
import Dotdotdot from 'react-dotdotdot'

import {
    Collapse as CollapseItem,
    Icon,
    Popconfirm
} from 'antd';

const { Panel } = CollapseItem;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
};

export default class Collapse extends PureComponent {
    genExtra = () => (
        <Icon
            type="setting"
            onClick={event => {
                // If you don't want click extra trigger collapse, you can prevent this:
                event.stopPropagation();
            }}
        />
    );

    render() {
        const { item: { id, title, description } } = this.props;

        return (
            <CollapseItem
                bordered={false}
                expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
            >
                <Panel
                    key={id}
                    header={title}
                    style={customPanelStyle}
                    extra={this.genExtra()}
                >
                    <p>{description}</p>
                </Panel>
            </CollapseItem>
        );
    }
}