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
      },
      {
        name: "Pizza Palace",
        rating: 4.2,
        description: "Delicious wood-fired pizzas",
        image: image,
      },
      {
        name: "Gelato Delight",
        rating: 4.8,
        description: "Artisanal Italian gelato flavors",
        image: image,
      },
      {
        name: "Ristorante Roma",
        rating: 4.3,
        description: "Fine dining experience with Italian classics",
        image: image,
      },
      {
        name: "Trattoria Treviso",
        rating: 4.7,
        description: "Cozy trattoria serving homemade pastas",
        image: image,
      },
      {
        name: "Osteria Oliva",
        rating: 4.6,
        description: "Charming osteria offering regional Italian specialties",
        image: image,
      },
      {
        name: "Cucina Capri",
        rating: 4.4,
        description: "Modern Italian cuisine with a creative twist",
        image: image,
      },
      {
        name: "La Pizzeria",
        rating: 4.1,
        description: "Family-friendly pizzeria with a variety of toppings",
        image: image,
      },
      {
        name: "Fresco Forno",
        rating: 4.9,
        description: "Freshly baked bread and Italian sandwiches",
        image: image,
      },
      {
        name: "Olio e Aceto",
        rating: 4.0,
        description: "Specialty store offering olive oils and vinegars",
        image: image,
      },
    ],
  },
  {
    restaurantType: "Asian",
    restaurants: [
      {
        name: "Sushi Sensation",
        rating: 4.6,
        description: "Fresh sushi and sashimi platters",
        image: image,
      },
      {
        name: "Wok & Roll",
        rating: 4.3,
        description: "Stir-fried noodles and rice dishes",
        image: image,
      },
      {
        name: "Dim Sum Delight",
        rating: 4.7,
        description: "Traditional Chinese dim sum specialties",
        image: image,
      },
      {
        name: "Thai Terrace",
        rating: 4.2,
        description: "Authentic Thai dishes with a modern twist",
        image: image,
      },
      {
        name: "Noodle House",
        rating: 4.5,
        description: "Variety of noodle soups and stir-fries",
        image: image,
      },
      {
        name: "Szechuan Palace",
        rating: 4.4,
        description: "Spicy Szechuan cuisine with bold flavors",
        image: image,
      },
      {
        name: "Tokyo Grill",
        rating: 4.8,
        description: "Teppanyaki grill and sushi bar",
        image: image,
      },
      {
        name: "Vietnamese Kitchen",
        rating: 4.1,
        description: "Fresh and flavorful Vietnamese cuisine",
        image: image,
      },
      {
        name: "Korean BBQ House",
        rating: 4.9,
        description: "All-you-can-eat Korean barbecue experience",
        image: image,
      },
      {
        name: "Indian Spice",
        rating: 4.0,
        description: "Rich and aromatic Indian curries and tandoori dishes",
        image: image,
      },
    ],
  },
  {
    restaurantType: "American",
    restaurants: [
      {
        name: "Burger Barn",
        rating: 4.4,
        description: "Juicy burgers and loaded fries",
        image: image,
      },
      {
        name: "BBQ Pit",
        rating: 4.1,
        description: "Slow-cooked barbecue ribs and brisket",
        image: image,
      },
      {
        name: "Diner Delight",
        rating: 4.0,
        description: "Classic diner fare with milkshakes",
        image: image,
      },
      {
        name: "Steakhouse Supreme",
        rating: 4.5,
        description: "Premium steaks and grilled seafood",
        image: image,
      },
      {
        name: "Southern Comfort",
        rating: 4.2,
        description: "Southern-style comfort food classics",
        image: image,
      },
      {
        name: "Tex-Mex Tavern",
        rating: 4.6,
        description: "Tex-Mex favorites like tacos and fajitas",
        image: image,
      },
      {
        name: "Cajun Corner",
        rating: 4.3,
        description: "Spicy Cajun dishes and seafood boils",
        image: image,
      },
      {
        name: "Farmhouse Feast",
        rating: 4.8,
        description: "Farm-to-table American cuisine with seasonal ingredients",
        image: image,
      },
      {
        name: "Buffalo Wings House",
        rating: 4.7,
        description: "Variety of buffalo wings with signature sauces",
        image: image,
      },
      {
        name: "Pancake Palace",
        rating: 4.9,
        description: "All-day breakfast and fluffy pancakes",
        image: image,
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
    navigate("/res");
  };

  useEffect(() => {
    const getAllRestaurants = async () => {
      try {
        const response = await API("/restaurants", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

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
