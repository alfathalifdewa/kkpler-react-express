import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Plus, Dash } from 'react-bootstrap-icons';
import Header from '../../Components/User/Header';
import Footer from '../../Components/User/Footer';
import { Container, Row, Col, Breadcrumb, Image, Button, Modal, Card, ListGroup } from 'react-bootstrap';
import '../../assets/css/DetailProduct.css';
import api from '../../api';
import FloatingCart from '../../Components/User/FloatingCart';
import { CartContext } from '../../contexts/CartContext';

const DetailProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [itemCount, setItemCount] = useState(1);
  const { addToCart } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(id, itemCount);
      setItemCount(1);
      setShowModal(false);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleIncrement = () => {
    setItemCount(itemCount + 1);
  };

  const handleDecrement = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
    }
  };

  return (
    <>
      <Header />
      <FloatingCart />
      <Container className="mt-5">
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
            Beranda
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/products' }}>
            Product
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{product?.productName}</Breadcrumb.Item>
        </Breadcrumb>

        {product ? (
          <Row>
            <Col md={5}>
              <Card className="mb-4">
                <Card.Img variant="top" src={product.image} alt={product.productName} />
              </Card>
            </Col>

            <Col md={7}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>{product.productName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{formatRupiah(product.price)}</Card.Subtitle>
                  <Card.Text>Per {product.unit.toUpperCase()}</Card.Text>

                  <div className="mb-3">
                    <Button
                      variant="success"
                      className="me-2"
                      onClick={() => setShowModal(true)}
                    >
                      + Tambah ke Keranjang
                    </Button>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <Button variant="outline-success" onClick={handleDecrement}>
                        <Dash />
                      </Button>
                      <span className="mx-2">{itemCount}</span>
                      <Button variant="success" onClick={handleIncrement}>
                        <Plus />
                      </Button>
                    </div>
                  </div>

                  <hr />

                  <h5>Deskripsi</h5>
                  <p>{product.desc}</p>

                  <h5>Informasi Nilai Gizi</h5>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Kalori: {product.calories} kkal</ListGroup.Item>
                    <ListGroup.Item>Protein: {product.protein} g</ListGroup.Item>
                    <ListGroup.Item>Karbohidrat: {product.carbohydrates} g</ListGroup.Item>
                    <ListGroup.Item>Serat: {product.fiber} g</ListGroup.Item>
                    <ListGroup.Item>Vitamin C: {product.vitaminC} mg</ListGroup.Item>
                  </ListGroup>

                  <h5>Tanggal Panen</h5>
                  <p>{new Date(product.harvestDate).toLocaleDateString()}</p>

                  <h5>Tanggal Kedaluwarsa</h5>
                  <p>{new Date(product.expiryDate).toLocaleDateString()}</p>

                  <h5>Asal Produk</h5>
                  <p>{product.origin}</p>

                  <h5>Ketersediaan</h5>
                  <p>{product.availability ? 'Tersedia' : 'Tidak Tersedia'}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <p>Loading...</p>
        )}
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin menambahkan <strong>{itemCount}</strong> {product?.productName} ke keranjang?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="success" onClick={handleAddToCart}>
            Ya, Tambahkan
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default DetailProduct;
