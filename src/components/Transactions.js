import React, { Component } from 'react';
import { Table, Typography, Button } from 'antd';
import 'antd/dist/antd.css';
import DeleteButton from './DeleteButton';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
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
                title: 'Category',
                dataIndex: 'category',
                key: 'category',
            },
            {
                title: 'Vendor',
                dataIndex: 'vendor',
                key: 'vendor',
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
                render: amount => amount >= 0 ? <Text type="success">{`$${amount}`}</Text> : <Text type="danger" > {`($${-amount})`}</Text >,
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

    handlePlusClick = () => {
        this.props.handleOperationsLink()
    }

    render() {
        return (
            <div className='transactions-container'>
                <Table columns={this.state.columns} dataSource={this.props.transactions} />
                <Link to="/operations" onClick={this.handlePlusClick}>
                    <Button type="primary" size="large" shape="round" icon={<PlusOutlined />} style={{ background: 'rgba(0, 0, 0, 0.85)', borderColor: 'rgba(0, 0, 0, 0.85)' }} />
                </Link>
            </div>
        );
    }
}

export default Transactions;