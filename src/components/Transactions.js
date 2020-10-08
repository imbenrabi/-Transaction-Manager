import React, { Component } from 'react';
import { Table, Tag, Space, Typography, Button } from 'antd';
import 'antd/dist/antd.css';
import DeleteButton from './DeleteButton';
const { Text } = Typography;

class Transactions extends Component {
    constructor() {
        super()
        this.state = {
            columns: []
        }
    }

    componentDidMount = () => {
        const columns = [
            {
                title: 'ID',
                dataIndex: '_id',
                key: '_id',
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
                render: amount => amount >= 0 ? <Text type="success">{`$${amount}`}</Text> : <Text type="danger" > {`($${-amount})`}</Text >,
            },
            {
                title: 'Vendor',
                dataIndex: 'vendor',
                key: 'vendor',
            },
            {
                title: 'Category',
                dataIndex: 'category',
                key: 'category',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <DeleteButton delete={this.props.delete} transactionId={record._id} />
                ),
            },
        ]

        this.setState({ columns })
    }

    render() {
        return (
            <div className='transactions-container'>
                <Table columns={this.state.columns} dataSource={this.props.transactions} />
            </div>
        );
    }
}

export default Transactions;