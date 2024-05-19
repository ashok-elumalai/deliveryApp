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
import { useState } from "react";

function CheckoutPage() {
  const [formDetails, setFormDetails] = useState({});
  const [memberStatus, setMemberStatus] = useState(1);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const onFinish = (values) => {
    console.log("Form values:", values);
    setFormDetails(values);
  };

  const makePayment = () => {
    console.log(formDetails);
  };

  function discountedAmount(totalAmount, discountPercentage) {
    const discountAmount = totalAmount * (discountPercentage / 100);
    const discountedTotal = totalAmount - discountAmount;
    return discountedTotal;
  }

  const isPremiumMember = memberStatus === 2 || localStorage.getItem("user_membership") === "PREMIUM";

  let totalPrice = 0;
  let deliveryPrice = isPremiumMember ? 10 : 0;

  
  const itemsArr = getConvertedData(window.SelectedDishes?.orders);
  const numberOfItems = itemsArr?.length || 0;

  itemsArr.forEach(eachItemId => {
	window.dishes?.forEach(eachDish => {
		console.log(eachDish.id, eachItemId, ">>>");
		if(eachDish.id == eachItemId) {
			console.log(eachDish.id, eachItemId, " TRUEEE >>>");
			totalPrice += eachDish.price;
		}
	})
  })

  console.log( { itemsArr, dishes: window.dishes, selectedDishes: window.SelectedDishes, totalPrice }, ">>>>>>>>>>" );

  	function getConvertedData(selectedOrders) {
		const convertedData = [];
		if(selectedOrders) {
			for (const item in selectedOrders) {
				convertedData.push(...Array(selectedOrders[item]).fill(item));
			}
		}
		return convertedData;
	}

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
              setMemberStatus={setMemberStatus}
            />
          </div>
          <div style={{ width: "250px" }}>
            <h3>Payment Details</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>Items</p>
              <p>{numberOfItems}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>Delivery Charge</p>
              <p>{deliveryPrice ? deliveryPrice : 'Free'}</p>
            </div>
            { isPremiumMember && (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>Member Discount</p>
                  <p>20%</p>
                </div>
              )}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ fontWeight: 700 }}>Total</p>
              <p>
                {isPremiumMember ? //TODO: remove 100 in bellow line and add amount from window?.SelectedDishes?.amount
                    discountedAmount(totalPrice, 20)
                  : totalPrice}
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
                onClick={makePayment}
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
