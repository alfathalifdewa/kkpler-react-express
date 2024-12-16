import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import api from '../../api';
import Sidebar from '../../Components/Admin/Sidebar';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    id_category: '',
    name_category: '',
    icon: '💊', // Default icon
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/category');
      setCategories(response.data.category);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
    setNewCategory({
      id_category: '',
      name_category: '',
      icon: '💊', // Reset to default icon when closing modal
    });
  };

  const handleShowModal = (category) => {
    if (category) {
      setSelectedCategory(category);
      setNewCategory({ ...category });
    } else {
      setNewCategory({
        id_category: '',
        name_category: '',
        icon: '💊', // Default icon for new category
      });
    }
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedCategory) {
        const response = await api.put(`/category/${selectedCategory._id}`, newCategory);
        console.log('Category updated:', response.data);
      } else {
        const response = await api.post('/category', newCategory);
        console.log('New category added:', response.data);
      }
      fetchCategories();
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save category', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await api.delete(`/category/${categoryId}`);
      console.log('Category deleted:', response.data);
      fetchCategories();
    } catch (error) {
      console.error('Failed to delete category', error);
    }
  };

  return (
    <>
      <Sidebar />
      <Container>
        <div className="d-flex justify-content-between align-items-center mt-5">
          <h3>Category List</h3>
          <Button variant="success" onClick={() => handleShowModal(null)}>
          <i class="fa-solid fa-plus me-2"></i> Add Category
          </Button>
        </div>
        <Table striped bordered hover className="my-4">
          <thead>
            <tr>
              <th>No</th>
              <th>ID Category</th>
              <th>Name Category</th>
              <th>Icon</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id}>
                <td>{index + 1}</td>
                <td>{category.id_category}</td>
                <td>{category.name_category}</td>
                <td>{category.icon}</td>
                <td>
                  <Button variant="info" className='me-2' size="sm" onClick={() => handleShowModal(category)}>
                  <i class="fa-solid fa-pen-to-square me-2"></i> Edit
                  </Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => handleDeleteCategory(category._id)}>
                  <i class="fa-solid fa-trash me-2"></i> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCategory ? 'Edit Category' : 'Add New Category'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formIdCategory">
              <Form.Label>ID Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ID category"
                name="id_category"
                value={newCategory.id_category}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNameCategory">
              <Form.Label>Name Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name category"
                name="name_category"
                value={newCategory.name_category}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formIcon">
              <Form.Label>Icon</Form.Label>
              <Form.Control
                as="select"
                name="icon"
                value={newCategory.icon}
                onChange={handleInputChange}
                required
              >
                <option value="🥦">🥦</option>
                <option value="🍉">🍉</option>
                <option value="🥩">🥩</option>
                <option value=""></option>
                <option value="🧂">🧂</option>
                <option value="❄️">❄️</option>




              </Form.Control>
            </Form.Group>
            <div className='d-flex gap-3'>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              {selectedCategory ? 'Save Changes' : 'Add Category'}
            </Button>
            </div>
           
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CategoryList;
