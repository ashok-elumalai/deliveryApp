import React from "react";
import { Form, Input, Button, Radio, Select } from "antd";
import "./Form.css";
import image from "../Assets/images/registration.jpg";
import { API } from "../Api";

const { Option } = Select;

const RegistrationPage = () => {

	// const [form] = Form.useForm();
	// const [accountType, setAccountType] = useState('horizontal');

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
    <div className="registration-container" style={{ width: "100%", display: "flex", flexFlow: "row nowrap", height: '100%' }}>
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
        style={{ width: "50%",  height: "100vh", overflow: "auto" }} //backgroundColor: "black"
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
				allowClear
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
		  <Form.Item
			shouldUpdate={(_prevValues, currentValues) => currentValues.user_type === "USER"}
		  >
			{({ getFieldValue }) =>
				getFieldValue('user_type') === 'USER' ? (
				<Form.Item label="Membership" name="membership">
					<Radio.Group defaultValue="NORMAL">
					  <Radio value="PREMIUM">Plus Membership</Radio>
					  <Radio value="NORMAL">Normal Membership</Radio>
					</Radio.Group>
				  </Form.Item>
				) : null
			}
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
