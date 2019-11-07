import React, { PureComponent } from 'react';
import Dotdotdot from 'react-dotdotdot'

import {
    Card as CardItem,
    Icon
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
            item,
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
                    <Icon style={loading ? { color: '#5c5c5c', cursor: 'default' } : null} className="dangerous" type="delete" key="delete" onClick={this.handleDelete} />
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