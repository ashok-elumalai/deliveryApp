import { Card, Typography, Row, Col, Rate } from "antd";

const { Meta } = Card;
const restaurantData = [
  {
    restaurantType: "Italian",
    restaurants: [
      {
        name: "Pasta Paradise",
        rating: 4.5,
        description: "Authentic Italian pasta dishes",
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
      },
      {
        name: "Pizza Palace",
        rating: 4.2,
        description: "Delicious wood-fired pizzas",
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
      },
      {
        name: "Gelato Delight",
        rating: 4.8,
        description: "Artisanal Italian gelato flavors",
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
      },
      {
        name: "Ristorante Roma",
        rating: 4.3,
        description: "Fine dining experience with Italian classics",
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
      },
      {
        name: "Trattoria Treviso",
        rating: 4.7,
        description: "Cozy trattoria serving homemade pastas",
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
      },
      {
        name: "Osteria Oliva",
        rating: 4.6,
        description: "Charming osteria offering regional Italian specialties",
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
      },
      {
        name: "Cucina Capri",
        rating: 4.4,
        description: "Modern Italian cuisine with a creative twist",
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
      },
      {
        name: "La Pizzeria",
        rating: 4.1,
        description: "Family-friendly pizzeria with a variety of toppings",
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
      },
      {
        name: "Fresco Forno",
        rating: 4.9,
        description: "Freshly baked bread and Italian sandwiches",
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
      },
      {
        name: "Olio e Aceto",
        rating: 4.0,
        description: "Specialty store offering olive oils and vinegars",
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
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
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
      },
      {
        name: "Wok & Roll",
        rating: 4.3,
        description: "Stir-fried noodles and rice dishes",
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
      },
      {
        name: "Dim Sum Delight",
        rating: 4.7,
        description: "Traditional Chinese dim sum specialties",
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
      },
      {
        name: "Thai Terrace",
        rating: 4.2,
        description: "Authentic Thai dishes with a modern twist",
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
      },
      {
        name: "Noodle House",
        rating: 4.5,
        description: "Variety of noodle soups and stir-fries",
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
      },
      {
        name: "Szechuan Palace",
        rating: 4.4,
        description: "Spicy Szechuan cuisine with bold flavors",
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
      },
      {
        name: "Tokyo Grill",
        rating: 4.8,
        description: "Teppanyaki grill and sushi bar",
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
      },
      {
        name: "Vietnamese Kitchen",
        rating: 4.1,
        description: "Fresh and flavorful Vietnamese cuisine",
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
      },
      {
        name: "Korean BBQ House",
        rating: 4.9,
        description: "All-you-can-eat Korean barbecue experience",
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
      },
      {
        name: "Indian Spice",
        rating: 4.0,
        description: "Rich and aromatic Indian curries and tandoori dishes",
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
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
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
      },
      {
        name: "BBQ Pit",
        rating: 4.1,
        description: "Slow-cooked barbecue ribs and brisket",
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
      },
      {
        name: "Diner Delight",
        rating: 4.0,
        description: "Classic diner fare with milkshakes",
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
      },
      {
        name: "Steakhouse Supreme",
        rating: 4.5,
        description: "Premium steaks and grilled seafood",
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
      },
      {
        name: "Southern Comfort",
        rating: 4.2,
        description: "Southern-style comfort food classics",
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
      },
      {
        name: "Tex-Mex Tavern",
        rating: 4.6,
        description: "Tex-Mex favorites like tacos and fajitas",
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
      },
      {
        name: "Cajun Corner",
        rating: 4.3,
        description: "Spicy Cajun dishes and seafood boils",
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
      },
      {
        name: "Farmhouse Feast",
        rating: 4.8,
        description: "Farm-to-table American cuisine with seasonal ingredients",
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
      },
      {
        name: "Buffalo Wings House",
        rating: 4.7,
        description: "Variety of buffalo wings with signature sauces",
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
      },
      {
        name: "Pancake Palace",
        rating: 4.9,
        description: "All-day breakfast and fluffy pancakes",
        image:
          "https://unsplash.com/photos/rectangular-beige-wooden-tables-and-chair-Ciqxn7FE4vE",
      },
    ],
  },
];

function HomeData() {
  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      <div style={{ width: "300px", backgroundColor: "gray" }}></div>
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
                  <Col span={5}>
                    <Card 
                    key={`${index}-${index2}`}
                      hoverable
                      style={{ width: 200 }}
                      cover={<img height={100} alt={v2.name} src={v2.image} />}
                    >
                      <Meta title={v2.name} description={v2.description} />
                      <Rate tooltips={v2.rating} value={v2.rating} />
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
