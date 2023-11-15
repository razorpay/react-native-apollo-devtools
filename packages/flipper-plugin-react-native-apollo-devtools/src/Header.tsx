import {
  GithubOutlined,
  RocketOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, Row, Typography } from "antd";
import { getFlipperLib } from "flipper-plugin";
import React from "react";

export const Header = ({
  onFilter,
  filter,
}: {
  onFilter: (value: string) => void;
  filter: string;
}) => (
  <Row align="middle">
    <Col span={12}>
      <Typography.Title level={3}>
        <RocketOutlined />
        &nbsp;React Native Apollo Devtool
      </Typography.Title>
    </Col>
    <Col span={8}>
      <Input
        placeholder="Cache key, id, query, ..."
        allowClear
        value={filter}
        prefix={<SearchOutlined />}
        onChange={(e) => onFilter(e.currentTarget.value || "")}
      />
    </Col>
    <Col span={4}>
      <Button
        icon={<GithubOutlined />}
        onClick={() => {
          getFlipperLib().openLink(
            "https://github.com/razorpay/react-native-apollo-devtools"
          );
        }}
        type="link"
      >
        Github
      </Button>
    </Col>
  </Row>
);
