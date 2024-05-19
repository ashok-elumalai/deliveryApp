import {
  Card,
  Typography,
  Row,
  Col,
  Rate,
  Space,
  Collapse,
  Checkbox,
  Input,
} from "antd";
import image from "../../Assets/images/login2.jpg";
import { useSelector, useDispatch } from "react-redux";
import { setRestaurant } from "../../state/currentRestaurantSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../Api";
import { restaurantsData } from "../../testData";
import FilterCheckBox from "./CheckBox";

const testRestaurants = restaurantsData;

const { Meta } = Card;
const { Search } = Input;

function HomeData() {
  // const count = useSelector((state) => state.currentRestaurant.selectedRestaurant)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState({
    category: [],
    distance: [],
    rating: [],
  });

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

  const filterObject = { distance: [], ratings: [] };
  const { distance, ratings } = filterObject;
  restaurants?.filter((each) => {
    distance.push(each.distance);
    ratings.push(each.rating);
  });

  const items = [
    {
      key: "1",
      label: "Category",
      children: (
        <FilterCheckBox
          type="category"
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          items={["Cafe", "Restaurant", "Bar"]}
        />
      ),
    },
    {
      key: "2",
      label: "Distance",
      children: (
        <FilterCheckBox
          type="distance"
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          items={distance || []}
        />
      ),
    },
    {
      key: "3",
      label: "Rating",
      children: (
        <FilterCheckBox
          type="rating"
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          items={ratings || []}
        />
      ),
    },
  ];

  useEffect(() => {
    const filteredRestaurants = restaurants?.filter((restaurant) => {
      const matchesCategory = selectedFilter?.category?.includes(
        restaurant?.cuisine?.charAt(0).toUpperCase() +
          restaurant?.cuisine?.slice(1).toLowerCase()
      );
      const matchesDistance = selectedFilter?.distance?.includes(
        restaurant?.distance
      );
      const matchesRating = selectedFilter?.rating?.includes(
        Math.floor(restaurant?.rating)
      );
      return matchesCategory || matchesDistance || matchesRating;
    });
    setFilteredData(filteredRestaurants);
  }, [selectedFilter]);

  const onAccordianChange = (key) => {
    console.log(key);
  };

  const onSearch = (e) => {
    const lowerCaseQuery = e.target.value?.toLowerCase();
    const searchedData = restaurants?.filter((restaurant) => {
      return (
        restaurant.name.toLowerCase().includes(lowerCaseQuery) ||
        restaurant.address.toLowerCase().includes(lowerCaseQuery) ||
        restaurant.cuisine.toLowerCase().includes(lowerCaseQuery) ||
        restaurant.reviews.toLowerCase().includes(lowerCaseQuery) ||
        restaurant.distance.toLowerCase().includes(lowerCaseQuery)
        // restaurant.rating
      );
    });
    setFilteredData(searchedData);
  };

  const restaurantList = filteredData?.length > 0 ? filteredData : restaurants;
  return (
    <>
      <div
        key={"homeData"}
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "30px",
        }}
      >
        <div style={{ width: "300px", borderRight: "solid 1px #b6b6b6" }}>
          <Collapse
            items={items}
            defaultActiveKey={["1"]}
            onChange={onAccordianChange}
          />
        </div>
        <div style={{ width: "100%", padding: "10px" }}>
		<Row gutter={[24, 24]}>
		<Search
			style={{
				width: "80%",
				position: "absolute",
				top: "-53px",
			}}
			placeholder="Type to search"
			onChange={onSearch}
			// loading
		/>
            {restaurantList.map((value, index) => (
              <Col span={6}>
                <Card
                  onClick={(e) => {
                    onSelectCard(value);
                  }}
                  key={`${value.id}-${index}}`}
                  hoverable
                  style={{ width: 250, margin: "10px" }}
                  cover={
                    <img height={100} alt={value.name} src={value.image_url} />
                  }
                >
                  <Space direction="vertical">
                    <Meta
                      title={value.name}
                      description={value.description}
                      style={{ textOverflow: "ellipses", width: "100%" }}
                    />
                    <Rate
                      disabled
                      tooltips={value.rating}
                      value={value.rating}
                    />
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
}
export default HomeData;
