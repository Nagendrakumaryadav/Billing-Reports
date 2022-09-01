import "../../app.scss";
import React from "react";
import { Line } from "@ant-design/charts";
import { useSelector } from "react-redux";
import { MONTHS } from "../../utils/constants";
import { isEmpty } from "../../utils/helper";

const BillingDetailsChart: React.FC = () => {
  const bills = useSelector((state: BillingState) => state.bills);

  const getMonthlyBill = (month: string) =>
    bills
      .filter((bill: IBilling) => bill.date.format("MMMM") === month)
      .map((bill: IBilling) => (bill.amount ? bill.amount : 0))
      .reduce((prev, next) => prev + next, 0);

  const data = isEmpty(bills)
    ? []
    : MONTHS.map((month: string) => {
        const chartData: IBillCHart = {};
        chartData.month = month;
        chartData.value = getMonthlyBill(month);
        return chartData;
      });

  const config = {
    data,
    height: 400,
    xField: "month",
    yField: "value",
    point: {
      size: 5,
      shape: "diamond",
    },
  };
  return (
    <div className="billing-details-chart">
      <Line {...config} />
    </div>
  );
};

export default BillingDetailsChart;
