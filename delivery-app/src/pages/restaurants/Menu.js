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

function Menu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goBack = () => {
    dispatch(setRestaurant(undefined));
    navigate(-1);
  };

  const [menuItems, setMenuItems] = useState([]);

  const deleteClick = (selectedDish) => {};
  const editClick = (selectedDish) => {

  };

  let { restaurant_id } = useParams();

  useEffect(() => {
    const getAllDishes = async () => {
      try {
        const response = await API.get(`/dishes/${localStorage.getItem('rest_id')}`);
        console.log(response);
        const data = response.data || {};
        if (response.status === 200 && data.dishes?.length) {
          setMenuItems(data?.dishes);
        } else {
          setMenuItems(getDishesData.dishes);
          console.error("failed to get restaurants. Please reload the page");
        }
      } catch (error) {
        setMenuItems(getDishesData.dishes);
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
      <Row gutter={[24, 20]} style={{ marginTop: 120, padding: 20 }}>
        {menuItems.map((value, index) => (
          <Col span={6}>
            <Card
              onClick={(e) => {}}
              key={`menu${index}`}
              // hoverable
              style={{ width: 250, marginBottom: 50 }}
              cover={<img height={100} alt={value.name} src={image} />}
            >
              <Space direction="vertical">
                <Meta title={value.name} description={value.description} />
                <Meta title={`A$${value.price} - each`} />
                <Space direction="horizontal">
                  <Button onClick={() => editClick(value)} type="primary">
                    Edit
                  </Button>
				  <Button onClick={() => deleteClick(value)} type="primary">
                    Delete
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

export default Menu;
