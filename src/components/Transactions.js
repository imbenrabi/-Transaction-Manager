import React, { Component } from 'react';
import Transaction from './Transaction';

class Transactions extends Component {
    renderTransactions = () => this.props.transactions.map(t => <Transaction transaction={t} />)


    render() {
        return (
            <div className='transactions-container'>
                {this.renderTransactions()}
            </div>
        );
    }
}

export default Transactions;