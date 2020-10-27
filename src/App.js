import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import { AuthService } from './services/Auth.service';
import axios from "axios";
import Operations from './components/Operations';
import Transactions from './components/Transactions';
import Breakdown from './components/Breakdown';
import Login from './components/Login';
import 'antd/dist/antd.css';
import { Layout, Menu, PageHeader, Typography, message } from 'antd';
import {
  FileAddOutlined,
  MoneyCollectOutlined,
  MenuOutlined,
  LogoutOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Text } = Typography;
const authService = new AuthService();

class App extends Component {
  constructor() {
    super()
    this.state = {
      transactions: [],
      aggregatedTransactions: [],
      collapsed: false,
      redirect: false,
      loggedIn: authService.isLoggedIn(),
      pageTitle: 'My Transactions'
    }
  }

  setData = async (token, del = false) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const resp = await axios.get('/transactions', config);
      const transactions = resp.data.data;
      const catNames = this.getCategoryNames(transactions);
      const aggregatedTransactions = await this.getAggrData(catNames);
      if (del) { return this.setState({ aggregatedTransactions, transactions }, message.success('Transaction deleted', 5)) }
      this.setState({ aggregatedTransactions, transactions });
    } catch (error) {
      throw error;
    }
  }

  getTransactionsData = async () => {
    try {
      const token = authService.getToken()
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const resp = await axios.get('/transactions', config);
      const transactions = resp.data.data;
      const catNames = this.getCategoryNames(transactions);
      const aggregatedTransactions = await this.getAggrData(catNames);

      return { transactions, aggregatedTransactions }
    } catch (error) {
      throw error;
    }
  }

  getAggrData = async (categoryNames) => {
    const aggrTransactions = []
    categoryNames.forEach(async (cat) => {
      const aggr = await this.getAggrCategory(cat);
      aggrTransactions.push(aggr);
    })
    return aggrTransactions;
  }

  componentDidMount = async () => {
    if (authService.isLoggedIn()) {
      try {
        const { transactions, aggregatedTransactions } = await this.getTransactionsData();
        this.setState({ transactions, aggregatedTransactions });
      } catch (error) {
        throw error;
      }
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
    if (authService.isLoggedIn()) {
      const token = authService.getToken()
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
  }

  renderBalance = () => {
    let balance = 0;
    this.state.transactions.forEach(t => balance += t.amount)

    return (
      balance >= 0 ?
        <Text type="success">{`Balance: $${balance}`}</Text> :
        <Text type="danger">{`Balance: ($${balance})`}</Text>
    )
  }

  addTransaction = async (transaction) => {
    if (authService.isLoggedIn()) {
      try {
        const token = authService.getToken()
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        await axios.post('/transactions/transaction', transaction, config);
        await this.setData(token);
        this.setState({ redirect: true, pageTitle: 'My Transactions' }, message.success('Transaction added', 5))
      } catch (error) {
        message.error('Something went wrong');
        throw error;
      }
    }
  }

  removeTransaction = async (id) => {
    if (authService.isLoggedIn()) {
      const token = authService.getToken()
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        await axios.delete(`/transactions/${id}`, config);
        await this.setData(token, true)
      } catch (error) {
        message.error('Something went wrong');
        throw error;
      }
    }
  }

  handleLogin = (token) => {
    authService.login(token)
    this.setData(token);
    this.setState({ loggedIn: authService.isLoggedIn() })
  }

  handleLogout = async () => {
    if (authService.isLoggedIn()) {
      try {
        const token = authService.getToken();
        await this.logoutUserFromDB(token);
        authService.logout();
        this.setState({ loggedIn: authService.isLoggedIn(), transactions: [] })

      } catch (error) {
        throw error;
      }
    }
  }

  logoutUserFromDB = async (token) => {
    try {
      const request = axios.create({
        baseURL: "/users/logout"
      });
      request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const resp = await request.post();
      if (resp.status !== 200) {
        throw new Error('Unable to logout');
      }
    } catch (error) {
      throw error
    }
  }

  handleTransactionLink = () => {
    if (this.state.loggedIn) {
      this.setState({ pageTitle: 'My Transactions' })
    }
  }

  handleCategoriesLink = () => {
    if (this.state.loggedIn) {
      this.setState({ pageTitle: 'Balance By Category' })
    }
  }

  handleOperationsLink = () => {
    console.log(this.state.loggedIn);
    if (this.state.loggedIn) {
      this.setState({ pageTitle: 'New Transaction', redirect: false })
    }
  }

  render() {
    const state = this.state;
    return (
      <div>
        <Layout style={{ height: '100vh' }}>
          <Router>
            {state.loggedIn ? <Redirect to='/' /> : <Redirect to='/login' />}
            <Sider>
              <div className="logo balance">{this.renderBalance()}</div>
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<MoneyCollectOutlined />}>
                  <Link disabled={!this.state.loggedIn} onClick={this.handleTransactionLink} to="/transactions">Transactions</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<MenuOutlined />}>
                  <Link disabled={!this.state.loggedIn} onClick={this.handleCategoriesLink} to="/breakdown">Categories</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<FileAddOutlined />}>
                  <Link disabled={!this.state.loggedIn} onClick={this.handleOperationsLink} to="/operations">Operations</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<LogoutOutlined />}>
                  <Link disabled={!this.state.loggedIn} onClick={this.handleLogout} to="/login">Logout</Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <PageHeader
                className="site-page-header"
                title={state.pageTitle}
                subTitle="A fool and his money are soon parted."
              />

              <Content
                className="site-layout-background"
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: 280,
                }}
              >
                <Switch>
                  <Route path='/login' exact render={() => <Login login={this.handleLogin} />} />
                  <Route path='/' exact render={() => <Redirect to='/transactions' />} />
                  <Route path='/transactions' exact render={() => <Transactions delete={this.removeTransaction} handleOperationsLink={this.handleOperationsLink} transactions={state.transactions} />} />
                  <Route path='/operations' exact render={() => state.redirect ? <Redirect push to="/transactions" /> : <Operations addTransaction={this.addTransaction} />} />
                  <Route path='/breakdown' exact render={() => <Breakdown aggrTransactions={state.aggregatedTransactions} />} />
                </Switch>
              </Content>
            </Layout>
          </Router>
        </Layout>
      </div>

    );
  }

}

export default App;
