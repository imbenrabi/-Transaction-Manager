import React, { Component } from 'react';
import TransactionForm from './TransactionForm';

class Operations extends Component {
    render() {
        return (
            <div>
                <TransactionForm addTransaction={this.props.addTransaction} />
            </div>
        );
    }
}

export default Operations;