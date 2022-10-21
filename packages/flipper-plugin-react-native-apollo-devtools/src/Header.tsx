import React from "react";
import { Typography, Button, Row, Col } from "antd";
import { RocketOutlined, GithubOutlined } from '@ant-design/icons';
import { getFlipperLib } from "flipper-plugin";

export const Header = () => (
    <Row align="middle">
        <Col span={18}>
            <Typography.Title level={3}>
                <RocketOutlined />
                &nbsp;React Native Apollo Devtool
            </Typography.Title>
        </Col>
        <Col span={6} >
            <Button icon={<GithubOutlined />} onClick={() => {
                getFlipperLib().openLink('https://github.com/razorpay/react-native-apollo-devtools')
            }} type="link">Github</Button></Col>
    </Row>
)
