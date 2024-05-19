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
  Modal,
  Form,
} from "antd";
import styled from "styled-components";
import { toast } from "react-toastify";
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
  const [showEditModal, setShowEditModal] = useState({
    open: false,
    menu: {},
    type: "",
  });
  const goBack = () => {
    dispatch(setRestaurant(undefined));
    navigate(-1);
  };

  const [menuItems, setMenuItems] = useState([]);

  const deleteClick = (selectedDish) => {
    setShowEditModal({ open: true, menu: selectedDish, type: "delete" });
  };
  const editClick = (selectedDish) => {
    setShowEditModal({ open: true, menu: selectedDish, type: "edit" });
  };

  const handleCancel = () => {
    setShowEditModal({ open: false, menu: {}, type: "" });
  };

  const getAllDishes = async () => {
    try {
      const response = await API.get(
        `/dishes/${localStorage.getItem("rest_id")}`
      );
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

  const onUpdate = async (values) => {
    console.log("Received values:", values);
    const { dishname, amount } = values;
    const { description, image_url, price, name } = showEditModal?.menu;
    try {
      // Make an API call to the /signup endpoint
      const response = await API.put(
        `/dishes/${localStorage.getItem("rest_id")}`,
        {
          dish_id: showEditModal?.menu?.id,
          dish: {
            name: dishname || name, // to avoid error
            description,
            image_url,
            price: amount || price, // to avoid error
          },
        }
      );
      if (response.status === 200) {
        getAllDishes();
        setShowEditModal({ open: false, menu: {}, type: "" });
        toast.success("Dish updated Successfully!");
      } else {
        toast.error("Error in dish update!");
        setShowEditModal({ open: false, menu: {}, type: "" });
      }
    } catch (error) {
      toast.error("Error in dish update!");
      setShowEditModal({ open: false, menu: {}, type: "" });
    }
  };

  let { restaurant_id } = useParams();

  useEffect(() => {
    getAllDishes();
  }, []);

  const currentRestaurant = useSelector(
    (state) => state.currentRestaurant.selectedRestaurant
  );

  console.log(showEditModal);

  return (
    <>
      <Layout>
        <Row gutter={[24, 20]} style={{ marginTop: 10, padding: 20 }}>
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
                  <Meta title={value.name} />
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
                    <Button onClick={() => editClick(value)} type="primary">
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteClick(value)}
                      type="primary"
                      danger
                    >
                      Delete
                    </Button>
                  </Space>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Layout>
      {showEditModal.open && (
        <Modal
          title=""
          open={showEditModal.open}
          onCancel={handleCancel}
          footer={<></>}
        >
          <Form
            style={{ width: "100%" }}
            name="registration"
            onFinish={onUpdate}
            layout="vertical"
          >
            <Form.Item
              style={{ margin: 0 }}
              label={
                <div style={{ fontSize: "25px", fontWeight: "700" }}>
                  Edit Menu
                </div>
              }
              className="form-title"
            ></Form.Item>
            <div
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Form.Item label="Dish Name" name="dishname">
                <Input
                  placeholder="Enter name"
                  defaultValue={showEditModal?.menu?.name}
                />
              </Form.Item>
              <Form.Item label="Amount ($)" name="amount">
                <Input
                  placeholder="Enter the amount"
                  defaultValue={showEditModal?.menu?.price}
                />
              </Form.Item>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                style={{
                  borderRadius: "50px",
                }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                htmlType="submit"
                style={{
                  background: "black",
                  color: "white",
                  borderRadius: "50px",
                  marginLeft: "5px",
                }}
              >
                Save
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
}

export default Menu;
