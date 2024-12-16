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
        <h1 className="fw-bold text-success">
          Vege<span className="text-secondary">Sale</span>
        </h1>
        <Dropdown>
            <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
              Profile
              <i class="fa-regular fa-user ms-2"></i>
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
            <i class="fa-solid fa-house me-2"></i>
            Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard/user-list" className="sidebar-link">
            <i class="fa-solid fa-users me-2"></i>
            User List
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard/product-list" className="sidebar-link">
            <i class="fa-solid fa-seedling me-2"></i>
            Product List
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard/category-list" className="sidebar-link">
            <i class="fa-solid fa-list me-2"></i>
            Category List
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard/order-list" className="sidebar-link">
            <i class="fa-solid fa-bag-shopping me-2"></i>
            Order List
          </Nav.Link>
          <Nav.Link onClick={handleLogout} className="sidebar-link">
            <i class="fa-solid fa-right-from-bracket me-2"></i>
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
