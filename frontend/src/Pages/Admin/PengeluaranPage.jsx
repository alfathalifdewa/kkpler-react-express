import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import Sidebar from "../../Components/Admin/Sidebar";

const PengeluaranPage = () => {
  const [dataPengeluaran, setDataPengeluaran] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPengeluaran, setNewPengeluaran] = useState({ tanggal: "", jumlah: 0, catatan: "" });

  useEffect(() => {
    // Fetch dataPengeluaran from API or local storage
    fetchPengeluaran();
  }, []);

  const fetchPengeluaran = () => {
    // Simulasi fetch data
    setDataPengeluaran([
      { tanggal: "2025-01-15", jumlah: 200000, catatan: "Beli bahan" },
      { tanggal: "2025-01-14", jumlah: 100000, catatan: "Transportasi" },
    ]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPengeluaran((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPengeluaran = () => {
    setDataPengeluaran([...dataPengeluaran, { ...newPengeluaran, jumlah: parseInt(newPengeluaran.jumlah) }]);
    setShowModal(false);
    setNewPengeluaran({ tanggal: "", jumlah: 0, catatan: "" });
  };

  return (
    <>
      <Sidebar />
      <Container className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Pengeluaran</h3>
          <Button variant="success" onClick={() => setShowModal(true)}>
            <i className="fa-solid fa-plus me-2"></i>Tambah Pengeluaran
          </Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal</th>
              <th>Jumlah</th>
              <th>Catatan</th>
            </tr>
          </thead>
          <tbody>
            {dataPengeluaran.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.tanggal}</td>
                <td>Rp {item.jumlah.toLocaleString()}</td>
                <td>{item.catatan}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah Pengeluaran</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Tanggal</Form.Label>
                <Form.Control type="date" name="tanggal" value={newPengeluaran.tanggal} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Jumlah</Form.Label>
                <Form.Control type="number" name="jumlah" value={newPengeluaran.jumlah} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Catatan</Form.Label>
                <Form.Control type="text" name="catatan" value={newPengeluaran.catatan} onChange={handleInputChange} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Batal
            </Button>
            <Button variant="primary" onClick={handleAddPengeluaran}>
              Tambah
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default PengeluaranPage;