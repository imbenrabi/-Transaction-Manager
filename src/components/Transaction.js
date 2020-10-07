import React, { Component } from 'react';
import DeleteButton from './DeleteButton';

class Transaction extends Component {
    render() {
        const transaction = this.props.transaction;
        return (
            <div className="transaction">
                <span>Amount: ${transaction.amount}</span><span> Vendor: {transaction.vendor}</span><span> Category: {transaction.category}</span>
                <DeleteButton />
            </div>
        );
    }
}

export default Transaction;