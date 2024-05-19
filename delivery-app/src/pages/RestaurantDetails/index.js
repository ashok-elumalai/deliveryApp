import { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import image from "../../Assets/images/login1.jpg";
import API from "../../Api";
import { getDishesData } from "../../testData";
import { setOrders } from "../../state/userOrdersSlice";
const { Meta } = Card;

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
    navigate(-1);
  };

  const [menuItems, setMenuItems] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});

  const increase = (item) => {
    setItemQuantities((prevQuantities) => {
		return ({
		...prevQuantities,
		[item.id]: (prevQuantities[item.id] || 0) + 1,
		})
  });
  };

  const decrease = (item) => {
    setItemQuantities((prevQuantities) => {
		let obj = {...prevQuantities};
		const newQuantity = Math.max(0, obj[item.id] - 1);
		if(newQuantity === 0 || !newQuantity){
			delete obj[item.id];
		} else {
			obj = { ...obj, [item.id]: newQuantity };
		}
      return obj;
    });
  };
  window.SelectedDishes =
    Object.keys(itemQuantities)?.length > 0
      ? { orders: { ...itemQuantities } }
      : {};

  let { restaurant_id } = useParams();

  useEffect(() => {
    const getAllDishes = async () => {
      try {
        const response = await API.get(`/dishes/${restaurant_id}`);
        console.log(response);
        const data = response.data || {};
        if (response.status === 200 && data.dishes?.length) {
          localStorage.setItem("rest_id", data.restaurant?.id);
          localStorage.setItem("rest_name", data.restaurant?.name);
          setMenuItems(data?.dishes);
		  window.dishes = data?.dishes;
        } else {
          localStorage.setItem("rest_id", getDishesData.restaurant?.id);
          localStorage.setItem("rest_name", getDishesData.restaurant?.name);
          setMenuItems(getDishesData.dishes);
		  window.dishes = getDishesData.dishes;
          console.error("failed to get restaurants. Please reload the page");
        }
      } catch (error) {
        localStorage.setItem("rest_id", getDishesData.restaurant?.id);
        localStorage.setItem("rest_name", getDishesData.restaurant?.name);
        setMenuItems(getDishesData.dishes);
		window.dishes = getDishesData.dishes;
        console.error("An error occurred while loading restaurants:", error);
      }
    };
    getAllDishes();
  }, []);

  const currentRestaurant = useSelector(
    (state) => state.currentRestaurant.selectedRestaurant
  );
  return (
    <Layout>
      <ResHeaderContainer>
        <Space>
          <LeftOutlined onClick={goBack} />
          <Typography.Title>
            {localStorage.getItem("rest_name")}
          </Typography.Title>
        </Space>

        <Button
          type="primary"
          onClick={() => {
            dispatch(setOrders(itemQuantities));
            navigate("/user/checkout");
          }}
		  disabled={!(Object.keys(itemQuantities).length > 0)}
        >
          Checkout
        </Button>
      </ResHeaderContainer>
      <Row gutter={[24, 20]} style={{ marginTop: 120, padding: 20 }}>
        {menuItems.map((value, index) => (
          <Col span={6}>
            <Card
              onClick={(e) => {}}
              key={`menu${index}`}
              // hoverable
              style={{ width: 250, marginTop: 50 }}
              cover={
                <img height={100} alt={value.name} src={value.image_url} />
              }
            >
              <Space direction="vertical">
                <Meta style={{ maxWidth: "200px" }} title={value.name} />
                <Meta
                  style={{
                    fontSize: "small",
                    fontWeight: "300",
                    maxWidth: "200px",
                    minHeight: "74px",
                  }}
                  description={value.description}
                />
                <Meta title={`A$${value.price} - each`} />
                <Space direction="horizontal">
                  <Button onClick={() => decrease(value)} type="primary">
                    <MinusOutlined />
                  </Button>
                  <Input
                    min={0}
                    max={100}
                    value={itemQuantities ? itemQuantities[value?.id] : ""}
                    readOnly
                  />
                  <Button onClick={() => increase(value)} type="primary">
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
