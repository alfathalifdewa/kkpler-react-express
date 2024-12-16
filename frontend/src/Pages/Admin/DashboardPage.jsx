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
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data.products);
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

  // Process data for charts
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

  const processOrderStatusData = () => {
    const statuses = ["Successful", "Pending", "Cancelled"];
    const statusData = statuses.map(
      (status) => orders.filter((order) => order.status === status).length
    );
    return { statuses, statusData };
  };

  const { labels: revenueLabels, data: revenueData } = processDailyRevenueData();
  const { statuses, statusData } = processOrderStatusData();

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
      <h2 className="fw-bold text-success">Hi, Admin</h2>
        <Row className="py-4">
        <Col md={4}>
            <Card className="bg-info text-white shadow">
              <Card.Header className="fw-bold">User List</Card.Header>
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  <p className="fs-1 mb-0">{users.length}</p>
                  <i className="fa-solid fa-users fs-1"></i>
                </div>
                <Button
                  variant="light"
                  className="mt-3 w-50"
                  onClick={() => navigate("/dashboard/user-list")}
                >
                  Show Details
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="bg-warning text-white mt-lg-0 mt-4 shadow">
              <Card.Header className="fw-bold">Product List</Card.Header>
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                <p className="fs-1 mb-0">{products.length}</p>
                <i class="fa-solid fa-seedling fs-1"></i>
                </div>
               
                <Button
                  variant="light"
                  className="mt-3 w-50"
                  onClick={() => navigate("/dashboard/product-list")}
                >
                  Show Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="bg-success text-white mt-lg-0 mt-4 shadow">
              <Card.Header className="fw-bold">Order List</Card.Header>
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                <p className="fs-1 mb-0">{orders.length}</p>
                <i class="fa-solid fa-bag-shopping fs-1"></i>
                </div>
               
                <Button
                  variant="light"
                  className="mt-3 w-50"
                  onClick={() => navigate("/dashboard/order-list")}
                >
                  Show Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="py-4">
          <Col md={6}>
            <Card className="shadow">
              <Card.Header className="fw-bold">Daily Revenue Report</Card.Header>
              <Card.Body>
                <Bar data={revenueChartConfig.data} options={revenueChartConfig.options} />
                <Button
                  variant="success"
                  className="mt-3"
                  onClick={() => navigate("/dashboard/order-list")}
                >
                  Show Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow">
              <Card.Header className="fw-bold">Order Status Breakdown</Card.Header>
              <Card.Body>
                <Bar data={statusChartConfig.data} options={statusChartConfig.options} />
                <Button
                  variant="success"
                  className="mt-3"
                  onClick={() => navigate("/dashboard/order-list")}
                >
                  Show Details
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
