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
  const currentRestaurant = useSelector(
    (state) => state.currentRestaurant.selectedRestaurant
  );
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
              <p>$5</p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>Delivery Charge</p>
              <p>$1</p>
            </div>
            {memberStatus === 2 &&
              localStorage.getItem("user_membership") === "PREMIUM" && (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>Discount</p>
                  <p>20%</p>
                </div>
              )}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ fontEeight: 700 }}>Total</p>
              <p>
                {memberStatus === 2 &&
                localStorage.getItem("user_membership") === "PREMIUM"
                  ? //TODO: remove 100 in bellow line and add amount from window?.SelectedDishes?.amount
                    discountedAmount(100, 20)
                  : "$6"}
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
