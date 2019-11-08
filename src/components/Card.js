import React, { PureComponent } from 'react';
import Dotdotdot from 'react-dotdotdot'

import {
    Card as CardItem,
    Icon,
    Popconfirm
} from 'antd';

export default class Card extends PureComponent {
    handleAction = () => {
        const { item, onAction, loading } = this.props;

        if (loading) return;

        onAction(item.id);
    }

    handleEdit = () => {
        const { item, onEdit, loading } = this.props;

        if (loading) return;

        onEdit(item.id);
    }

    handleDelete = () => {
        const { item, onDelete, loading } = this.props;

        if (loading) return;

        onDelete(item.id);
    }

    render() {
        const {
            item: {
                title,
                description
            },
            loading
        } = this.props;

        return (
            <CardItem
                loading={loading}
                bordered={false}
                actions={[
                    <Icon style={loading ? { color: '#5c5c5c', cursor: 'default' } : null} type="play-square" key="play-square" onClick={this.handleAction} />,
                    <Icon style={loading ? { color: '#5c5c5c', cursor: 'default' } : null} className="warning" type="edit" key="edit" onClick={this.handleEdit} />,
                    <Popconfirm
                        title="Are you sure delete this test?"
                        onConfirm={this.handleDelete}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Icon style={loading ? { color: '#5c5c5c', cursor: 'default' } : null} className="dangerous" type="delete" key="delete" />
                    </Popconfirm>
                ]}
            >
                <CardItem.Meta
                    title={title}
                    description={
                        <div title={description}>
                            <Dotdotdot clamp={3}>
                                {description}
                            </Dotdotdot>
                        </div>
                    }
                />
            </CardItem>
        );
    }
}