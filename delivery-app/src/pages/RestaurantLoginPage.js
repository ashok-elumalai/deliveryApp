import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import "./Form.css";
import image from "../Assets/images/login2.jpg";
import { API } from "../Api";
import { setToken } from "../state/commonSlice";

const RestaurantLoginPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    console.log("Received values:", values);
    try {
      // Make an API call to the /signup endpoint
	  const response = await API.post("/login", {...values, user_type: "RESTAURANT"});
      if (response.status === 200) {
        // set token here
        dispatch(setToken(response?.data?.user_token));
		const { id, name } = response.data?.user_details;
        const token = response?.data?.user_token;
		if(token){
			localStorage.setItem("token", token);
			localStorage.setItem("rest_id", id);
			localStorage.setItem("rest_name", name);
			navigate("/restaurant/home");
		}
        console.log("Logged in successfully!");
      } else {
        // Handle error (e.g., display an error message)
        console.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
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
              <div style={{ fontSize: "25px", fontWeight: "700" }}>Restaurant Login</div>
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
				onClick={()=> navigate("/login/user")}
              >
                User?
              </Typography.Link>
              <Typography.Link
                style={{ color: "black", fontWeight: 700, marginLeft: 10 }}
				onClick={()=> navigate("/login/delivery-partner")}
              >
                Driver?
              </Typography.Link>
            </div>
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
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
			  flexFlow: "column wrap",
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
			<Button
              type="primary"
			  onClick={() => navigate("/register")}
              style={{ width: "100%", marginTop: 20 }}
            >
              Signup
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RestaurantLoginPage;
