import React, { Component } from 'react';
import { Card, Col, Row, Typography } from 'antd';
import 'antd/dist/antd.css';

const { Text } = Typography;

class Breakdown extends Component {
    renderCategories = () => {
        return this.props.aggrTransactions.map((aggr) => {
            const name = Object.keys(aggr)[0]
            return (
                <Col key={`${name}-balance`} span={8}>
                    <Card key={name} title={name} bordered={false} style={{ marginTop: '17px' }} >
                        {
                            aggr[name] >= 0 ?
                                <Text type="success">{`Balance: $${aggr[name]}`}</Text> :
                                <Text type="danger">{`Balance: ($${-aggr[name]})`}</Text>
                        }
                    </Card>
                </Col>
            )
        })
    }

    render() {
        return (
            <div className="breakdown site-card-wrapper">
                <Row gutter={16}>
                    {this.renderCategories()}
                </Row>
            </div>
        );
    }
}

export default Breakdown;