import React, { Component } from 'react';

class Category extends Component {
    render() {
        return (
            <div className='category-aggregation'>
                <span>{this.props.name}: </span><span>${this.props.amount}</span>
            </div>
        );
    }
}

export default Category;