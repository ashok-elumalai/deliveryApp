import React from "react";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import "./Form.css";
import image from "../Assets/images/login2.jpg";

const LoginPage = () => {
  const onSubmit = (values) => {
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
      <div className="form-container" style={{ width: "50%" }}>
        <Form
          style={{ width: "50%" }}
          name="registration"
          onFinish={onSubmit}
          layout="vertical"
        >
          <Form.Item
            style={{ margin: 0 }}
            label={
              <div style={{ fontSize: "25px", fontWeight: "700" }}>Login</div>
            }
            className="form-title"
          >
            {/* Title: Login Form */}
          </Form.Item>
          <Form.Item label="" name="login">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              Login as:
              <Typography.Link
                style={{ color: "black", fontWeight: 700, padding: "0px 3px" }}
                href="#restaraunt/login"
              >
                Restaraunt?
              </Typography.Link>
              <Typography.Link
                style={{ color: "black", fontWeight: 700 }}
                href="#delivery/login"
              >
                Driver?
              </Typography.Link>
            </div>
          </Form.Item>
          <Form.Item
            label="Email/Username"
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
            <Input.Password placeholder="Enter the password" />
          </Form.Item>
          <Form.Item label="" name="rememberMe">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Checkbox>Remember Me</Checkbox>
              <Typography.Link
                style={{ color: "black", fontWeight: 700 }}
                href="#"
              >
                Forgot Password?
              </Typography.Link>
            </div>
          </Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "black", width: "100%" }}
            >
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
