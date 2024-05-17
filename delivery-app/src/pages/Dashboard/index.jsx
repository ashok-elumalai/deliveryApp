import { Layout, Tabs, Menu, Button } from "antd";
import { useNavigate } from 'react-router-dom';
import HomeData from "../Home/index";
import { styled } from "styled-components";

const ContentStyles = styled(Layout.Content)`
  padding: 30px;
  height: 100vh;
  margin-top: 80px;
`;

const items = [
  {
    key: "1",
    label: "Home",
    children: <HomeData />,
  },
  {
    key: "2",
    label: "Orders",
    children: "Content of Tab Pane 2",
  },
];


function Dashboard() {

	const navigate = useNavigate();

	const handleLogout = () => {
		// Perform logout logic here, like clearing tokens or user data
		localStorage.removeItem("token");
		localStorage.removeItem("user_id");
		localStorage.removeItem("user_name");
		localStorage.removeItem("user_membership");
		localStorage.removeItem("rest_id");
		localStorage.removeItem("rest_name");
		localStorage.removeItem("deli_id");
		localStorage.removeItem("deli_name");
		console.log('User logged out');
		navigate('/login/user');
	};
	  
  return (
    <Layout>
      <Layout.Header
        style={{ position: "fixed", right: "0", left: "0", zIndex: "999" }}
      >
	  	<div style={{ position: "absolute", right: 20 }}>
		  <Button type="primary" danger onClick={handleLogout}>Logout</Button>
		</div>
      </Layout.Header>
      <ContentStyles style={{ padding: "30px", marginTop: "80px" }}>
        <Tabs defaultActiveKey="1" items={items} />
      </ContentStyles>
    </Layout>
  );
}
export default Dashboard;
