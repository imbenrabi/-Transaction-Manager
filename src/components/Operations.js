import React, { Component } from 'react';

class Operations extends Component {
    render() {
        return (
            <div>
                <input type="number" placeholder='Amount' />
                <input type="text" placeholder='Vendor' />
                <input type="text" placeholder='Category' />
                <button className="deposit-btn">Deposit</button>
                <button className="withdraw-btn">Withdraw</button>
            </div>
        );
    }
}

export default Operations;