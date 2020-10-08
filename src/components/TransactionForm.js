import React, { Component } from 'react';
import FormButtons from './FormButtons';
import 'antd/dist/antd.css';
import { Input, InputNumber } from 'antd';
import { ShopOutlined, TableOutlined, DollarOutlined } from '@ant-design/icons';

class TransactionForm extends Component {
    constructor() {
        super()
        this.state = {
            amount: '',
            vendor: '',
            category: ''
        }
    }

    handleInputChange = (e) => {
        console.log(e);
        const target = e.target;
        const value = target.value;
        const name = target.name;
        console.log(e.target.value, e.target.name);

        this.setState({ [name]: value });
    }

    addTransaction = (withdraw = false) => {
        const amount = parseInt(withdraw ? -this.state.amount : this.state.amount);
        const vendor = this.state.vendor;
        const category = this.state.category
        this.props.addTransaction({ amount, vendor, category })
    }

    render() {
        return (
            <div>
                <Input placeholder="Category" name="category" prefix={<TableOutlined />} value={this.state.category} onChange={this.handleInputChange} />
                <br />
                <br />
                <Input placeholder="Vendor" name="vendor" prefix={<ShopOutlined />} value={this.state.vendor} onChange={this.handleInputChange} />
                <br />
                <br />
                <Input placeholder="$$$$" name="amount" prefix={<DollarOutlined />} value={this.state.amount} onChange={this.handleInputChange} />                <br />
                <br />
                <FormButtons addTransaction={this.addTransaction} />
            </div>
        );
    }
}

export default TransactionForm;