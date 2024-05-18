import {
  Card,
  Typography,
  Row,
  Col,
  Rate,
  Space,
  Layout,
  Input,
  Button,
} from "antd";
import { useSelector, useDispatch } from "react-redux";

import { LeftOutlined } from "@ant-design/icons";
import { ResHeaderContainer } from "../RestaurantDetails";
import { useNavigate } from "react-router-dom";
import CheckoutForm from "./formdata";

function CheckoutPage() {
  const currentRestaurant = useSelector(
    (state) => state.currentRestaurant.selectedRestaurant
  );
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Layout>
        <ResHeaderContainer>
          <Space>
            <LeftOutlined onClick={goBack} />
            <Typography.Title>
              {" "}
              {`${currentRestaurant?.name} (Checkout)`}
            </Typography.Title>
          </Space>

          <Button
            type="text"
            onClick={() => {
              navigate("/");
            }}
          >
            back to homepage
          </Button>
        </ResHeaderContainer>
        <div style={{ marginTop: 100, padding: 50, display: "flex", justifyContent:'space-around' }}>
          <div>
            <CheckoutForm />
          </div>
          <div>
           <Card>
            
           </Card>
          </div>
        </div>
      </Layout>
    </>
  );
}
export default CheckoutPage;
