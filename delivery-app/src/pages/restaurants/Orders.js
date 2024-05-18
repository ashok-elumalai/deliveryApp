import { useEffect, useState } from "react";
import { Button, Form, Modal, Radio, Table } from "antd";
import API from "../../Api";

// //TODO: remove removeData once integrated with api
const removeData = [
  {
    orderNumber: 12345,
    items: "Cornflake Halibut",
    address: "NO.12 XYZ road, some address 235467",
    amount: "$6",
    status: "New",
  },
  {
    orderNumber: 45678,
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
];

function Orders() {
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null); // State to store selected row data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState(0);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
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

  const showModal = (record) => {
    setSelectedRow(record); // Set selected row data on button click
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setOrderStatus(0);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setOrderStatus(0);
  };

  const columns = [
    { title: "Order#", dataIndex: "orderNumber" },
    { title: "Items", dataIndex: "items" },
    { title: "Address", dataIndex: "address" },
    { title: "Amount", dataIndex: "amount" },
    { title: "Status", dataIndex: "status" },
    {
      title: "Action",
      dataIndex: "",
      render: (record) => (
        <Button style={{ color: "blue" }} onClick={() => showModal(record)}>
          View
        </Button>
      ),
    },
  ];

  const handleOrderStatus = (e) => {
    console.log("radio checked", e.target.value);
    setOrderStatus(e.target.value);
  };

  return (
    <div style={{ padding: "10px" }}>
      <h3>Restaurant Orders</h3>
      {true && ( //data?.length > 0 // Check if data exists before rendering table
        <Table
          dataSource={removeData || data}
          columns={columns}
          pagination={false}
          onRowClick={(record) => showModal(record)}
        />
      )}
      {/*TODO: will add loader while loading table data */}
      <Modal
        title="Order Details"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={
          <div>
            {" "}
            <Button
              style={{
                borderRadius: "50px",
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              style={{
                background: "black",
                color: "white",
                borderRadius: "50px",
                marginLeft: "5px",
              }}
              onClick={handleOk}
            >
              Save
            </Button>
          </div>
        }
      >
        {selectedRow && (
          <>
            <p>Order Number: {selectedRow.orderNumber}</p>
            <p>Items: {selectedRow.items}</p>
            <p>Address: {selectedRow.address}</p>
            <p>Contact: {selectedRow.contactNumber}</p>
            <p>Amount: {selectedRow.amount}</p>
            <p>Payment Method: {selectedRow.paymentMethod}</p>
            <p>Payment Status: {selectedRow.paymentStatus}</p>
            {/* Add more details from selectedRow as needed */}
            <div>
              {orderStatus === 0 ? (
                <>
                  <Button
                    style={{
                      background: "#038203",
                      color: "white",
                      borderRadius: "50px",
                    }}
                    onClick={() => setOrderStatus(1)}
                  >
                    Accept Order
                  </Button>
                  <Button
                    style={{
                      background: "#ca0f0f",
                      color: "white",
                      borderRadius: "50px",
                    }}
                  >
                    Reject Order
                  </Button>
                </>
              ) : (
                <p style={{ color: "#038203" }}>Order Accepted</p>
              )}
            </div>
            <h3 style={{ paddingTop: "10px" }}>Update Order Status</h3>
            <Radio.Group onChange={handleOrderStatus} value={orderStatus}>
              <Radio value={1}>Preparing</Radio>
              <Radio value={2}>Ready for pickup</Radio>
            </Radio.Group>
          </>
        )}
      </Modal>
    </div>
  );
}

export default Orders;
