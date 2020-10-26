import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';

class FormButtons extends Component {
    constructor() {
        super()
        this.state = {
            size: 'Default'
        }
    }

    handleSizeChange = e => {
        this.setState({ size: e.target.value });
    };

    deposit = () => this.props.addTransaction()

    withdraw = () => this.props.addTransaction(true)

    render() {
        const { size } = this.state;
        return (
            <div>
                <Button onClick={this.deposit} type="primary" shape="round" style={{ background: 'rgba(0, 0, 0, 0.85)', borderColor: 'rgba(0, 0, 0, 0.85)', marginRight: '2px' }} icon={<DownloadOutlined />} size={size}>
                    Deposit
                </Button>
                <Button onClick={this.withdraw} type="primary" shape="round" style={{ background: 'rgba(0, 0, 0, 0.85)', borderColor: 'rgba(0, 0, 0, 0.85)' }} icon={<UploadOutlined />} size={size}>
                    Withdraw
                 </Button>
            </div>

        );
    }
}

export default FormButtons;