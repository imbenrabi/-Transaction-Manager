import React, { Component } from 'react';

class DeleteButton extends Component {
    delete = () => {
        console.log(this.props.transaction._id);
        this.props.delete(this.props.transaction._id)
    }

    render() {
        return (
            <button onClick={this.delete} className='delete-btn'>Delete</button>
        );
    }
}

export default DeleteButton;