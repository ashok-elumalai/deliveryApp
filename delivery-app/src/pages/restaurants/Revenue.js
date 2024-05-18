import { Button, Table } from "antd";
import styles from "./orders.css";
import { useEffect, useMemo, useState } from "react";
import API from "../../Api";

const columns = [
  { title: "Order#", dataIndex: "orderNumber" },
  { title: "Items", dataIndex: "items" },
  { title: "Address", dataIndex: "address" },
  { title: "Amount", dataIndex: "amount" },
  { title: "Status", dataIndex: "status" },
//   {
//     title: "Action",
//     dataIndex: "",
//     render: () => <Button type="text">View</Button>,
//   },
];

function Revenue() {
  const [tableData, setTableData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        // Make an API call to the /signup endpoint
        const response = await API.get(`/restaurant/orders/${localStorage.getItem('rest_id')}`);
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

  const data = useMemo( () => {
	let grandTotal = 0;
	let returner = tableData?.map((order) => {
    const {
      user: { address, name },
      order: { total, status, order_date, id } = {},
      dishes,
    } = order;
    const items = dishes.length; // Calculate the number of dishes
	grandTotal += total;
    return {
      orderNumber: id, // Use order.id for orderNumber
      items: items.toString(), // Convert items count to string
      address,
      amount: total, // Use order.total for amount
      status,
    };
  });
  setTotalRevenue(grandTotal);
  return returner;
}, [tableData]);

  return (
    <div style={{ padding: "10px" }}>
	  <h1>Total Revenue:<span style={{ color:"red"}}>   {totalRevenue}</span></h1>
      {data?.length > 0 && (
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
        />
      )}
    </div>
  );
}

export default Revenue;
