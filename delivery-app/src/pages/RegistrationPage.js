import React from "react";
import { Form, Input, Button, Radio } from "antd";
import "./Form.css";
import image from "../Assets/images/registration.jpg";

const RegistrationPage = () => {
  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  return (
    <div className="registration-container" style={{ width: "100%" }}>
      <div className="image-container" style={{ width: "50%" }}>
        <img
          src={image}
          style={{ width: "100%" }}
          alt="Background"
          className="background-image"
        />
      </div>
      <div
        className="form-container"
        style={{ width: "50%" }} //backgroundColor: "black"
      >
        <Form
          style={{ width: "50%" }}
          name="registration"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label={
              <div style={{ fontSize: "25px", fontWeight: "700" }}>
                Registration Form
              </div>
            }
            className="form-title"
          >
            {/* Title: Registration Form */}
          </Form.Item>
          <Form.Item
            label="Email/Username" //<div style={{ color: "#fff" }}
            name="username"
            rules={[
              { type: "email", message: "Please enter a valid email!" },
              { required: true, message: "Please enter your username!" },
            ]}
          >
            <Input placeholder="Enter the username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input placeholder="Enter the password" />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              { required: true, message: "Please enter your confirmPassword!" },
            ]}
          >
            <Input placeholder="Enter the confirm Password" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please enter your phoneNumber!" },
            ]}
          >
            <Input placeholder="Enter the Phone Number" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter your address!" }]}
          >
            <Input placeholder="Enter the address" />
          </Form.Item>
          <Form.Item label="" name="membership">
            <Radio.Group defaultValue={1}>
              <Radio value={1}>Plus Membership</Radio>
              <Radio value={2}>Normal Membership</Radio>
            </Radio.Group>
          </Form.Item>
          <Button
            type="primary"
            style={{ left: "0px", backgroundColor: "black" }}
          >
            cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{ left: "10px", backgroundColor: "black" }}
          >
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default RegistrationPage;
