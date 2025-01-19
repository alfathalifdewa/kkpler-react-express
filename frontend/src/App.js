// src/App.js
import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// AUTH
import Login from './Auth/Login';
import Register from './Auth/Register';
import Logout from './Auth/Logout';
import AdminRoute from './Auth/AdminRoute';
import ForgotPassword from './Auth/ForgotPassword';
import ResetPassword from './Auth/ResetPassword';

// PAGES
import Home from './Pages/User/Home';
import AboutUs from './Pages/User/AboutUs';
import Contact from './Pages/User/Contact';
import Category from './Pages/User/Category';
import DetailProduct from './Pages/User/DetailProduct';
import Product from './Pages/User/Product';
import ProductsByCategory from "./Pages/User/ProductsByCategory";
import NotFoundPage from './Pages/User/NotFoundPage';
import UserProfilePage from './Pages/User/UserProfilePage';
import Checkout from './Pages/User/Checkout';
import MyOrder from './Pages/User/MyOrder';
import OrderSuccess from './Pages/User/OrderSuccess'; // Import OrderSuccess component
import FloatingCart from './Components/User/FloatingCart';
import { CartProvider } from './contexts/CartContext';

// DASHBOARD
import DashboardPage from './Pages/Admin/DashboardPage';
import MyProfilePage from './Pages/Admin/MyProfilePage';
import ProductList from './Pages/Admin/ProductList';
import OrderListPage from './Pages/Admin/OrderList';
import UserListPage from './Pages/Admin/UserListPage';
import CategoryListPage from './Pages/Admin/Category';
import PemasukanPage from './Pages/Admin/PemasukanPage';
import PengeluaranPage from './Pages/Admin/PengeluaranPage';
import ScrollToTop from './Components/ScrollToTop';

const CheckTokenExpiration = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const tokenTimestamp = localStorage.getItem('tokenTimestamp');
      if (tokenTimestamp) {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - parseInt(tokenTimestamp, 10);
        const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
        if (elapsedTime >= oneHour) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
          localStorage.removeItem('tokenTimestamp');
          alert("You're session is expired!");
          navigate('/login');
        }
      }
    };

    const interval = setInterval(checkTokenExpiration, 60000); // Check every 1 minute
    checkTokenExpiration(); // Check immediately on mount

    return () => clearInterval(interval); // Cleanup on unmount
  }, [navigate]);

  return null; // Komponen ini tidak merender apapun
};

const App = () => {
  return (
    <CartProvider>
      <Router>
        <CheckTokenExpiration />
        <div className="app-container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/category" element={<Category />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/products" element={<ProductsByCategory />} />
            <Route path="/user-profile" element={<UserProfilePage />} />
            <Route path="/products/:id_category" element={<ProductsByCategory />} />
            <Route path="/products/detail-product/:id" element={<DetailProduct />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/my-order" element={<MyOrder />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* DASHBOARD ADMIN */}
            <Route path="/dashboard" element={<AdminRoute element={<DashboardPage />} />} />
            <Route path="/dashboard/my-profile" element={<AdminRoute element={<MyProfilePage />} />} />
            <Route path="/dashboard/product-list" element={<AdminRoute element={<ProductList />} />} />
            <Route path="/dashboard/user-list" element={<AdminRoute element={<UserListPage />} />} />
            <Route path="/dashboard/category-list" element={<AdminRoute element={<CategoryListPage />} />} />
            <Route path="/dashboard/order-list" element={<AdminRoute element={<OrderListPage />} />} />
            <Route path="/dashboard/transaksi/pemasukan" element={<AdminRoute element={<PemasukanPage />} />} />
            <Route path="/dashboard/transaksi/pengeluaran" element={<AdminRoute element={<PengeluaranPage />} />} />
          </Routes>
          <FloatingCart />
        </div>
        <ScrollToTop />
      </Router>
    </CartProvider>
  );
};

export default App;
