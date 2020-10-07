import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from "axios"
import Operations from './Components/Operations';
import Transactions from './Components/Transactions';

// const axios = require('axios')

class App extends Component {
  constructor() {
    super()
    this.state = {
      transactions: [
        { amount: 3200, vendor: "Elevation", category: "Salary" },
        { amount: -7, vendor: "Runescape", category: "Entertainment" },
        { amount: -20, vendor: "Subway", category: "Food" },
        { amount: -98, vendor: "La Baguetterie", category: "Food" }
      ]

    }
  }

  renderBalance = () => {
    let balance = 0;
    this.state.transactions.forEach(t => balance += t.amount)

    return `Balance: $${balance}`
  }

  addTransaction = () => { }

  render() {
    const state = this.state;
    return (
      <div>
        <div className="balance">{this.renderBalance()}</div>
        <Transactions transactions={state.transactions} />
        <Operations />
      </div>
    );
  }

}

export default App;
