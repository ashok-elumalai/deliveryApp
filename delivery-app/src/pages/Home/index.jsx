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
    navigate(`/user/restaurant/${params.id}`);
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
		  	setRestaurants(restaurantsData);
        }
      } catch (error) {
        console.error("An error occurred while loading restaurants:", error);
		setRestaurants(restaurantsData);
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
		<Row gutter={[24, 24]}>
			{restaurants.map((value, index) => (
				<Col span={6}>
					<Card
						onClick={(e) => {
							onSelectCard(value);
						}}
						key={`${value.id}-${index}}`}
						hoverable
						style={{ width: 250, margin: "10px" }}
						cover={<img height={100} alt={value.name} src={value.image_url} />}
					>
						<Space direction="vertical">
						<Meta title={value.name} description={value.description} style={{ textOverflow: 'ellipses', width: '100%' }}/>
						<Rate disabled tooltips={value.rating} value={value.rating} />
						</Space>
					</Card>
				</Col>
			))}
		</Row>
      </div>
    </div>
  );
}
export default HomeData;
