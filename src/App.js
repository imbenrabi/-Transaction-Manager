import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import axios from "axios"
import Operations from './components/Operations';
import Transactions from './components/Transactions';
import Breakdown from './components/Breakdown';
import Category from './components/Category';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjdkNzA5M2VhYjk2ZDNiNTNjMzJhMzciLCJpYXQiOjE2MDIwNTYzMzl9.08LWSuezcD214OAlbDiWswKn5Nzzw2cIBUugawgPslY'

// const axios = require('axios')

class App extends Component {
  constructor() {
    super()
    this.state = {
      transactions: [],
      aggrTransactions: [],
      redirect: false,
    }
  }

  componentDidMount = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const aggrTransactions = []
      const resp = await axios.get('/transactions', config);
      const transactions = resp.data.data;
      const catNames = this.getCategoryNames(transactions)
      catNames.forEach(async (cat) => {
        const aggr = await this.getAggrCategory(cat);
        aggrTransactions.push(aggr);
      })
      this.setState({ transactions, aggrTransactions })
    } catch (error) {
      throw error;
    }
  }

  getCategoryNames = (transactions) => {
    const names = {}
    transactions.forEach(t => {
      if (!names[t.category]) {
        names[t.category] = true;
      }
    })
    return Object.keys(names)
  }

  getAggrCategory = async (category) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const resp = await axios.get(`transactions/${category}`, config);
      const aggrCat = {}
      aggrCat[category] = resp.data.data[0].amount;
      return aggrCat
    } catch (error) {
      throw error;
    }
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
      this.setState({ redirect: true })
    } catch (error) {
      throw error;
    }
  }

  removeTransaction = async (id) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      await axios.delete(`/transactions/${id}`, config);
      window.location.reload(false);
      this.setState({})
    } catch (error) {
      throw error;
    }
  }

  resetRedirectState = () => this.setState({ redirect: false })

  render() {
    const state = this.state;
    return (
      <div>
        <div className="balance">{this.renderBalance()}</div>
        <Router>
          <div id="main-links">
            <Link to="/">Categories</Link>
            <Link to="/transactions">Transactions</Link>
            <Link onClick={this.resetRedirectState} to="/operations">Operations</Link>
          </div>
          <Route path='/' exact render={() => state.redirect ? <Redirect push to="/transactions" /> : <Breakdown aggrTransactions={state.aggrTransactions} />} />
          <Route path='/transactions' exact render={() => <Transactions delete={this.removeTransaction} resetRedirect={this.resetRedirectState} transactions={state.transactions} />} />
          <Route path='/operations' exact render={() => state.redirect ? <Redirect push to="/transactions" /> : <Operations addTransaction={this.addTransaction} />} />
        </Router>
      </div>
    );
  }

}

export default App;
