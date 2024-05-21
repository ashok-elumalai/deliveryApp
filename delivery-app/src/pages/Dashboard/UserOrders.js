import { useEffect, useMemo, useState } from "react";
import { Button, Form, Modal, Steps, Table } from "antd";
import API from "../../Api";
import { AppleOutlined, SmileOutlined, SolutionOutlined, ShoppingCartOutlined, CoffeeOutlined } from '@ant-design/icons';
import { getOrderStatusText } from '../../getOrderStatus';

const items = [
	{
		key: 'REST_ACCEPTED',
		title: 'Accepted',
		status: 'finish',
		icon: <SolutionOutlined />,
	},
	{
		key: 'PREPARING',
		title: 'Being Prepared',
		status: 'finish',
		icon: <CoffeeOutlined />,
	},
	{
		key: 'READY_FOR_DELIVERY',
		title: 'Order Ready',
		status: 'finish',
		icon: <ShoppingCartOutlined />,
	},
	{
		key: 'OUT_FOR_DELIVERY',
		title: 'Out for Delivery',
		status: 'finish',
		icon:  <AppleOutlined />,
	},
	{
		key: 'DELIVERED',
		title: 'Delivered',
		status: 'finish',
		icon: <SmileOutlined />,
	},
];

function UserOrders() {
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null); // State to store selected row data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState(0);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const response = await API.get(
          `/users/orders/${localStorage.getItem("user_id")}`
        );
		// console.log(response);
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
	
	let returner = [];

		tableData?.forEach((order) => {
		const {
			order: { total, status, order_date, id } = {},
			dishes,
			// delivery_partner,
			restaurant
		} = order;
		const items = dishes.length; // Calculate the number of dishes

		// if(status !== 'REST_CANCELED' && status !== 'PAID'){
			returner.push({
				orderNumber: id, // Use order.id for orderNumber
				restaurant: restaurant.name, // Use order.id for orderNumber
				items: items.toString(), // Convert items count to string
				address: restaurant.address,
				amount: total, // Use order.total for amount
				status,
				statusText: getOrderStatusText(status, "USER"),
				restContactNumber: restaurant.mobile,
				// deliContactNumber: delivery_partner.mobile
			});
		// }
	});
	return returner;
  }, [tableData]);

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
    { title: "Status", dataIndex: "statusText" },
    {
      title: "Action",
      dataIndex: "",
      render: (record) => (
        <Button style={{ color: "blue" }} onClick={() => showModal(record)}>
          Track Order
        </Button>
      ),
    },
  ];

  const handleOrderStatus = (e) => {
    console.log("radio checked", e.target.value);
    setOrderStatus(e.target.value);
  };

  const getStepItems = (selectedRow) => {
	const returner = [...items];
	const orderStatus = selectedRow.status;
	let currentIndex = returner.length - 1;

	returner.forEach((each, ind) => {
		let key = each.key;
		if(key === orderStatus){
			currentIndex = ind
		}
		if(currentIndex < ind){
			each.status = 'wait';
		} else {
			each.status = 'finish';
		}
	});

	return returner;
  }

  return (
    <div style={{ padding: "10px" }}>
      <h3 style={{ color: "blue" }}>Restaurant Orders</h3>
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
		width={900}
        footer={
          <div>
            {" "}
            <Button
              style={{
                background: "black",
                color: "white",
                borderRadius: "50px",
                marginLeft: "5px",
              }}
              onClick={handleOk}
            >
              Close
            </Button>
          </div>
        }
      >
        {selectedRow && (
          <>
		  	<div>
				<Steps
					items={getStepItems(selectedRow)}
				/>
			</div>
            <p>Order Number: {selectedRow.orderNumber}</p>
            <p>Items: {selectedRow.items}</p>
            <p>Restaurant: {selectedRow?.restaurant}</p>
            <p>Address: {selectedRow?.address}</p>
            <p>Restaurant Contact: {selectedRow.restContactNumber}</p>
            {/*<p>Delivery person Contact: {selectedRow.deliContactNumber}</p> */}
            <p>Amount: {selectedRow.amount}</p>
            <p>Payment Method: Online</p>
            <p>Payment Status: {selectedRow.status === 'UNPAID' ? 'Unpaid' : "Paid"}</p>
            {/* Add more details from selectedRow as needed */}
            {/* //TODO: Need to update from API */}
          </>
        )}
      </Modal>
    </div>
  );
}

export default UserOrders;
