import React, { useEffect, useRef, useState } from "react";
import { Carousel, Container, Row, Col, Card, Button, Accordion} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Components/User/Header";
import Footer from "../../Components/User/Footer";
import carousel01 from "../../assets/img/carouselsayur.jpg";
import carousel02 from "../../assets/img/carouselsayur2.jpg";
import carousel03 from "../../assets/img/carouselsayur3.jpg";
import diagnosis01 from "../../assets/img/sayurartikel1.jpg";
import diagnosis02 from "../../assets/img/sayurartikel2.jpeg";
import diagnosis03 from "../../assets/img/sayurartikel3.jpg";
import diagnosis04 from "../../assets/img/sayurartikel4.jpg";
import diagnosis05 from "../../assets/img/sayurartikel5.jpg";
import diagnosis06 from "../../assets/img/sayurartikel6.jpg";
import "../../assets/css/Home.css";
import {faq} from "../../Data/index"
import api from "../../api";
import FloatingCart from '../../Components/User/FloatingCart';

const Home = () => {
  const navigate = useNavigate();
  const crispScriptRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error("There was an error fetching the products!", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/category');
        setCategories(response.data.category);
      } catch (error) {
        console.error("There was an error fetching the categories!", error);
      }
    };

    fetchCategories();
  }, []);

  const diagnosis = [
    {
      image: diagnosis01,
      name: "Manfaat Konsumsi Sayur Segar untuk Kesehatan",
      path: "https://p2ptm.kemkes.go.id/infographic-p2ptm/obesitas/apa-saja-manfaat-sayur-sayuran",
      delay: 100,
    },
    {
      image: diagnosis02,
      name: "10 Sayur dengan Kandungan Nutrisi Tertinggi",
      path: "https://www.idntimes.com/health/fitness/alfonsus-adi-putra-2/sayuran-yang-paling-padat-gizi",
      delay: 200,
    },
    {
      image: diagnosis03,
      name: "Tips Memilih dan Menyimpan Sayur di Kulkas agar Tetap Segar",
      path: "https://www.ruparupa.com/ms/artikel-cara-menyimpan-sayuran",
      delay: 300,
    },
    {
      image: diagnosis04,
      name: "Tren Hidangan Berbasis Sayur: Resep Kreatif untuk Hidangan Sehat",
      path: "https://hellosehat.com/nutrisi/resep-sehat/resep-sayur-sehat/",
      delay: 400,
    },
    {
      image: diagnosis05,
      name: "Mengenal Sayur Organik: Apa Keunggulannya?",
      path: "https://www.alodokter.com/ini-fakta-tentang-sayur-organik-yang-perlu-anda-ketahui",
      delay: 500,
    },
    {
      image: diagnosis06,
      name: "Kenali Perbedaan Vegan dan Vegetarian",
      path: "https://www.alodokter.com/kenali-perbedaan-vegan-dan-vegetarian",
      delay: 600,
    },
  ];

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const handleProductClick = (product) => {
    navigate(`/products/detail-product/${product._id}`);
  };

  return (
    <>
      <Header />
      <FloatingCart />

      {/* CAROUSEL */}
      <div className="carousel-container">
        <Carousel>
          <Carousel.Item interval={2500}>
            <img className="d-block w-100 carousel-image" src={carousel02} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item interval={2500}>
            <img className="d-block w-100 carousel-image" src={carousel01} alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item interval={2500}>
            <img className="d-block w-100 carousel-image" src={carousel03} alt="Third slide" />
          </Carousel.Item>
        </Carousel>
      </div>

      {/* KATEGORI */}
      <Container className="py-3 py-md-5 py-xl-8 pb-xxl-0 bsb-section-pt-xxl-1 category-container">
        <Row className="justify-content-center category-box border-0">
          <Col xs={12}>
            <Row className="align-items-center justify-content-between">
              <Col>
                <h5 className="fw-bold text-secondary">Kategori</h5>
              </Col>
            </Row>
            <Row className="g-3 justify-content-center">
              {categories.map((category) => (
                <Col xs={12} sm={6} md={4} lg={2} key={category.id_category} className="d-flex justify-content-center" data-aos="fade-left">
                  <Card className="h-100 category-card border-0">
                    <Link to={`/products/${category.id_category}`} className="text-decoration-none text-dark">
                      <Card.Body className="d-flex flex-column align-items-center">
                        <div className="display-6 category-icon">
                          {category.icon || "💊"} {/* Placeholder icon */}
                        </div>
                        <Card.Title className="mt-3 category-name">
                          {category.name_category}
                        </Card.Title>
                      </Card.Body>
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      {/* ARTICLES */}
      <Container className="py-3 py-md-5 py-xl-8 pb-xxl-0 bsb-section-pt-xxl-1 diagnosis-container">
        <Row className="diagnosis-box justify-content-center">
          <Col xs={12}>
            <Row className="align-items-center justify-content-between">
              <Col>
                <h5 className="fw-bold text-secondary">Artikel Populer</h5>
              </Col>
              <Col xs="auto">
                <Button variant="link" className="see-all-button" as={Link} to="https://promkes.kemkes.go.id/search">
                  See All
                </Button>
              </Col>
            </Row>
            <Row className="g-3 justify-content-center">
              {diagnosis.map((item, index) => (
                <Col xs={12} sm={6} md={4} lg={2} key={index} className="d-flex justify-content-center" data-aos="zoom-in-up" data-aos-duration="1000" data-aos-delay={item.delay}>
                  <Card className="diagnosis-card h-100 border-0">
                    <Link to={item.path}>
                      <Card.Img variant="top" src={item.image} className="diagnosis-card-img" />
                      <Card.ImgOverlay className="d-flex flex-column justify-content-end">
                        <Card.Title className="diagnosis-name p-2">{item.name}</Card.Title>
                      </Card.ImgOverlay>
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      {/* PRODUK */}
      <Container className="py-3 py-md-5 py-xl-8 pb-xxl-0 bsb-section-pt-xxl-1 product-container">
        <Row className="product-box justify-content-center">
          <Col xs={12}>
            <Row className="align-items-center justify-content-between">
              <Col>
                <h5 className="fw-bold text-secondary">Produk Populer</h5>
              </Col>
              <Col xs="auto">
                <Button variant="link" className="see-all-button" as={Link} to="/products">
                  See All
                </Button>
              </Col>
            </Row>
            <Row className="g-3 mt-3">
              {products.length === 1 ? (
                <Col xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center" >
                  <Card className="product-card h-100 " onClick={() => handleProductClick(products[0])}>
                    <Card.Img variant="top" src={`${products[0].image}`} className="product-card-img" />
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <Card.Title className="product-name">{products[0].productName}</Card.Title>
                      <Card.Text className="product-price">{formatRupiah(products[0].price)}</Card.Text>
                      <Button variant="outline-success" className="pe-3 ps-3">Detail</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ) : (
                products.slice(0, 6).map((product) => (
                  <Col xs={12} sm={6} md={4}  key={product.id} className="" data-aos="fade-up" data-aos-duration="1200">
                    <Card className="product-card h-100 shadow mb-5" onClick={() => handleProductClick(product)}>
                      <Card.Img variant="top" src={`${product.image}`} className="product-card-img" />
                      <Card.Body className="d-flex flex-column justify-content-between">
                        <Card.Title className="product-name">{product.productName}</Card.Title>
                        <Card.Text className="product-price">{formatRupiah(product.price)}</Card.Text>
                        <Button variant="outline-success" className="pe-3 ps-3">Detail</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          </Col>
        </Row>
      </Container>
      {/* faq */}
      <div className="">
      <Container className="py-3 py-md-5 py-xl-8 pb-xxl-0 bsb-section-pt-xxl-1">
        <Row>
          <Col>
              <h5 className="fw-bold text-secondary mb-5">Pertanyaan yang  sering di tanyakan</h5>
          </Col>
        </Row>
        <Row className="row-cols-lg-2 row-cols-1 g-3">
          {faq.map((data) => {
            return (
              <Col key={data.id} data-aos="zoom-in" data-aos-duration="1000" data-aos-delay={data.delay}>
                  <Accordion defaultActiveKey="0" flush className="shadow p-3">
                  <Accordion.Item eventKey={data.eventKey} className="">
                  <Accordion.Header className="fw-bold">{data.title}</Accordion.Header>
                  <Accordion.Body>
                  <p>{data.desc}</p>
                  </Accordion.Body>
                </Accordion.Item>
                </Accordion>
              </Col>
            );
          })}
          
        </Row>
      </Container>

      </div>
      <Footer />
    </>
  );
};

export default Home;
