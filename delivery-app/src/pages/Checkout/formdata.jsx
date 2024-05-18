import React, { useEffect } from "react";
import { Form, Input, Button, Typography, Radio } from "antd";
import { useSelector } from "react-redux";

const CheckoutForm = () => {
  const [form] = Form.useForm();
  const selectedOrders = useSelector((state) => state.UserOrdersSlice.orders);

  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  // TODO: use this to send dishes to backend
  const convertedData = [];
  for (const item in selectedOrders) {
    convertedData.push(...Array(selectedOrders[item]).fill(item));
  }

  return (
    <Form
      form={form}
      layout="vertical"
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
        <Radio.Group>
          <Radio value={1}>Cash On Delivery</Radio>
          <Radio value={2}>Credit or Debit card</Radio>
        </Radio.Group>
      </Form.Item>

      {form.getFieldValue("paymentMethod") === 2 && (
        <div>
          <CardForm />
        </div>
      )}
    </Form>
  );
};

function CardForm() {
  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        nameOnCard: "",
        cardNumber: "",
        validThrough: "",
        cvv: "",
      }}
    >
      <Form.Item
        name="nameOnCard"
        rules={[{ required: true, message: "Please enter Name On Card" }]}
      >
        <Input placeholder="name On Card" />
      </Form.Item>

      <Form.Item
        name="cardNumber"
        rules={[{ required: true, message: "Please enter your card Number!" }]}
      >
        <Input placeholder="card Number" />
      </Form.Item>

      <div style={{ display: "flex" }}>
        <Form.Item
          style={{ paddingRight: "4px" }}
          name="validThrough"
          rules={[{ required: true, message: "Please enter validThrough!" }]}
        >
          <Input placeholder="valid Through" />
        </Form.Item>

        <Form.Item
          name="cvv"
          rules={[{ required: true, message: "Please enter cvv" }]}
        >
          <Input placeholder="cvv" />
        </Form.Item>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CheckoutForm;
