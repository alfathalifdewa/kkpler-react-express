import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import { Container, Row, Col, Card, Button, Alert, Pagination } from "react-bootstrap";
import Header from "../../Components/User/Header";
import Footer from "../../Components/User/Footer";

const ProductsByCategory = () => {
  const { id_category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);  // Track current page
  const [totalPages, setTotalPages] = useState(1);    // Track total pages

  // Fetch products based on category or all products with pagination
  const fetchProducts = async (page = 1) => {
    try {
      let response;
      const limit = 8; // Number of products per page
      if (id_category) {
        // Fetch products for specific category with pagination
        response = await api.get(`/products/category/${id_category}`, {
          params: { page, limit }
        });
      } else {
        // Fetch all products with pagination
        response = await api.get('/products', {
          params: { page, limit }
        });
      }
      setProducts(response.data.products);
      setTotalPages(Math.ceil(response.data.totalProducts / limit)); // Set total pages
    } catch (error) {
      console.error("Error fetching products", error);
      setProducts([]);
      setTotalPages(0); // Set total pages to 0 if there's an error
    }
  };

  // Fetch category information
  const fetchCategoryInfo = async () => {
    try {
      if (id_category) {
        const response = await api.get(`/category/${id_category}`);
        setCategory(response.data.category);
      } else {
        setCategory(null);
      }
    } catch (error) {
      console.error("Error fetching category info", error);
      setCategory(null);
    }
  };

  // Fetch all categories for the sidebar
  const fetchAllCategories = async () => {
    try {
      const response = await api.get('/category');
      setCategories(response.data.category);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
    fetchCategoryInfo();
    fetchAllCategories();
  }, [id_category, currentPage]);

  // Navigate to product detail page
  const handleProductClick = (product) => {
    navigate(`/products/detail-product/${product._id}`);
  };

  // Handle category selection
  const handleCategoryClick = (selectedCategoryId) => {
    if (id_category === selectedCategoryId) {
      navigate('/products');
    } else {
      navigate(`/products/${selectedCategoryId}`);
    }
  };

  // Format IDR currency
  const formatIDR = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(price);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Header />
      <Container fluid className="product-container">
        <Row>
          {/* Categories Section - Left Side */}
          <Col md={3} className="bg-light py-4">
            <h5 className="mb-4">Categories</h5>
            <Row className="g-3">
              {categories.map((category) => (
                <Col
                  xs={12}
                  key={category.id_category}
                  className="d-flex justify-content-start"
                >
                  <Card 
                    className="w-100 category-card border-0 mb-2"
                    style={{ cursor: 'pointer' }} // Keep the card's appearance unchanged on click
                    onClick={() => handleCategoryClick(category.id_category)}
                  >
                    <Card.Body className="d-flex align-items-center">
                      <div className="me-3 display-6 category-icon">
                        {category.icon || " "} {/* Placeholder icon */}
                      </div>
                      <Card.Title className="category-name mb-0">
                        {category.name_category}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>

          {/* Products Section - Right Side */}
          <Col md={9}>
            {/* Category Header */}
            <Row className="category-header justify-content-center mb-3">
              <Col>
                <h5>
                  {category 
                    ? `Products in Category:` 
                    : 'All Products'}
                </h5>
              </Col>
            </Row>

            {/* Product Cards */}
            {products.length === 0 ? (
              <Alert variant="info" className="text-center">
                No products available in this category.
              </Alert>
            ) : (
              <Row className="g-3 justify-content-start">
                {products.map((item, index) => (
                  <Col
                    key={index}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    className="d-flex justify-content-start"
                  >
                    <Card
                      className="product-card h-100 border-0 shadow"
                      style={{ width: '100%', maxWidth: '350px' }} // Increase card width
                      onClick={() => handleProductClick(item)}
                    >
                      <Card.Img
                        variant="top"
                        src={item.image}
                        className="product-card-img"
                        style={{ objectFit: 'cover', height: '200px' }} // Maintain image aspect ratio
                      />
                      <Card.Body>
                        <Card.Title className="product-name">{item.productName}</Card.Title>
                        <Card.Text className="product-price">{formatIDR(item.price)}</Card.Text>
                        <Button variant="outline-success" className="w-100 mt-auto">
                          Detail
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}

            {/* Pagination Controls */}
            {totalPages > 0 && (
              <Row className="justify-content-center mt-4">
                <Pagination>
                  <Pagination.Prev 
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} 
                  />
                  {[...Array(totalPages)].map((_, idx) => (
                    <Pagination.Item
                      key={idx}
                      active={idx + 1 === currentPage}
                      onClick={() => handlePageChange(idx + 1)}
                    >
                      {idx + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next 
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)} 
                  />
                </Pagination>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ProductsByCategory;
