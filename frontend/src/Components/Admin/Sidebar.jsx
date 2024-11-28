import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../assets/css/DashboardPage.css";

function Sidebar() {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    navigate("/logout");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Navbar */}
      <div className="navbar">
        <button className="menu-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        <h1 className="fw-bold">
          Sayurku<span className="text-success">.id</span>
        </h1>
        <Dropdown>
            <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
              Profile
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/dashboard/my-profile">
                My Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
      </div>

      {/* Sidebar */}
      <div className={`sidebar-container ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <button className="close-sidebar" onClick={toggleSidebar}>
            ✖
          </button>
        </div>
        <Nav className="flex-column   gap-4">
          <Nav.Link as={Link} to="/dashboard" className="sidebar-link">
            Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard/user-list" className="sidebar-link">
            User List
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard/product-list" className="sidebar-link">
            Product List
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard/category-list" className="sidebar-link">
            Category List
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard/order-list" className="sidebar-link">
            Order List
          </Nav.Link>
          <Nav.Link onClick={handleLogout} className="sidebar-link">
            Logout
          </Nav.Link>
        </Nav>
        <div className="sidebar-footer">
         
        </div>
      </div>
    </>
  );
}

export default Sidebar;
