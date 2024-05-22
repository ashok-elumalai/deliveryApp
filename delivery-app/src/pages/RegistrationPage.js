import React from "react";
import { Form, Input, Button, Radio, message } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "./Form.css";
import image from "../Assets/images/registration.jpg";
import { API } from "../Api";

const { TextArea } = Input;

const RegistrationPage = () => {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = async (values) => {
    console.log("Received values:", values);
	const { username, password, confirmPassword, phoneNumber, address, name } = values;
	if (username && password && password === confirmPassword) {
		try {
		  // Make an API call to the /signup endpoint
		  const response = await API.post("/register/user", { name, username, password, confirmPassword, user_type: "NORMAL", mobile: phoneNumber, address });
	
		  if (response.status === 201) {
			// Handle success (e.g., redirect to a success page)
			console.log("Registration successful!");
			toast.success('User created Successfully!');
			  setTimeout(() => {
				  navigate('/login/user');
			  }, 2000);
		  } else {
			// Handle error (e.g., display an error message)
			toast.error('Error in user creation!');
		  }
		} catch (error) {
		  console.error("An error occurred during registration:", error);
		  toast.error('Error in user creation!');
		}
	} else {
		if(password !== confirmPassword){
			toast.warn('Confirm Password is not same as Password!');
		} else {
			toast.warn('Enter all the form details to create user!');
		}
	}
  };

  return (
    <div className="registration-container" style={{ width: "100%", display: "flex", flexFlow: "row nowrap", height: '100%', alignContent: "start", padding: 0 }}>
		{contextHolder}
      <div className="image-container" style={{ width: "50%", height: '100%' }}>
        <img
          src={image}
          style={{ width: "100%", height: "100vh" }}
          alt="Background"
          className="background-image"
        />
      </div>
      <div
        className="form-container"
        style={{ width: "50%",  height: "100vh", overflow: "auto", padding: 40 }} //backgroundColor: "black"
      >
        <Form
          style={{ width: "80%", height: "100%" }}
          name="registration"
          onFinish={onSubmit}
          layout="vertical"
        >
		<h1>User Registration</h1>
		<Form.Item
			label="Name" //<div style={{ color: "#fff" }}
			name="name"
			rules={[
				{ required: true, message: "Please enter your Name!" },
			]}
		>
			<Input placeholder="Enter the username" />
		</Form.Item>
	    <Form.Item
            label="Username" //<div style={{ color: "#fff" }}
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
            <Input.Password placeholder="Enter the password" />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              { required: true, message: "Please enter your confirmPassword!" },
            ]}
          >
            <Input.Password placeholder="Enter the confirm Password" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please enter your phoneNumber!" },
				{
					pattern: /^\d{10}$/,
					message: 'Please enter a valid 10-digit phone number!',
				},
            ]}
          >
            <Input placeholder="Enter the Phone Number" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter your address!" }]}
          >
            <TextArea placeholder="Enter the address" />
          </Form.Item>
		  { /*<Form.Item label="Membership" name="user_type" defaultValue="NORMAL" rules={[{required: true, message: "Please select Membership!"}]} >
			<Radio.Group>
				<Radio.Button value="PREMIUM">Plus Membership</Radio.Button>
				<Radio.Button value="NORMAL">Normal Membership</Radio.Button>
			</Radio.Group>
		</Form.Item> */}
          <Button
            type="primary"
            style={{ left: "0px", backgroundColor: "black" }}
			onClick={() => navigate(-1)}
          >
            Back to Login
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
