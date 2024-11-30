import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Plus, Dash } from 'react-bootstrap-icons';
import Header from '../../Components/User/Header';
import Footer from '../../Components/User/Footer';
import { Container, Row, Col, Breadcrumb, Image, Button, Modal } from 'react-bootstrap';
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
      <Container className="detail-product-container">
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
            Beranda
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/products' }}>
            Product
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{product?.productName}</Breadcrumb.Item>
        </Breadcrumb>
        {product ? (
          <Row className="detail-product">
            <Col md={4} className="detail-product-image">
              <Image src={product.image} alt={product.productName} fluid />
            </Col>
            <Col md={8} className="product-details">
              <h3>{product.productName}</h3>
              <h4 className="detail-product-price">
                <span>{formatRupiah(product.price)}</span>
              </h4>
              <p className="per-unit">Per {product.unit.toUpperCase()}</p>
              <div className="detail-product-actions">
                <Button
                  variant="success"
                  className="cart-button"
                  onClick={() => setShowModal(true)}
                >
                  + Tambah ke Keranjang
                </Button>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <Button variant="outline-success" className="cart-button" onClick={handleDecrement}>
                    <Dash />
                  </Button>
                  <span>{itemCount}</span>
                  <Button variant="success" className="cart-button" onClick={handleIncrement}>
                    <Plus />
                  </Button>
                </div>
              </div>
              <hr />
              <div className="product-deskripsi">
                <h3>Deskripsi</h3>
                <p>{product.desc}</p>
                <h4>Informasi Nilai Gizi</h4>
                <ul>
                  <li>Kalori: {product.nutrition.calories} kkal</li>
                  <li>Protein: {product.nutrition.protein}</li>
                  <li>Karbohidrat: {product.nutrition.carbohydrates}</li>
                  <li>Serat: {product.nutrition.fiber}</li>
                  <li>Vitamin C: {product.nutrition.vitaminC}</li>
                </ul>
                <h4>Tanggal Panen</h4>
                <p>{product.harvestDate}</p>
                <h4>Tanggal Kedaluwarsa</h4>
                <p>{product.expiryDate}</p>
                <h4>Asal Produk</h4>
                <p>{product.origin}</p>
                <h4>Ketersediaan</h4>
                <p>{product.availability ? 'Tersedia' : 'Tidak Tersedia'}</p>
              </div>
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
