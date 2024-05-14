import { Layout, Tabs } from "antd";

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
  return (
    <Layout>
      <Layout.Header
        style={{ position: "fixed", right: "0", left: "0", zIndex: "999" }}
      ></Layout.Header>
      <ContentStyles style={{ padding: "30px", marginTop: "80px" }}>
        <Tabs defaultActiveKey="1" items={items} />
      </ContentStyles>
    </Layout>
  );
}
export default Dashboard;
