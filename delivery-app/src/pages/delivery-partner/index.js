import { Avatar, Button, Layout, Modal, Radio, Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../Api";

function DeliveryPartnerHome() {
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null); // State to store selected row data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState("PREPARING");
  const navigate = useNavigate();

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const response = await API.get(
          `/delivery_partner/orders/${localStorage.getItem(
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

  const data = useMemo(() => {
	  let returner = [];
	tableData?.forEach(order => {
		const {
		user: { address, name, mobile },
		order: { total, status, order_date, id } = {},
		restaurant: { name: restName, mobile: restMobile, address: restAddress },
		dishes,
		} = order;
		const items = dishes.length; // Calculate the number of dishes
			
		// if(status === 'READY_FOR_DELIVERY' || status === 'OUT_FOR_DELIVERY' || status !== "DELIVERED"){
			returner.push({
				userName: name,
				userAddress: address,
				userMobile: mobile,
				orderNumber: id, // Use order.id for orderNumber
				orderDate: order_date,
				items: items.toString(), // Convert items count to string
				restName,
				restMobile,
				restAddress,
				amount: total, // Use order.total for amount
				status,
			});
		// }

	});
	return returner;
  }, [tableData]);

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

  const handleOk = async (selectedRow) => {
    setIsModalOpen(false);
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

  const handleOrderStatus = (e) => {
    console.log("radio checked", e.target.value);
    setOrderStatus(e.target.value);
  };

  const columns = [
    { title: "Order#", dataIndex: "orderNumber" },
    { title: "Items", dataIndex: "items" },
    { title: "Restaurant", dataIndex: "restName" },
    { title: "Restaurant Address", dataIndex: "restAddress" },
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
            {localStorage.getItem("deli_name")} ready to serve!
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
          <h2 style={{ color: "blue" }}>Orders ready to pick up</h2>
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
					Close
                </Button>
				{selectedRow.status !== 'DELIVERED' && 
                <Button
                  style={{
                    background: "black",
                    color: "white",
                    borderRadius: "50px",
                    marginLeft: "5px",
                  }}
                  onClick={() => handleOk(selectedRow)}
                >
                  Save
                </Button>
				}
              </div>
            }
          >
            {selectedRow && (
              <>
                <u style={{ color: "blue", fontWeight: 'bold' }}>Customer Details</u>
                {/* <p>Restaurant: {selectedRow?.Restaurant}</p> */}
                <p>Address: {selectedRow.userAddress}</p> {/*Customer Address*/}
                <p>Contact: {selectedRow.userMobile}</p>
                <p>Bill Amount: {selectedRow.amount}</p>
                <p>Payment Method: Online</p>
				<p>Payment Status: {selectedRow.status === 'UNPAID' ? 'Unpaid' : "Paid"}</p>
                {/* Add more details from selectedRow as needed */}
                <p style={{ color: "#038203", fontWeight: 'bold' }}>{selectedRow.status}</p>
                <u style={{ color: "blue", fontWeight: 'bold' }}>Restaraunt Details</u>
                <p>Order Number: {selectedRow.orderNumber}</p>
                <p>Address: {selectedRow.restAddress}</p> {/*Restaurant Address*/}
                <p>Contact: {selectedRow.restMobile}</p> {/*Restaurant Address*/}
				{ selectedRow.status !== 'DELIVERED' && ( <>
						<h3 style={{ paddingTop: "10px" }}>Update Order Status</h3>
						<Radio.Group onChange={handleOrderStatus} value={orderStatus}>
						<Radio value={"OUT_FOR_DELIVERY"}>Ordered picked up</Radio>
						<Radio value={"DELIVERED"}>Delivered</Radio>
						</Radio.Group>
					</>)
				}
              </>
            )}
          </Modal>
        </div>
      </div>
    </Layout>
  );
}

export default DeliveryPartnerHome;
