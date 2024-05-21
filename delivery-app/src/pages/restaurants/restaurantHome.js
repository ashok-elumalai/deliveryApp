import { Avatar, Button, Layout, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import Orders from "./Orders";
import Revenue from "./Revenue";
import Menu from "./Menu";

const items = [
  {
    key: 1,
    label: "Orders",
	// forceRender: true,
    children: <Orders />,
  },
  {
    key: 2,
    label: "Menu",
	// forceRender: true,
    children: <Menu />,
  },
  {
    key: 3,
    label: "Revenue",
	// forceRender: true,
    children: <Revenue />,
  },
];

function RestaurantHome() {
  const navigate = useNavigate();
  const onChange = (key) => {
    console.log(key);
  };

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
    navigate("/login/restaurant");
  };

  return (
    <Layout>
      <Layout.Header
        style={{
          position: "fixed",
          right: "0",
          left: "0",
          zIndex: "99",
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
            {localStorage.getItem("rest_name")} - Restaurant!
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
      <div style={{ padding: "10px", paddingTop: "70px" }}>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </Layout>
  );
}

export default RestaurantHome;
