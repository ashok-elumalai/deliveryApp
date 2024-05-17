import { Card, Typography, Row, Col, Rate, Space } from "antd";
import image from "../../Assets/images/login2.jpg";
import { useSelector, useDispatch } from "react-redux";
import { setRestaurant } from "../../state/currentRestaurantSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../Api";

const { Meta } = Card;
const restaurantData = [
  {
    restaurantType: "Italian",
    restaurants: [
      {
        name: "Pasta Paradise",
        rating: 4.5,
        description: "Authentic Italian pasta dishes",
        image: image,
		id: 1
      },
      {
        name: "Pizza Palace",
        rating: 4.2,
        description: "Delicious wood-fired pizzas",
        image: image,
		id: 2
      },
      {
        name: "Gelato Delight",
        rating: 4.8,
        description: "Artisanal Italian gelato flavors",
        image: image,
		id: 3
      },
      {
        name: "Ristorante Roma",
        rating: 4.3,
        description: "Fine dining experience with Italian classics",
        image: image,
		id: 4
      },
      {
        name: "Trattoria Treviso",
        rating: 4.7,
        description: "Cozy trattoria serving homemade pastas",
        image: image,
		id: 5
      }
    ],
  },
  {
    restaurantType: "Asian",
    restaurants: [
		{
		  name: "Osteria Oliva",
		  rating: 4.6,
		  description: "Charming osteria offering regional Italian specialties",
		  image: image,
		  id: 6
		},
		{
		  name: "Cucina Capri",
		  rating: 4.4,
		  description: "Modern Italian cuisine with a creative twist",
		  image: image,
		  id: 7
		},
		{
		  name: "La Pizzeria",
		  rating: 4.1,
		  description: "Family-friendly pizzeria with a variety of toppings",
		  image: image,
		  id: 8
		},
		{
		  name: "Fresco Forno",
		  rating: 4.9,
		  description: "Freshly baked bread and Italian sandwiches",
		  image: image,
		  id: 9
		},
		{
		  name: "Olio e Aceto",
		  rating: 4.0,
		  description: "Specialty store offering olive oils and vinegars",
		  image: image,
		  id: 10
		},
    ],
  },
  {
    restaurantType: "American",
    restaurants: [
		{
		  name: "Osteria Oliva",
		  rating: 4.6,
		  description: "Charming osteria offering regional Italian specialties",
		  image: image,
		  id: 11
		},
		{
		  name: "Cucina Capri",
		  rating: 4.4,
		  description: "Modern Italian cuisine with a creative twist",
		  image: image,
		  id: 12
		},
		{
		  name: "La Pizzeria",
		  rating: 4.1,
		  description: "Family-friendly pizzeria with a variety of toppings",
		  image: image,
		  id: 13
		},
		{
		  name: "Fresco Forno",
		  rating: 4.9,
		  description: "Freshly baked bread and Italian sandwiches",
		  image: image,
		  id: 14
		},
		{
		  name: "Olio e Aceto",
		  rating: 4.0,
		  description: "Specialty store offering olive oils and vinegars",
		  image: image,
		  id: 15
		},
    ],
  },
];

function HomeData() {
  // const count = useSelector((state) => state.currentRestaurant.selectedRestaurant)
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

        if (response.ok) {
          console.log("data", response?.data);
        } else {
          console.error("failed to get restaurants. Please reload the page");
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
        {restaurantData.map((value, index) => (
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
                      key={`${index}-${index2}`}
                      hoverable
                      style={{ width: 250 }}
                      cover={<img height={100} alt={v2.name} src={v2.image} />}
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
