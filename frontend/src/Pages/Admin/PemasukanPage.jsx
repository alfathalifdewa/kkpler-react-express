import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import Sidebar from "../../Components/Admin/Sidebar";

const PemasukanPage = () => {
  const [dataPemasukan, setDataPemasukan] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPemasukan, setNewPemasukan] = useState({ tanggal: "", jumlah: 0, sumber: "" });

  useEffect(() => {
    // Fetch dataPemasukan from API or local storage
    fetchPemasukan();
  }, []);

  const fetchPemasukan = () => {
    // Simulasi fetch data
    setDataPemasukan([
      { tanggal: "2025-01-15", jumlah: 300000, sumber: "Penjualan" },
      { tanggal: "2025-01-14", jumlah: 150000, sumber: "Donasi" },
    ]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPemasukan((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPemasukan = () => {
    setDataPemasukan([...dataPemasukan, { ...newPemasukan, jumlah: parseInt(newPemasukan.jumlah) }]);
    setShowModal(false);
    setNewPemasukan({ tanggal: "", jumlah: 0, sumber: "" });
  };

  return (
    <>
      <Sidebar />
      <Container className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Pemasukan</h3>
          <Button variant="success" onClick={() => setShowModal(true)}>
            <i className="fa-solid fa-plus me-2"></i>Tambah Pemasukan
          </Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal</th>
              <th>Jumlah</th>
              <th>Sumber</th>
            </tr>
          </thead>
          <tbody>
            {dataPemasukan.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.tanggal}</td>
                <td>Rp {item.jumlah.toLocaleString()}</td>
                <td>{item.sumber}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah Pemasukan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Tanggal</Form.Label>
                <Form.Control type="date" name="tanggal" value={newPemasukan.tanggal} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Jumlah</Form.Label>
                <Form.Control type="number" name="jumlah" value={newPemasukan.jumlah} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Sumber</Form.Label>
                <Form.Control type="text" name="sumber" value={newPemasukan.sumber} onChange={handleInputChange} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Batal
            </Button>
            <Button variant="primary" onClick={handleAddPemasukan}>
              Tambah
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default PemasukanPage;
