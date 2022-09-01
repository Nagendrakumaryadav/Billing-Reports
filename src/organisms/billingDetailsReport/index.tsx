import "../../app.scss";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Menu, Button, Input, Dropdown } from "antd";
import { DownOutlined, DownloadOutlined } from "@ant-design/icons";
import { MONTHS } from "../../utils/constants";
import { isEmpty } from "../../utils/helper";

const BillingDetailsReport: React.FC = () => {
  const bills = useSelector((state: BillingState) => state.bills);
  const [month, setMonth] = useState<string>("");
  const [budget, setBudget] = useState<number>(0);

  const menu = () => {
    const billingCategories = new Set<string>();
    bills.map((bill: IBilling) => billingCategories.add(bill.category));
    return (
      <Menu>
        <Menu.Divider />
        {MONTHS.map((month: string, index) => (
          <Menu.Item key={index} onClick={() => setMonth(month)}>
            {month}
          </Menu.Item>
        ))}
      </Menu>
    );
  };

  const downloadReport = () => {
    const monthlyBills: IBilling[] = bills.filter(
      (bill: IBilling) => bill.date.format("MMMM") === month
    );
    if (!isEmpty(monthlyBills)) {
      monthlyBills.sort((billObjectA: IBilling, billObjectB: IBilling) =>
        billObjectA.amount !== null &&
        billObjectB.amount !== null &&
        billObjectA.amount < billObjectB.amount
          ? 1
          : -1
      );
    }
    let sum = 0;
    let billingContent: BillingState = { bills: [] };
    for (let index = 0; index < monthlyBills.length; index++) {
      if (monthlyBills[index].amount) {
        if (sum + monthlyBills[index].amount > budget) {
          continue;
        } else {
          sum = sum + monthlyBills[index].amount;
          const { description, category, amount, date } = monthlyBills[index];
          billingContent.bills.push({
            id: String(index + 1),
            description: description,
            category: category,
            amount: amount,
            date: date.format("MM-DD-YYYY"),
          });
        }
      }
    }
    const a = document.createElement("a");
    const file = new Blob([JSON.stringify(billingContent, null, 2)], {
      type: "text/plain",
    });
    a.href = URL.createObjectURL(file);
    a.download = `${month}-Billing-Report.json`;
    a.click();
  };

  return (
    <div className="billing-details-report-container">
      <div className="billing-details-report-content">
        <Input
          placeholder="Enter Budget"
          required
          value={budget ? budget : ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setBudget(Number(event.target.value))
          }
        />
        <Dropdown overlay={menu()} trigger={["click"]}>
          <Button>
            {`Choose Month ${month ? ` : ${month}` : ``}`}
            <DownOutlined />
          </Button>
        </Dropdown>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          disabled={!budget || !month}
          onClick={() => downloadReport()}
        >
          Download Billing Report
        </Button>
      </div>
    </div>
  );
};

export default BillingDetailsReport;
