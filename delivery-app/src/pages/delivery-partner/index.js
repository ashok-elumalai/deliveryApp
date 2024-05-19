import { Avatar, Button, Layout, Modal, Radio, Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../Api";

// //TODO: remove removeData once integrated with api
const removeData = [
  {
    orderNumber: 12345,
    items: "Cornflake Halibut",
    restaurant: "Palisade Kitchen & Bar",
    address: "NO.12 XYZ road, some address 235467",
    amount: "$6",
    status: "Ready for pickup",
  },
  {
    orderNumber: 45678,
    items: "Cornflake Halibut",
    restaurant: "Diggies",
    address: "NO.12 XYZ road, some address 235467",
    amount: "$6",
    status: "Delivered",
  },
  {
    orderNumber: 12345,
    items: "Cornflake Halibut",
    restaurant: "Palisade Kitchen & Bar",
    address: "NO.12 XYZ road, some address 235467",
    amount: "$6",
    status: "Ready for pickup",
  },
  {
    orderNumber: 12345,
    items: "Cornflake Halibut",
    restaurant: "Seaside Shahi",
    address: "NO.12 XYZ road, some address 235467",
    amount: "$6",
    status: "Delivered",
  },
];

function DeliveryPartnerHome() {
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null); // State to store selected row data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const response = await API.get(
          `/delivery_partner/orders/delivery_partner_id/${localStorage.getItem(
            "deli_id"
          )}`
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
  }, []);

  const data = tableData?.map((order) => {
    const {
      User: { address, name },
      order: { total, status, order_date, id } = {},
      restaurant: { restaurantName },
      dishes,
    } = order;
    const items = dishes.length; // Calculate the number of dishes

    return {
      orderNumber: id, // Use order.id for orderNumber
      items: items.toString(), // Convert items count to string
      restaurant: restaurantName,
      address,
      amount: total, // Use order.total for amount
      status,
    };
  });

  const handleLogout = () => {
    // Perform logout logic here, like clearing tokens or user data
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_membership");
    localStorage.removeItem("rest_id");
    localStorage.removeItem("rest_name");
    localStorage.removeItem("deli_id");
    localStorage.removeItem("deli_name");
    console.log("User logged out");
    navigate("/login/delivery-partner");
  };

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

  const handleOrderStatus = (e) => {
    console.log("radio checked", e.target.value);
    setOrderStatus(e.target.value);
  };

  const columns = [
    { title: "Order#", dataIndex: "orderNumber" },
    { title: "Items", dataIndex: "items" },
    { title: "Restaurant", dataIndex: "restaurant" },
    { title: "Restaurant Address", dataIndex: "address" },
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
  return (
    <Layout>
      <Layout.Header
        style={{
          position: "fixed",
          right: "0",
          left: "0",
          zIndex: "999",
          padding: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
            style={{ backgroundColor: "#fff" }}
            size={48}
          />
          <h2 style={{ color: "#fff", padding: 0, margin: 0, marginLeft: 10 }}>
            {localStorage.getItem("rest_name")} at your service!
          </h2>
        </div>
        <div>
          <h1
            style={{
              color: "#fff",
              fontSize: 38,
              fontWeight: "bolder",
              marginTop: 8,
            }}
          >
            Aussie Bites &#9889;
          </h1>
        </div>
        <div>
          <Button type="primary" danger onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Layout.Header>
      <div style={{ padding: "10px", paddingTop: "70px" }}>
        <div style={{ padding: "10px" }}>
          <h3 style={{ color: "blue" }}>Orders ready to pick up</h3>
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
                <p style={{ color: "blue" }}>Customer Details</p>
                <p>Order Number: {selectedRow.orderNumber}</p>
                <p>Items: {selectedRow.items}</p>
                {/* <p>Restaurant: {selectedRow?.Restaurant}</p> */}
                <p>Address: {selectedRow.address}</p> {/*Customer Address*/}
                <p>Contact: {selectedRow.contactNumber}</p>
                <p>Bill Amount: {selectedRow.amount}</p>
                <p>Payment Method: Online</p>
				<p>Payment Status: {selectedRow.status === 'UNPAID' ? 'Unpaid' : "Paid"}</p>
                {/* Add more details from selectedRow as needed */}
                {/* //TODO: Need to update from API */}
                <p style={{ color: "#038203" }}>Ready for pickup</p>
                <p style={{ color: "blue" }}>Restaraunt Details</p>
                <p>Order Number: {selectedRow.orderNumber}</p>
                <p>Items: {selectedRow.items}</p>
                <p>Address: {selectedRow.address}</p> {/*Restaurant Address*/}
                <h3 style={{ paddingTop: "10px" }}>Update Order Status</h3>
                <Radio.Group onChange={handleOrderStatus} value={orderStatus}>
                  <Radio value={"ORDERED_PICKED_UP"}>Ordered picked up</Radio>
                  <Radio value={"DELIVERED"}>Delivered</Radio>
                </Radio.Group>
              </>
            )}
          </Modal>
        </div>
      </div>
    </Layout>
  );
}

export default DeliveryPartnerHome;
