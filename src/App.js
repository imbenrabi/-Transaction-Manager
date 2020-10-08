import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import axios from "axios"
import Operations from './components/Operations';
import Transactions from './components/Transactions';
import Breakdown from './components/Breakdown';
import 'antd/dist/antd.css';
import { Layout, Menu, PageHeader, Typography, Space } from 'antd';
import {
  FileAddOutlined,
  MoneyCollectOutlined,
  MenuOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Text } = Typography;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjdkNzA5M2VhYjk2ZDNiNTNjMzJhMzciLCJpYXQiOjE2MDIwNTYzMzl9.08LWSuezcD214OAlbDiWswKn5Nzzw2cIBUugawgPslY';

class App extends Component {
  constructor() {
    super()
    this.state = {
      transactions: [],
      aggrTransactions: [],
      collapsed: false,
      redirect: false,
      pageTitle: 'My Transactions'
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

    return (
      balance >= 0 ?
        <Text type="success">{`Balance: $${balance}`}</Text> :
        <Text type="danger">{`Balance: ($${balance})`}</Text>
    )
  }

  addTransaction = async (transaction) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      await axios.post('/transactions/transaction', transaction, config);
      this.setState({ redirect: true, pageTitle: 'My Transactions' })
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

  handleTransactionLink = () => this.setState({ pageTitle: 'My Transactions' })
  handleCategoriesLink = () => this.setState({ pageTitle: 'Balance By Category' })
  handleOperationsLink = () => this.setState({ pageTitle: 'New Transaction', redirect: false })

  render() {
    const state = this.state;
    return (

      <Layout style={{ height: '100vh' }}>
        <Router>
          <Sider>
            <div className="logo balance">{this.renderBalance()}</div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
              <Menu.Item key="1" icon={<MenuOutlined />}>
                <Link onClick={this.handleCategoriesLink} to="/breakdown">Categories</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<MoneyCollectOutlined />}>
                <Link onClick={this.handleTransactionLink} to="/transactions">Transactions</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<FileAddOutlined />}>
                <Link onClick={this.handleOperationsLink} to="/operations">Operations</Link>
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
                <Route path='/' exact render={() => <Redirect to='/transactions' />} />
                <Route path='/transactions' exact render={() => <Transactions delete={this.removeTransaction} resetRedirect={this.resetRedirectState} transactions={state.transactions} />} />
                <Route path='/operations' exact render={() => state.redirect ? <Redirect push to="/transactions" /> : <Operations addTransaction={this.addTransaction} />} />
                <Route path='/breakdown' exact render={() => <Breakdown aggrTransactions={state.aggrTransactions} />} />
              </Switch>
            </Content>
          </Layout>
        </Router>
      </Layout>

    );
  }

}

export default App;
