import { useEffect, useMemo, useState } from "react";
import { Button, Form, Modal, Radio, Table } from "antd";
import API from "../../Api";

function Orders() {
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null); // State to store selected row data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const response = await API.get(
          `/restaurant/orders/${localStorage.getItem("rest_id")}`
        );
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
    const timer = setInterval(() => {
      getAllOrders();
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const data = useMemo(() => {
    return tableData?.map((order) => {
      const {
        user: { address, name, mobile },
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
		contactNumber: mobile
      };
    });
  }, [tableData]);

  const showModal = (record) => {
    setSelectedRow(record); // Set selected row data on button click
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    console.log(selectedRow);
    try {
      const response = await API.put(`/order/${selectedRow.orderNumber}`, {
        status: orderStatus,
      });
      if (response.status === 200) {
        //   setTableData(response?.data?.orders);

        console.log("Order status changed");
      } else {
        // Handle error (e.g., display an error message)
        console.error("Failed to fetch orders.");
      }
    } catch (error) {
      console.error("An error occurred during fetching orders:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
        <Button
          style={{ color: "blue" }}
          onClick={() => {
            showModal(record);
            setOrderStatus(record.status);
          }}
        >
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
      <h1 style={{ color: "blue" }}>Restaurant Orders</h1>
      {true && ( //data?.length > 0 // Check if data exists before rendering table
        <Table
          dataSource={data}
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
            <p>Deliver To: {selectedRow.address}</p>
            <p>Contact: {selectedRow.contactNumber}</p>
            <p>Amount: {selectedRow.amount}</p>
            <p>Payment Method: Online</p>
            <p>Payment Status: PAID</p>
            {/* Add more details from selectedRow as needed */}
            <div>
              {orderStatus === "PAID" || orderStatus === "UNPAID" ? (
                <>
                  <Button
                    style={{
                      background: "#038203",
                      color: "white",
                      borderRadius: "50px",
                    }}
                    onClick={() => setOrderStatus("REST_ACCEPTED")}
                  >
                    Accept Order
                  </Button>
                  <Button
                    style={{
                      background: "#ca0f0f",
                      color: "white",
                      borderRadius: "50px",
                    }}
                    onClick={() => setOrderStatus("REST_CANCELED")}
                  >
                    Reject Order
                  </Button>
                </>
              ) : orderStatus === "REST_CANCELED" ? (
                <p style={{ color: "#ca0f0f" }}>Order Rejected</p>
              ) : (
                <p style={{ color: "#038203" }}>Order Accepted</p>
              )}
            </div>
			{(selectedRow.status === 'REST_ACCEPTED' || selectedRow.status === 'PREPARING' || selectedRow.status === 'READY_FOR_DELIVERY') && 
            	(<><h3 style={{ paddingTop: "10px" }}>Update Order Status</h3>
				<Radio.Group onChange={handleOrderStatus} value={orderStatus} disabled={selectedRow.status === 'READY_FOR_DELIVERY'}>
				  <Radio value={"PREPARING"}>Preparing</Radio>
				  <Radio value={"READY_FOR_DELIVERY"}>Ready for pickup</Radio>
				</Radio.Group></>)
			}
			{( selectedRow.status === 'DELIVERED' && <h2 style={{ color: "#038203" }}>Order Delivered</h2>)}
			{( selectedRow.status === 'OUT_FOR_DELIVERY' && <h2 style={{ color: "#038203" }}>Out for Delivery</h2>)}
          </>
        )}
      </Modal>
    </div>
  );
}

export default Orders;
