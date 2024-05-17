import { Tabs } from "antd";
import Orders from "./Orders";
import Revenue from "./Revenue";

const items = [
  {
    key: 1,
    label: "Orders",
    children: <Orders />,
  },
  {
    key: 2,
    label: "Menu",
    children: <div>Menu Content</div>,
  },
  {
    key: 3,
    label: "Revenue",
    children: <Revenue />,
  },
];

function RestaurantHome() {
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div style={{ padding: "10px" }}>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}

export default RestaurantHome;
