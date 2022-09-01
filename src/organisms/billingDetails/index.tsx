import "../../app.scss";
import React, { useState, useEffect } from "react";
import moment, { Moment } from "moment";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../utils/helper";
import { addBill, removeBill, updateBill } from "../../store/actions";
import {
  Button,
  DatePicker,
  Dropdown,
  Input,
  Menu,
  Modal,
  Typography,
  Card,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DownOutlined,
} from "@ant-design/icons";

const BillingDetails: React.FC = () => {
  const { Meta } = Card;
  const { Text } = Typography;
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Moment | null>();
  const [id, setBillId] = useState<string | undefined>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [missingFields, setMissingFields] = useState<boolean>(false);
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);

  const bills = useSelector((state: BillingState) => state.bills);
  const dispatch = useDispatch();

  const resetStates = () => {
    setAmount(0);
    setCategory("");
    setDescription("");
    setBillId("");
    setDate(null);
    setMissingFields(false);
    setAddModalVisible(false);
    setEditModalVisible(false);
  };

  useEffect(() => {
    if (id) {
      const bill: IBilling = bills.filter(
        (bill: IBilling) => bill.id === id
      )[0];
      setAmount(bill.amount);
      setDate(bill.date);
      setCategory(bill.category);
      setDescription(bill.description);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const areEmptySpaces = (str: string) =>
    str === "" || str.match(/^ *$/) !== null;

  const validateFields = () =>
    amount && !areEmptySpaces(category) && date && !areEmptySpaces(description);

  const handleAddBill = () => {
    if (validateFields()) {
      dispatch(addBill({ amount, category, description, date }));
      setMissingFields(false);
      resetStates();
    } else {
      setMissingFields(true);
    }
  };

  const handleBillRemoval = (bill: IBilling) => {
    dispatch(removeBill(bill));
    setAddModalVisible(false);
  };

  const handleBillUpdate = () => {
    if (validateFields()) {
      dispatch(updateBill({ id, amount, category, description, date }));
      setMissingFields(false);
      resetStates();
    } else {
      setMissingFields(true);
    }
  };

  const handleBillEdit = (bill: IBilling) => {
    setBillId(bill.id);
    setEditModalVisible(true);
  };

  const getFilteredBills = () => {
    if (!categoryFilter) {
      return bills;
    }
    return bills.filter((bill: IBilling) => bill.category === categoryFilter);
  };

  const menu = () => {
    const billingCategories = new Set<string>();
    bills.map((bill: IBilling) => billingCategories.add(bill.category));
    return (
      <Menu>
        <Menu.Item onClick={() => setCategoryFilter("")}>None</Menu.Item>
        <Menu.Divider />
        {[...billingCategories].map((category: string, index) => (
          <Menu.Item key={index} onClick={() => setCategoryFilter(category)}>
            {category}
          </Menu.Item>
        ))}
      </Menu>
    );
  };

  return (
    <div className="billing-details-container">
      <div className="billing-details-header">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => setAddModalVisible(true)}
        >
          Add Bill
        </Button>
        <Dropdown overlay={menu()} trigger={["click"]}>
          <Button>
            {`Filter By Category ${
              categoryFilter ? ` : ${categoryFilter}` : ``
            }`}
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <Modal
        title="Add Bill"
        centered
        visible={addModalVisible || editModalVisible}
        onOk={() => (editModalVisible ? handleBillUpdate() : handleAddBill())}
        onCancel={() => resetStates()}
      >
        <Input
          placeholder="Enter Amount"
          required
          value={amount ? String(amount) : ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setAmount(Number(event.target.value))
          }
        />
        <Input
          placeholder="Enter Category"
          required
          value={category}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setCategory(event.target.value)
          }
        />
        <Input
          placeholder="Enter Description"
          required
          value={description}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(event.target.value)
          }
        />
        <DatePicker
          format="DD-MM-YYYY"
          value={date}
          onChange={(value: Moment | null, dateString: string) =>
            setDate(value)
          }
        />
        {missingFields && (
          <>
            <br />
            <br />
            <Text type="danger">Please fill all the fields.</Text>
          </>
        )}
      </Modal>
      <div className="billing-details-content">
        {!isEmpty(getFilteredBills()) &&
          getFilteredBills().map((bill: IBilling) => {
            return (
              <Card
                key={bill.id}
                actions={[
                  <EditOutlined
                    key="edit"
                    color="green"
                    onClick={() => handleBillEdit(bill)}
                  />,
                  <DeleteOutlined
                    key="delete"
                    color="red"
                    onClick={() => handleBillRemoval(bill)}
                  />,
                ]}
              >
                <Meta
                  title={`${bill.amount} $`}
                  description={`${bill.category}`}
                  className="bill-header"
                />
                <Meta description={`${bill.description}`} />
                <Meta description={moment(bill.date).format("DD-MM-YYYY")} />
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default BillingDetails;
