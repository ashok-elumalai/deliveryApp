import { Card, Typography, Row, Col, Rate, Space } from "antd";
import image from "../../Assets/images/login2.jpg";
import { useSelector, useDispatch } from "react-redux";
import { setRestaurant } from "../../state/currentRestaurantSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../Api";
import { restaurantsData } from '../../testData';

const testRestaurants = restaurantsData;

const { Meta } = Card;

function HomeData() {
  // const count = useSelector((state) => state.currentRestaurant.selectedRestaurant)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    dispatch(setRestaurant(undefined));
  });

  const onSelectCard = (params) => {
    dispatch(setRestaurant(params));
    navigate(`/restaurant/${params.id}`);
  };

  useEffect(() => {
    const getAllRestaurants = async () => {
      try {
        const response = await API.get("/restaurants");
		console.log(response);
        if (response.status === 200 && response.data?.restaurants?.length) {
			setRestaurants(response.data.restaurants);
        } else {
          console.error("failed to get restaurants. Please reload the page");
		//   setRestaurants([]);
        }
      } catch (error) {
        console.error("An error occurred while loading restaurants:", error);
      }
    };
    getAllRestaurants();
  }, []);

  return (
    <div
      key={"homeData"}
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "30px",
      }}
    >
      <div style={{ width: "300px", borderRight: "solid 1px #b6b6b6" }}></div>
      <div style={{ width: "100%", padding: "10px" }}>
        {restaurants.map((value, index) => (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Typography.Title>{value.restaurantType}</Typography.Title>
            {value.restaurants && (
              <Row gutter={[24, 24]}>
                {value.restaurants.map((v2, index2) => (
                  <Col span={6}>
                    <Card
                      onClick={(e) => {
                        onSelectCard(v2);
                      }}
                      key={`${v2.id}-${index}-${index2}`}
                      hoverable
                      style={{ width: 250 }}
                      cover={<img height={100} alt={v2.name} src={v2.image_url} />}
                    >
                      <Space direction="vertical">
                        <Meta title={v2.name} description={v2.description} />
                        <Rate disabled tooltips={v2.rating} value={v2.rating} />
                      </Space>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default HomeData;
