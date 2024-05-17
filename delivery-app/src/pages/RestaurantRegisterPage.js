import React, { useEffect, useState } from "react";
import { Form, Input, Button, Radio, Select } from "antd";
import "./Form.css";
import image from "../Assets/images/registration.jpg";
import { API } from "../Api";

const { Option } = Select;

const RegistrationPage = () => {

	const [form] = Form.useForm();
  const [formValues, setFormValues] = useState({});

	// Update formValues state whenever form values change
	useEffect(() => {
		const unsubscribe = form.subscribe(({ values }) => {
		setFormValues(values);
		});

		// Cleanup the subscription on unmount
		return () => {
		unsubscribe();
		};
	}, [form]);

  const onSubmit = async (values) => {
    console.log("Received values:", values);
	return null;
    try {
      // Make an API call to the /signup endpoint
      const response = await API.post("/register/user", { ...values});

      if (response.status === 200) {
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
    <div className="registration-container" style={{ width: "100%", display: "flex", flexFlow: "row nowrap", height: '100%', alignContent: "start", padding: 0 }}>
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
		  form={form}
          name="registration"
          onFinish={onSubmit}
          layout="vertical"
        >
		<h1>Test</h1>
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
		  	label="Account Type"
			name="user_type"
			rules={[
			{
				required: true,
			},
			]}
		  >
			<Select
				placeholder="Select a option"
				// onChange={(val) => form.setFieldsValue({user_type: val})}
			>
				<Option value="USER">Customer</Option>
				<Option value="RESTAURANT">Restaurant</Option>
				<Option value="DELIVERY_PARTNER">Delivery Partner</Option>
			</Select>
		  </Form.Item>
		  <Form.Item label="Form Layout" name="layout"
		  rules={[
			{
				required: true,
			},
			]} 
		  >
		    <Radio.Group>
			  <Radio.Button value="horizontal">Horizontal</Radio.Button>
			  <Radio.Button value="vertical">Vertical</Radio.Button>
			  <Radio.Button value="inline">Inline</Radio.Button>
		    </Radio.Group>
		  </Form.Item>
		  <Form.Item label="Membership" name="membership">
			<Radio.Group defaultValue="NORMAL">
				<Radio.Button value="PREMIUM">Plus Membership</Radio.Button>
				<Radio.Button value="NORMAL">Normal Membership</Radio.Button>
			</Radio.Group>
		  </Form.Item>
		  { formValues.user_type }
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
