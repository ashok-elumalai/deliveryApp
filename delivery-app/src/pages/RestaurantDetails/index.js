import { useSelector, useDispatch } from "react-redux";
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
import styled from "styled-components";
import { LeftOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { setRestaurant } from "../../state/currentRestaurantSlice";
import { useNavigate } from "react-router-dom";
import image from "../../Assets/images/login1.jpg";
const { Meta } = Card;

const menuItems = [
  {
    name: "Spaghetti Bolognese",
    count: 0,
    price: 12.99,
    description: "Spaghetti pasta with hearty meat sauce",
  },
  {
    name: "Margherita Pizza",
    count: 0,
    price: 9.99,
    description: "Classic pizza with tomato sauce, mozzarella, and basil",
  },
  {
    name: "Chicken Teriyaki",
    count: 0,
    price: 14.99,
    description:
      "Grilled chicken with teriyaki sauce, served with rice and vegetables",
  },
  {
    name: "Caesar Salad",
    count: 0,
    price: 8.99,
    description:
      "Fresh romaine lettuce, croutons, Parmesan cheese, and Caesar dressing",
  },
  {
    name: "Cheeseburger",
    count: 0,
    price: 10.99,
    description:
      "Juicy beef patty with cheese, lettuce, tomato, and pickles, served with fries",
  },
  {
    name: "Vegetable Stir-Fry",
    count: 0,
    price: 11.99,
    description:
      "Assorted vegetables stir-fried in a savory sauce, served with rice",
  },
  {
    name: "Chocolate Brownie Sundae",
    count: 0,
    price: 6.99,
    description:
      "Warm chocolate brownie topped with vanilla ice cream and chocolate sauce",
  },
  {
    name: "Mushroom Risotto",
    count: 0,
    price: 13.99,
    description: "Creamy risotto cooked with mushrooms and Parmesan cheese",
  },
  {
    name: "Grilled Salmon",
    count: 0,
    price: 16.99,
    description:
      "Fresh grilled salmon served with mashed potatoes and steamed vegetables",
  },
  {
    name: "Tiramisu",
    count: 0,
    price: 7.99,
    description:
      "Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cheese",
  },
];

export const ResHeaderContainer = styled.div`
  height: 100px;
  position: fixed;
  left: 0;
  right: 0;
  padding-left: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 34px;
  border-bottom: solid 2px gray;
  background-color: white;
  gap: 20px;
  padding-right: 40px;
  z-index: 9999;
  .ant-typography {
    margin: 0;
  }
`;

function RestaurantDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goBack = () => {
    dispatch(setRestaurant(undefined));
    navigate("/");
  };

  const increase = (params) => {};
  const decrease = (params) => {};

  const currentRestaurant = useSelector(
    (state) => state.currentRestaurant.selectedRestaurant
  );
  return (
    <Layout>
      <ResHeaderContainer>
        <Space>
          <LeftOutlined onClick={goBack} />
          <Typography.Title>{currentRestaurant?.name}</Typography.Title>
        </Space>

        <Button type="primary"onClick={()=>{navigate('/checkout')}} >Checkout</Button>
      </ResHeaderContainer>
      <Row gutter={[24, 20]} style={{ marginTop: 120, padding: 20 }}>
        {menuItems.map((value, index) => (
          <Col span={6}>
            <Card
              onClick={(e) => {}}
              key={`menu${index}`}
              // hoverable
              style={{ width: 250 }}
              cover={<img height={100} alt={value.name} src={image} />}
            >
              <Space direction="vertical">
                <Meta title={value.name} description={value.description} />
                <Meta title={value.price} />
                <Space direction="horizontal">
                  <Button onClick={decrease(value)} type="primary">
                    <MinusOutlined />
                  </Button>
                  <Input min={0} value={value.count} max={10} readOnly />
                  <Button onClick={increase(value)} type="primary">
                    <PlusOutlined />
                  </Button>
                </Space>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </Layout>
  );
}

export default RestaurantDetails;
