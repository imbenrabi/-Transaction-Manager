import React, { Component } from 'react';
import FormButtons from './FormButtons';

class TransactionForm extends Component {
    constructor() {
        super()
        this.state = {
            amount: 0,
            vendor: '',
            category: ''
        }
    }

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

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
                <input type="number" name="amount" placeholder='Amount' value={this.state.amount} onChange={this.handleInputChange} />
                <input type="text" name="vendor" placeholder='Vendor' value={this.state.vendor} onChange={this.handleInputChange} />
                <input type="text" name="category" placeholder='Category' value={this.state.category} onChange={this.handleInputChange} />
                <FormButtons addTransaction={this.addTransaction} />
            </div>
        );
    }
}

export default TransactionForm;