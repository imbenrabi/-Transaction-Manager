import React, { Component } from 'react';
import Category from './Category';

class Breakdown extends Component {
    renderCategories = () => {
        return this.props.aggrTransactions.map((aggr) => {
            const name = Object.keys(aggr)[0]
            return (< Category key={name} name={name} amount={aggr[name]} />)
        })
    }

    render() {
        return (
            <div className="breakdown">
                {this.renderCategories()}
            </div>
        );
    }
}

export default Breakdown;