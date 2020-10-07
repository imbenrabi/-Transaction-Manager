import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from "axios"
import Operations from './components/Operations';
import Transactions from './components/Transactions';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjdkNzA5M2VhYjk2ZDNiNTNjMzJhMzciLCJpYXQiOjE2MDIwNTYzMzl9.08LWSuezcD214OAlbDiWswKn5Nzzw2cIBUugawgPslY'

// const axios = require('axios')

class App extends Component {
  constructor() {
    super()
    this.state = {
      transactions: []

    }
  }
  componentDidMount = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const resp = await axios.get('/transactions', config);
    const transactions = resp.data;
    this.setState({ transactions: transactions.data })
  }

  renderBalance = () => {
    let balance = 0;
    this.state.transactions.forEach(t => balance += t.amount)

    return `Balance: $${balance}`
  }

  addTransaction = async (transaction) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      await axios.post('/transactions/transaction', transaction, config);
    } catch (error) {
      throw error;
    }
  }

  render() {
    const state = this.state;
    return (
      <div>
        <div className="balance">{this.renderBalance()}</div>
        <Router>
          <div id="main-links">
            <Link to="/transactions">Transactions</Link>
            <Link to="/operations">Operations</Link>
          </div>
          <Route path='/transactions' exact render={() => <Transactions transactions={state.transactions} />} />
          <Route path='/operations' exact render={() => <Operations addTransaction={this.addTransaction} />} />
        </Router>
      </div>
    );
  }

}

export default App;
