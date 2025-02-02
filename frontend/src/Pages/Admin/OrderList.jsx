import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Pagination } from 'react-bootstrap';
import api from '../../api';
import Sidebar from '../../Components/Admin/Sidebar';
import * as XLSX from "xlsx";

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10); // Jumlah item per halaman
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/order/all');
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const handleShowModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleUpdateStatus = async (status) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await api.put(
        '/order/updateStatus',
        { orderId: selectedOrder._id, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Order status updated:', response.data);
      fetchOrders();
      handleCloseModal();
    } catch (error) {
      console.error('Failed to update order status', error);
    }
  };

  const handleExportToExcel = () => {
    const exportData = orders.map((order, index) => ({
      "#": index + 1,
      "Order Date": new Date(order.createdAt).toLocaleDateString(),
      "Total Amount (IDR)": new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(order.total),
      Status: order.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Order List");

    XLSX.writeFile(workbook, "Order_List.xlsx");
  };

  // Logic for displaying current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Sidebar />
      <Container>
        <div className="d-flex justify-content-between align-items-center mt-5">
          <h3>Order List</h3>
          <Button variant="success" onClick={handleExportToExcel}>
            <i className="fa-solid fa-file-export me-2"></i> Export to Excel
          </Button>
        </div>
        <Table striped bordered hover className="my-4">
          <thead>
            <tr>
              <th>No</th>
              <th>Order Date</th>
              <th>Total Amount (IDR)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order, index) => (
              <tr key={order._id}>
                <td>{indexOfFirstOrder + index + 1}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(order.total)}
                </td>
                <td>{order.status}</td>
                <td>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => handleShowModal(order)}
                  >
                    <i className="fa-solid fa-eye me-2"></i>View Order
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination */}
        <Pagination className="justify-content-center">
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>

      {/* Modal for viewing order details */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <h5>User: {selectedOrder.user.username}</h5>
              <h5>Order Date: {new Date(selectedOrder.createdAt).toLocaleDateString()}</h5>
              <h5>Total Amount: {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(selectedOrder.total)}</h5>
              <h5>Status: {selectedOrder.status}</h5>
              <h5>Address: {selectedOrder.address}</h5>
              <hr />
              <h5>Order Items:</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price (IDR)</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{item.product ? item.product.productName : 'Product Not Available'}</td>
                      <td>{item.quantity}</td>
                      <td>{item.product ? new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                        }).format(item.product.price) : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => handleUpdateStatus('Cancelled')}
            disabled={selectedOrder?.status === 'Cancelled' || selectedOrder?.status === 'Successful'}
          >
            Cancel Order
          </Button>
          <Button
            variant="primary"
            onClick={() => handleUpdateStatus('Successful')}
            disabled={selectedOrder?.status === 'Successful' || selectedOrder?.status === 'Cancelled'}
          >
            Update Payment Status to Successful
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderListPage;
