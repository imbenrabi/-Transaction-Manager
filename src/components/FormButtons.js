import React, { Component } from 'react';

class FormButtons extends Component {
    deposit = () => this.props.addTransaction()

    withdraw = () => this.props.addTransaction(true)

    render() {
        return (
            <div>
                <button className="deposit-btn" onClick={this.deposit} >Deposit</button>
                <button className="withdraw-btn" onClick={this.withdraw} >Withdraw</button>
            </div>
        );
    }
}

export default FormButtons;