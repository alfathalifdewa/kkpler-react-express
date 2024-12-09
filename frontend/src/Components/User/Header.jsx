import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  Button,
  ButtonGroup,
  Offcanvas,
  Dropdown,
} from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/img/logo1.jpeg";
import "../../assets/css/Header.css";

const Header = () => {
  const [authToken, setAuthToken] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Gunakan untuk mendapatkan path saat ini

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    navigate("/logout");
  };

  return (
    <>
      <Navbar expand="lg" className="navbar-container" sticky="top">
        <Container fluid className="left-container">
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src={logo}
              alt="Logo"
              height="65"
              className="d-inline-block align-center me-3 animate__animated animate__bounce"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbarLabel-expand-lg`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbarLabel-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
            className="offcanvas-animation"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title
                id={`offcanvasNavbarLabel-expand-lg`}
                className="d-flex align-items-center"
              >
                <img
                  src={logo}
                  alt="Logo"
                  height="40"
                  className="d-inline-block align-top me-3"
                />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-center flex-grow-1 pe-3">
                <Nav.Link
                  as={Link}
                  to="/"
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                >
                  Beranda
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/products"
                  className={`nav-link ${
                    location.pathname === "/products" ? "active" : ""
                  }`}
                >
                  Produk
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/contact"
                  className={`nav-link ${
                    location.pathname === "/contact" ? "active" : ""
                  }`}
                >
                  Kontak Kami
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/about-us"
                  className={`nav-link ${
                    location.pathname === "/about-us" ? "active" : ""
                  }`}
                >
                  Tentang Kami
                </Nav.Link>
              </Nav>
              <hr />
              {authToken ? (
                <Dropdown align="end">
                  <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
                    Pengguna
                    <i class="fa-regular fa-user ms-2"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/user-profile">
                      Profil Saya
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/my-order">
                      Data Order
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <>
                  <ButtonGroup as={Link} to="/login" className="me-3">
                    <Button variant="success">Masuk</Button>
                  </ButtonGroup>
                  <ButtonGroup as={Link} to="/register">
                    <Button variant="outline-success">
                    <i class="fa-solid fa-user-plus me-2"></i>
                    Daftar
                    </Button>
                    
                  </ButtonGroup>
                </>
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
