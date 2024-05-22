import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography, Radio, Spin } from "antd";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

const CheckoutForm = (props) => {
  const { onFinish, memberStatus, setMemberStatus, isAlreadyPremium, memberPeriod, setMemberPeriod, setIsOnlinePayment } = props;
  const [form] = Form.useForm();

  const [paymentMethod, setPaymentMethod] = useState("ONLINE");
  const [isLoading, setIsLoading] = useState(false);

  // TODO: use this to send dishes to backend

  function getConvertedData(selectedOrders) {
	  const convertedData = [];
	  for (const item in selectedOrders) {
		convertedData.push(...Array(selectedOrders[item]).fill(item));
	  }
	  return convertedData;
  }

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => setIsLoading(false), 3000);
      localStorage.setItem("user_membership", "PREMIUM");
    }
  }, [isLoading]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(values) => {
        onFinish(values);
        form.resetFields();
      }}
      initialValues={{
        street: "",
        locality: "",
        landMark: "",
        pinCode: "",
        contactNumber: "",
        paymentMethod: "ONLINE",
		goldMember: memberStatus,
		memberPeriod: memberPeriod
      }}
    >
      <Form.Item
        label="Delivery Address"
        name="street"
        rules={[
          { required: true, message: "Please enter your street address!" },
        ]}
      >
        <Input placeholder="Street And Flat Number" />
      </Form.Item>

      <Form.Item
        name="locality"
        // rules={[{ required: true, message: "Please enter your locality!" }]}
      >
        <Input placeholder="Locality" />
      </Form.Item>

      <Form.Item
        name="landMark"
        // rules={[{ required: true, message: "Please enter your landMark!" }]}
      >
        <Input placeholder="Landmark" />
      </Form.Item>

      <div style={{ display: "flex" }}>
        <Form.Item
          style={{ paddingRight: "4px" }}
          name="pinCode"
          rules={[
            { required: true, message: "Please enter your postal code!" },
          ]}
        >
          <Input placeholder="pincode" />
        </Form.Item>
        <Form.Item
          name="contactNumber"
          rules={[
            { required: true, message: "Please enter your contact number!" },
          ]}
        >
          <Input placeholder="contact number" />
        </Form.Item>
      </div>

      <Form.Item label="Payment Method" name="paymentMethod">
        <Radio.Group
          onChange={(e) => {
			  setIsOnlinePayment(e.target.value);
            setPaymentMethod(e.target.value);
          }}
        >
          <Radio value={"COD"}>Cash On Delivery</Radio>
          <Radio value={"ONLINE"}>Credit or Debit card</Radio>
        </Radio.Group>
      </Form.Item>

      {paymentMethod === "ONLINE" && (
        <div>
          <Form.Item
            name="nameOnCard"
            // rules={[{ required: true, message: "Please enter Name On Card" }]}
          >
            <Input placeholder="name On Card" />
          </Form.Item>

          <Form.Item
            name="cardNumber"
            // rules={[
            //   { required: true, message: "Please enter your card Number!" },
            // ]}
          >
            <Input placeholder="card Number" />
          </Form.Item>

          <div style={{ display: "flex" }}>
            <Form.Item
              style={{ paddingRight: "4px" }}
              name="validThrough"
              // rules={[
              //   { required: true, message: "Please enter validThrough!" },
              // ]}
            >
              <Input placeholder="valid Through" />
            </Form.Item>

            <Form.Item
              name="cvv"
              // rules={[{ required: true, message: "Please enter cvv" }]}
            >
              <Input placeholder="cvv" />
            </Form.Item>
          </div>
          { !isAlreadyPremium && localStorage.getItem("user_membership") !== "PREMIUM" && (
            <Form.Item label="Become a member" name="goldMember">
              <Radio.Group
                onChange={(e) => {
				  setMemberStatus(e.target.value);
                }}
              >
                <Radio value={1}>Normal</Radio>
                <Radio value={2}>Gold Member</Radio>
              </Radio.Group>
            </Form.Item>
          )}
          { !isAlreadyPremium && memberStatus === 2 && localStorage.getItem("user_membership") !== "PREMIUM" && (
            <div style={{ display: "flex" }}>
              <Form.Item label="Membership Period" name="memberPeriod">
                <Radio.Group
                  onChange={(e) => {
                    setMemberPeriod(e.target.value);
                  }}
            	 rules={[{ required: true, message: "Please select Membership period" }]}
                >
                  <Radio value={"MONTHLY"}>Monthly: $20</Radio>
                  <Radio value={"ANNUALLY"}>Anually: $180</Radio>
                </Radio.Group>
              </Form.Item>
			  {/*
			
			*/}
              {localStorage.getItem("user_membership") !== "PREMIUM" && (
                <Button
                  style={{
                    background: "black",
                    color: " white",
                    borderRadius: "50px",
                  }}
                  onClick={() => {
                    setIsLoading(true);
                  }}
                >
                  {isLoading && (
                    <Spin
                      indicator={
                        <LoadingOutlined
                          style={{
                            fontSize: 16,
                            color: "white",
                            marginRight: "5px",
                          }}
                          spin
                        />
                      }
                    />
                  )}{" "}
                  Pay
                </Button>
              )}
            </div>
          )}
		  {/* 
          <Form.Item>
            <Button
              style={{
                background: "black",
                color: " white",
                borderRadius: "50px",
              }}
              type="primary"
              htmlType="submit"
            >
              Save card Details
            </Button>
          </Form.Item>
		*/}
        </div>
      )}
    </Form>
  );
};

export default CheckoutForm;
