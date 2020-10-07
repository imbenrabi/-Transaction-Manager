import React, { Component } from 'react';

class Transaction extends Component {
    render() {
        const transaction = this.props.transaction;
        return (
            <div className="transaction">
                <span>Amount: ${transaction.amount}</span><span>Vendor: {transaction.vendor}</span><span>Category: {transaction.category}</span>
                <button className='delete-btn'>Delete</button>
            </div>
        );
    }
}

export default Transaction;