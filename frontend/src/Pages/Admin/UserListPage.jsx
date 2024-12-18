import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import api from "../../api";  // Adjust the import based on your project structure
import Sidebar from "../../Components/Admin/Sidebar";


function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users/all");
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setRole(user.role);
    setShowEditModal(true);
  };

  const handleSave = async () => {
    try {
      await api.put(`/users/updateRole`, {
        id: selectedUser._id,
        role
      });
      setShowEditModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  return (
    <>
      <Sidebar />
      <Container>
        <h2 className="pt-5">User List</h2>
        <Table striped bordered hover className="my-4">
          <thead>
            <tr>
              <th>No</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>{user.address}</td>
                <td>
                  <Button variant="info" className="me-2" size="sm" onClick={() => handleEdit(user)}>
                  <i class="fa-solid fa-pen-to-square me-2"></i>Edit Role</Button>{" "}
                  <Button variant="danger" size="sm">
                  <i class="fa-solid fa-trash me-2"></i>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserList;
