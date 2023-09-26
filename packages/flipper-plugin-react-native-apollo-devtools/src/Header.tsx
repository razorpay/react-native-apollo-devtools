import { GithubOutlined, RocketOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Typography } from "antd";
import { getFlipperLib } from "flipper-plugin";
import React from "react";

export const Header = ({ onFilter }: {onFilter: (value: string) => void}) => (
    <Row align="middle">
        <Col span={12}>
            <Typography.Title level={3}>
                <RocketOutlined />
                &nbsp;React Native Apollo Devtool
            </Typography.Title>
        </Col>
        <Col span={6} >
            <Input
              placeholder='Cache key, id, query, ...'
              allowClear
              prefix={<SearchOutlined />}
              onChange={(e) => onFilter(e.currentTarget.value || '')}/>
              </Col>
        <Col span={6} >
            <Button icon={<GithubOutlined />} onClick={() => {
                getFlipperLib().openLink('https://github.com/razorpay/react-native-apollo-devtools')
            }} type="link">Github</Button></Col>
    </Row>
);
