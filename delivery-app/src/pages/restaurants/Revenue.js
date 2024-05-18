import { Button, Table } from "antd";
import styles from "./orders.css";
import { useEffect, useState } from "react";
import API from "../../Api";

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

//TODO: remove removeData once integrated with api
const removeData = [
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

function Revenue() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        // Make an API call to the /signup endpoint
        const response = await API.get("/restaurant/orders/restaurant_id");
        if (response.status === 200) {
          setTableData(response?.data?.orders);
        } else {
          // Handle error (e.g., display an error message)
          console.error("Failed to fetch orders.");
        }
      } catch (error) {
        console.error("An error occurred during fetching orders:", error);
      }
    };
    getAllOrders();
  }, []);

  const data = tableData?.map((order) => {
    const {
      User: { address, name },
      order: { total, status, order_date, id } = {},
      dishes,
    } = order;
    const items = dishes.length; // Calculate the number of dishes

    return {
      orderNumber: id, // Use order.id for orderNumber
      items: items.toString(), // Convert items count to string
      address,
      amount: total, // Use order.total for amount
      status,
    };
  });
  return (
    <div style={{ padding: "10px" }}>
      <h3>Revenue</h3>
      {/* TODO: replace removeData when integrated with backend */}
      {data?.length > 0 && (
        <Table
          dataSource={removeData || data}
          columns={columns}
          pagination={false}
        />
      )}
    </div>
  );
}

export default Revenue;
