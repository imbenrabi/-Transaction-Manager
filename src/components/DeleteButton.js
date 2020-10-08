import React, { Component } from 'react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

class DeleteButton extends Component {
    constructor() {
        super()
        this.state = {
            size: 'Default'
        }
    }

    delete = () => {
        this.props.delete(this.props.transactionId)
    }

    render() {
        const { size } = this.state;
        return (
            <Button onClick={this.delete} type="primary" shape="round" style={{ background: 'rgba(0, 0, 0, 0.85)', borderColor: 'rgba(0, 0, 0, 0.85)', marginRight: '2px' }} icon={<DeleteOutlined />} size={size}>
                Delete
            </Button>
        );
    }
}

export default DeleteButton;