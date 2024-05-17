import { Button, Table } from "antd";
import styles from "./orders.css";

const columns = [
  { title: "Order#", dataIndex: "orderNumber" },
  { title: "Items", dataIndex: "items" },
  { title: "Address", dataIndex: "address" },
  { title: "Amount", dataIndex: "amount" },
  { title: "Status", dataIndex: "status" },
  {
    title: "Action",
    dataIndex: "",
    render: () => <Button type="text">View</Button>,
  },
];

const dataSource = [
  {
    orderNumber: 12345,
    items: "Cornflake Halibut",
    address: "NO.12 XYZ road, some address 235467",
    amount: "$6",
    status: "New",
  },
  {
    orderNumber: 12345,
    items: "Cornflake Halibut",
    address: "NO.12 XYZ road, some address 235467",
    amount: "$6",
    status: "New",
  },
  {
    orderNumber: 12345,
    items: "Cornflake Halibut",
    address: "NO.12 XYZ road, some address 235467",
    amount: "$6",
    status: "New",
  },
  {
    orderNumber: 12345,
    items: "Cornflake Halibut",
    address: "NO.12 XYZ road, some address 235467",
    amount: "$6",
    status: "New",
  },
  // ... more orders
];

function Orders() {
  return (
    <div style={{ padding: "10px" }}>
      <h3>Restaurant Orders</h3>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
}

export default Orders;
