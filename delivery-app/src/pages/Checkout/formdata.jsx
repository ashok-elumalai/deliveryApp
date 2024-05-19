import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography, Radio } from "antd";
import { useSelector } from "react-redux";

const CheckoutForm = () => {
  const [form] = Form.useForm();

  const [paymentMethod, setPaymentMethod] = useState(2);

  const onFinish = (values) => {
    console.log("Form values:", values, window.SelectedDishes, { dishes: getConvertedData(window.SelectedDishes.orders) });
  };

  // TODO: use this to send dishes to backend

  function getConvertedData(selectedOrders) {
	  const convertedData = [];
	  for (const item in selectedOrders) {
		convertedData.push(...Array(selectedOrders[item]).fill(item));
	  }
	  return convertedData;
  }

  const onOrderConfirmationClick = (formValues) => {
    console.log(formValues, ">>>>");
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        street: "",
        locality: "",
        landMark: "",
        pinCode: "",
        contactNumber: "",
        paymentMethod: 2,
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
        rules={[{ required: true, message: "Please enter your locality!" }]}
      >
        <Input placeholder="Locality" />
      </Form.Item>

      <Form.Item
        name="landMark"
        rules={[{ required: true, message: "Please enter your landMark!" }]}
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
            setPaymentMethod(e.target.value);
          }}
        >
          <Radio value={1}>Cash On Delivery</Radio>
          <Radio value={2}>Credit or Debit card</Radio>
        </Radio.Group>
      </Form.Item>

      {paymentMethod === 2 && (
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

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Pay now
            </Button>
          </Form.Item>
        </div>
      )}
    </Form>
  );
};

export default CheckoutForm;
