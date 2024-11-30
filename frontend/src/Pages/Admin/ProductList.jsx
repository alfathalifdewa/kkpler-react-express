import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import api from '../../api';
import Sidebar from '../../Components/Admin/Sidebar';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    productName: '',
    id_category: '',
    image: null,
    desc: '',
    calories: '',
    protein: '',
    carbohydrates: '',
    fiber: '',
    vitaminC: '',
    harvestDate: '',
    expiryDate: '',
    origin: '',
    price: 0,
    unit: '',
    availability: true
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/category');
      setCategories(response.data.category);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const formatIDR = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(price);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setNewProduct({
      productName: '',
      id_category: '',
      image: null,
      desc: '',
      calories: '',
      protein: '',
      carbohydrates: '',
      fiber: '',
      vitaminC: '',
      harvestDate: '',
      expiryDate: '',
      origin: '',
      price: 0,
      unit: '',
      availability: true
    });
  };

  const handleShowModal = (product) => {
    if (product) {
      setSelectedProduct(product);
      setNewProduct({ ...product });
    } else {
      setNewProduct({
        productName: '',
        id_category: '',
        image: null,
        desc: '',
        calories: '',
        protein: '',
        carbohydrates: '',
        fiber: '',
        vitaminC: '',
        harvestDate: '',
        expiryDate: '',
        origin: '',
        price: 0,
        unit: '',
        availability: true
      });
    }
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(newProduct).forEach(key => {
      if (key === 'image' && newProduct[key]) {
        formData.append(key, newProduct[key]);
      } else if (newProduct[key] !== null && newProduct[key] !== undefined) {
        formData.append(key, newProduct[key]);
      }
    });

    try {
      const response = await api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('New product added:', response.data);
      fetchProducts();
      handleCloseModal();
    } catch (error) {
      console.error('Failed to add new product', error);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(newProduct).forEach(key => {
      if (key === 'image' && newProduct[key]) {
        formData.append(key, newProduct[key]);
      } else if (newProduct[key] !== null && newProduct[key] !== undefined) {
        formData.append(key, newProduct[key]);
      }
    });

    try {
      const response = await api.put(`/products/${selectedProduct._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Product updated:', response.data);
      fetchProducts();
      handleCloseModal();
    } catch (error) {
      console.error('Failed to update product', error);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const response = await api.delete(`/products/${selectedProduct._id}`);
      console.log('Product deleted:', response.data);
      fetchProducts();
      handleCloseModal();
    } catch (error) {
      console.error('Failed to delete product', error);
    }
  };

  return (
    <>
      <Sidebar />
      <Container>
        <div className="d-flex justify-content-between align-items-center mt-5">
          <h3>Product List</h3>
          <Button variant="success" onClick={() => handleShowModal(null)}>
            Tambah Data
          </Button>
        </div>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price (IDR)</th>
              <th>Origin</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) &&
              products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>
                    {product.image ? (
                      <img src={product.image} alt={product.productName} style={{ maxWidth: '100px' }} />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td>{product.productName}</td>
                  <td>{formatIDR(product.price)} / {product.unit}</td>
                  <td>{product.origin}</td>
                  <td>{product.availability ? 'Available' : 'Not Available'}</td>
                  <td>
                    <Button variant="outline-success" size="sm" onClick={() => handleShowModal(product)}>
                      View Detail
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct ? 'Edit Product' : 'Add New Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={selectedProduct ? handleEditProduct : handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formProductName">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter product name"
                    name="productName"
                    value={newProduct.productName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    name="id_category"
                    value={newProduct.id_category}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category.id_category}>
                        {category.name_category}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formDesc">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="desc"
                value={newProduct.desc}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNutrition">
              <Form.Label>Nutrition</Form.Label>
              <Row>
                {['calories', 'protein', 'carbohydrates', 'fiber', 'vitaminC'].map((field) => (
                  <Col key={field}>
                    <Form.Control
                      type="text"
                      placeholder={field}
                      name={field}
                      value={newProduct[field]}
                      onChange={handleInputChange}
                    />
                  </Col>
                ))}
              </Row>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formHarvestDate">
                  <Form.Label>Harvest Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="harvestDate"
                    value={newProduct.harvestDate}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formExpiryDate">
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="expiryDate"
                    value={newProduct.expiryDate}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formOrigin">
                  <Form.Label>Origin</Form.Label>
                  <Form.Control
                    type="text"
                    name="origin"
                    value={newProduct.origin}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formUnit">
                  <Form.Label>Unit</Form.Label>
                  <Form.Control
                    type="text"
                    name="unit"
                    value={newProduct.unit}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formAvailability">
                  <Form.Check
                    type="checkbox"
                    label="Available"
                    name="availability"
                    checked={newProduct.availability}
                    onChange={(e) => setNewProduct({ ...newProduct, availability: e.target.checked })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" type="submit" className="ms-2">
                {selectedProduct ? 'Update' : 'Add'}
              </Button>
              {selectedProduct && (
                <Button variant="danger" onClick={handleDeleteProduct} className="ms-2">
                  Delete
                </Button>
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductList;
