import React from "react";
import { Form, Input, Button, Radio } from "antd";
import "./Form.css";
import image from "../Assets/images/registration.jpg";
import { API } from "../Api";

const RegistrationPage = () => {
  const onSubmit = async (values) => {
    console.log("Received values:", values);
    try {
      // Make an API call to the /signup endpoint
      const response = await API("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), // Send form values as JSON
      });

      if (response.ok) {
        // Handle success (e.g., redirect to a success page)
        console.log("Registration successful!");
      } else {
        // Handle error (e.g., display an error message)
        console.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
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
          onFinish={onSubmit}
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
          <Form.Item
            label="Business Type"
            name="business_type"
            rules={[
              { required: true, message: "Please enter your business type!" },
            ]}
          >
            <Input placeholder="Enter the business typ eg: Restaurant/Cafe/Bar" />
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
