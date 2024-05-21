import {
  Card,
  Typography,
  Row,
  Col,
  Rate,
  Space,
  Layout,
  Input,
  Button,
} from "antd";
import { useSelector, useDispatch } from "react-redux";

import { LeftOutlined } from "@ant-design/icons";
import { ResHeaderContainer } from "../RestaurantDetails";
import { useNavigate } from "react-router-dom";
import CheckoutForm from "./formdata";
import { useEffect, useState } from "react";
import API from '../../Api';
import { toast } from 'react-toastify';
import { getOrderStatusText } from '../../getOrderStatus';

function CheckoutPage() {
  const [formDetails, setFormDetails] = useState({});
  const [memberStatus, setMemberStatus] = useState(1);
  const [memberPeriod, setMemberPeriod] = useState("MONTHLY");
  const [isOnlinePayment, setIsOnlinePayment] = useState("ONLINE");
  const [orderDetails, setOrderDetails] = useState({});

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const onFinish = (values) => {
    console.log("Form values:", values);
    setFormDetails(values);
  };

  function discountedAmount(totalAmount, discountPercentage) {
    const discountAmount = totalAmount * (discountPercentage / 100);
    const discountedTotal = totalAmount - discountAmount;
    return discountedTotal;
  }

  const isPremiumMember = memberStatus === 2 || localStorage.getItem("user_membership") === "PREMIUM";

  const isNewMember = memberStatus === 2 && localStorage.getItem("user_membership") !== "PREMIUM"

  let totalPrice = 0;
  let deliveryPrice = !isPremiumMember ? 10 : 0;

  
  const itemsArr = getConvertedData(window.SelectedDishes?.orders);
  const numberOfItems = itemsArr?.length || 0;

  itemsArr.forEach(eachItemId => {
	window.dishes?.forEach(eachDish => {
		// eslint-disable-next-line eqeqeq
		if(eachDish.id == eachItemId) {
			totalPrice += eachDish.price;
		}
	})
  });

  let membershipPrice = isNewMember ? (memberPeriod === 'MONTHLY' ? 20 : 180 ) : 0;

  let grandTotal = isPremiumMember ? discountedAmount(totalPrice, 20) : totalPrice;
  grandTotal = grandTotal + deliveryPrice;

  console.log( { itemsArr, dishes: window.dishes, selectedDishes: window.SelectedDishes, totalPrice, member: memberStatus, locMem: localStorage.getItem("user_membership") }, ">>>>>>>>>>" );

  	function getConvertedData(selectedOrders) {
		const convertedData = [];
		if(selectedOrders) {
			for (const item in selectedOrders) {
				convertedData.push(...Array(selectedOrders[item]).fill(item));
			}
		}
		return convertedData;
	}

	const getOrder = async (orderID = orderDetails?.id) => {
		if(orderID && orderDetails?.status !== "DELIVERED") {
			try {
			  const response = await API.get(
				`/order/${orderID}`
			  );
			  if (response.status === 200) {
				if(response?.data?.order?.status !== orderDetails?.status ){
					const orderStatusVal = response?.data?.order?.status
					toast.success(getOrderStatusText(orderStatusVal, "USER"), {autoClose: false});
					setOrderDetails({ id: orderID, status: response?.data?.order?.status });
				}
			  } else {
				// Handle error (e.g., display an error message)
				console.error("Failed to fetch orders.");
			  }
			} catch (error) {
			  console.error("An error occurred during fetching orders:", error);
			}
		}
	  };


	useEffect(()=>{
		getOrder(orderDetails?.id, orderDetails?.status);
		const timer = setInterval(() => {
			getOrder(orderDetails?.id);
		}, 5000);

		return () => {
			clearInterval(timer);
		};
	},[orderDetails]);

	
	const makePayment = async (grandTotal, dishesIds) => {
		console.log(formDetails);
		localStorage.setItem("user_membership", isPremiumMember ? "PREMIUM" : "NORMAL");
		try {
			const response = await API.post(`/order_now`, {
				restaurant_id: localStorage.getItem('rest_id'),
				dish_ids: dishesIds,
				total_price: grandTotal,
				user_type: isPremiumMember ? "PREMIUM" : "NORMAL",
				order_status: isOnlinePayment === "ONLINE" ? "PAID" : "UNPAID"
			});
			if (response.status === 201) {
				console.log("Order placed successfully!");
				toast.success("Order placed successfully!");
				// setInterval(() => {
				// 	navigate("/");
				// }, 3000);
				setOrderDetails({id: response?.data?.order_id, status: response?.data?.order_status});
				getOrder(response?.data?.order_id);

				// response.data.order_id and response.data.order_id
				// and disable make payment button and show order details button which will toggle a modal with order details

				// hit another api "/order/order_id" to get this particular order details
				// for several time to show order latest details and notification
			} else {
			  console.error("Failed to place Order");
			}
		  } catch (error) {
			console.error("An error occured while placing order:", error);
		  }
	  };

  return (
    <>
      <Layout>
        <ResHeaderContainer>
          <Space>
            <LeftOutlined onClick={goBack} />
            <Typography.Title>
              Checkout
            </Typography.Title>
          </Space>

          <Button
            type="text"
            onClick={() => {
              navigate("/");
            }}
          >
            back to homepage
          </Button>
        </ResHeaderContainer>
        <div
          style={{
            marginTop: 100,
            padding: 50,
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div>
            <CheckoutForm
              onFinish={onFinish}
			  isAlreadyPremium={localStorage.getItem('user_membership') === 'PREMIUM'}
			  memberStatus={memberStatus}
              setMemberStatus={setMemberStatus}
			  memberPeriod={memberPeriod}
			  setMemberPeriod={setMemberPeriod}
			  setIsOnlinePayment={setIsOnlinePayment}
            />
          </div>
          <div style={{ width: "250px" }}>
            <h3>Payment Details</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>Items</p>
              <p>{numberOfItems}</p>
            </div>
            
			  <div style={{ display: "flex", justifyContent: "space-between" }}>
				<p>Dishes Cost</p>
				<p>
				  ${isPremiumMember ? //TODO: remove 100 in bellow line and add amount from window?.SelectedDishes?.amount
				  discountedAmount(totalPrice, 20)
					: totalPrice}
				</p>
			  </div>
			  
			  { isPremiumMember && (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>Member Discount on dishes cost</p>
                  <p>20%</p>
                </div>
              )}

			  {/* 
			  { isNewMember && (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>Membership Price</p>
                  <p>${membershipPrice}</p>
                </div>
              )}
			*/}

			  <div style={{ display: "flex", justifyContent: "space-between" }}>
				<p>Delivery & Service Charge</p>
				<p>{deliveryPrice ? `$${deliveryPrice}` : 'Free'}</p>
			  </div>
			  <div style={{ display: "flex", justifyContent: "space-between" }}>
				<p style={{ fontWeight: 700 }}>Total</p>
				<p>
				  ${grandTotal}
				</p>
			  </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                style={{
                  background: "black",
                  color: "white",
                  borderRadius: "50px",
                }}
                onClick={() => makePayment(grandTotal, itemsArr)}
              >
                Make Payment
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
export default CheckoutPage;
