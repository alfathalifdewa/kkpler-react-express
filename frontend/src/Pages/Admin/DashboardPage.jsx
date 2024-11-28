import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import Sidebar from "../../Components/Admin/Sidebar";

const DashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users/all");
      setUsers(response.data.slice(0, 3));
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data.products.slice(0, 3));
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await api.get("/order/all");
      setOrders(response.data.slice(0, 3));
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <Container className="dashboard-content mt-5">
        <Row>
          <Col md={4}>
            <Card className="bg-info text-white">
              <Card.Header className="fw-bold">User List</Card.Header>
              <Card.Body>
                {users.map((user) => (
                  <div key={user._id}>
                    <p>{user.username}</p>
                  </div>
                ))}
                <Button
                  variant="light"
                  onClick={() => navigate("/dashboard/user-list")}
                >
                  Show More
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="bg-warning text-white mt-lg-0 mt-4">
              <Card.Header className="fw-bold">Product List</Card.Header>
              <Card.Body>
                {products.map((product) => (
                  <div key={product._id}>
                    <p>{product.productName}</p>
                    <p>{product.price}</p>
                  </div>
                ))}
                <Button
                  variant="light"
                  onClick={() => navigate("/dashboard/product-list")}
                >
                  Show More
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="bg-success text-white  mt-lg-0 mt-4">
              <Card.Header className="fw-bold">Order List</Card.Header>
              <Card.Body>
                {orders.map((order) => (
                  <div key={order._id}>
                    <p>{order.createdAt}</p>
                    <p>{order.total}</p>
                  </div>
                ))}
                <Button
                  variant="light"
                  onClick={() => navigate("/dashboard/order-list")}
                >
                  Show More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DashboardPage;
