import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import Sidebar from "../../Components/Admin/Sidebar";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  // Process data for Daily Revenue
  const processDailyRevenueData = () => {
    const revenueByDate = orders.reduce((acc, order) => {
      const date = new Date(order.createdAt).toISOString().split("T")[0];
      if (!acc[date]) acc[date] = 0;
      acc[date] += order.total;
      return acc;
    }, {});

    const labels = Object.keys(revenueByDate).sort();
    const data = labels.map((date) => revenueByDate[date]);
    return { labels, data };
  };

  // Process data for Order Status
  const processOrderStatusData = () => {
    const statuses = ["Successful", "Pending", "Cancelled"];
    const statusData = statuses.map(
      (status) => orders.filter((order) => order.status === status).length
    );
    return { statuses, statusData };
  };

  const { labels: revenueLabels, data: revenueData } = processDailyRevenueData();
  const { statuses, statusData } = processOrderStatusData();

  // Chart configurations
  const revenueChartConfig = {
    data: {
      labels: revenueLabels,
      datasets: [
        {
          label: "Revenue per Day (Rp)",
          data: revenueData,
          backgroundColor: "#36A2EB",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Daily Revenue Report" },
      },
    },
  };

  const statusChartConfig = {
    data: {
      labels: statuses,
      datasets: [
        {
          label: "Order Status Count",
          data: statusData,
          backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Order Status Breakdown" },
      },
    },
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <Container className="dashboard-content mt-5">
        <Row>
          <Col md={6}>
            <Card>
              <Card.Header className="fw-bold">Daily Revenue Report</Card.Header>
              <Card.Body>
                <Bar data={revenueChartConfig.data} options={revenueChartConfig.options} />
                <Button
                  variant="primary"
                  className="mt-3"
                  onClick={() => navigate("/dashboard/order-list")}
                >
                  Show Detail
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Header className="fw-bold">Order Status Breakdown</Card.Header>
              <Card.Body>
                <Bar data={statusChartConfig.data} options={statusChartConfig.options} />
                <Button
                  variant="primary"
                  className="mt-3"
                  onClick={() => navigate("/dashboard/order-list")}
                >
                  Show Detail
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
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
            <Card className="bg-success text-white mt-lg-0 mt-4">
              <Card.Header className="fw-bold">Order List</Card.Header>
              <Card.Body>
                {orders.slice(0, 3).map((order) => (
                  <div key={order._id}>
                    <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                    <p>Rp {order.total.toLocaleString()}</p>
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
