import "./app.scss";

import React from "react";
import "antd/dist/antd.css";
import { Carousel } from "antd";
import { BILLING_HEADERS } from "./utils/constants";
import { Tabs } from "antd";
import {
  MoneyCollectOutlined,
  LineChartOutlined,
  FormOutlined,
} from "@ant-design/icons";
import BillingDetails from "./organisms/billingDetails";
import BillingDetailsChart from "./organisms/billingDetailsChart";
import BillingDetailsReport from "./organisms/billingDetailsReport";

const App: React.FC = () => {
  const { TabPane } = Tabs;
  return (
    <div className="billing-app">
      <Carousel autoplay>
        {BILLING_HEADERS.map((billingTitle: string) => {
          return (
            <div>
              <h3 className="billing-title">{billingTitle}</h3>
            </div>
          );
        })}
      </Carousel>
      <Tabs
        defaultActiveKey="1"
        className="billing-content"
        centered={true}
        tabBarGutter={200}
        size="large"
      >
        <TabPane
          tab={
            <span>
              <MoneyCollectOutlined className="billing-tab-icons" /> Billing
              Details
            </span>
          }
          key="1"
        >
          <BillingDetails />
        </TabPane>
        <TabPane
          tab={
            <span>
              <LineChartOutlined className="billing-tab-icons" /> Time-Series
              Chart
            </span>
          }
          key="2"
        >
          <BillingDetailsChart />
        </TabPane>
        <TabPane
          tab={
            <span>
              <FormOutlined className="billing-tab-icons" /> Billing Report
            </span>
          }
          key="3"
        >
          <BillingDetailsReport />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default App;
