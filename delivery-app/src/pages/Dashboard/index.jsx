import { Layout, Tabs, Avatar, Button } from "antd";
import { useNavigate } from "react-router-dom";
import HomeData from "../Home/index";
import { styled } from "styled-components";
import UserOrders from "./UserOrders";

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
    label: "Order History",
    children: <UserOrders />,
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
    console.log("User logged out");
    navigate("/login/user");
  };

  return (
    <Layout>
      <Layout.Header
        style={{
          position: "fixed",
          right: "0",
          left: "0",
          zIndex: "999",
          padding: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
            style={{ backgroundColor: "#fff" }}
            size={48}
          />
          <h2 style={{ color: "#fff", padding: 0, margin: 0, marginLeft: 10 }}>
            Welcome {localStorage.getItem("user_name")}!
          </h2>
        </div>
        <div>
          <h1
            style={{
              color: "#fff",
              fontSize: 38,
              fontWeight: "bolder",
              marginTop: 8,
            }}
          >
            Aussie Bites &#9889;
          </h1>
        </div>
        <div>
          <Button type="primary" danger onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Layout.Header>
      <ContentStyles style={{ padding: "30px", marginTop: "80px" }}>
        <Tabs defaultActiveKey="1" items={items} />
      </ContentStyles>
    </Layout>
  );
}
export default Dashboard;
