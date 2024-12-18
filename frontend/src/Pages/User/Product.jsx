import React, { useEffect, useState } from "react";
import api from '../../api';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Header from "../../Components/User/Header";
import Footer from "../../Components/User/Footer";

const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const fetchAllProduct = async () => {
    try {
      const response = await api.get(`/products`);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const handleProductClick = (product) => {
    navigate(`/products/detail-product/${product._id}`); // Navigate to detail page with product ID
  };

  const formatIDR = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(price);
  };

  return (
    <>
      <Header />
      <Container className="product-container">
        <Row className="product-box justify-content-center mb-3">
          <Row className="align-items-center justify-content-between">
            <Col className="mb-5">
              <h3 className="text-center text-secondary text-uppercase animate__animated animate__bounceInLeft">Product List</h3>
            </Col>
          </Row>
          <Col xs={12} data-aos="fade-up" data-aos-duration="1000">
            <Row className="g-3">
              {products.map((item, index) => (
                <Col
                  xs={12}
                  sm={6}
                  md={4}
                  key={index}
                  className=""
                >
                  <Card
                    className="product-card h-100 border-0 shadow"
                    onClick={() => handleProductClick(item)}
                  >
                    <Card.Img
                      variant="top"
                      src={item.image}
                      className="product-card-img"
                    />
                    <Card.Body>
                      <Card.Title className="product-name">
                        {item.productName}
                      </Card.Title>
                      <Card.Text className="product-price">
                        {formatIDR(item.price)}
                      </Card.Text>
                      <Button variant="outline-success" className="pe-3 ps-3 w-100">
                        Detail
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Product;
