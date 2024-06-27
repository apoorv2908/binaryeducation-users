import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import config from "../config";
import Sidebar from './Sidebar';
import logo from "./Assets/logo-2.jpeg";
import { useState, useEffect } from 'react';
import './Styles/Header.css';
import AuthContext from './Access/AuthContext';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useContext(AuthContext); // Use AuthContext

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <Navbar className={`bg-light fw-bold custom-navbar ${scrolled ? 'scrolled' : ''}`} expand="lg" fixed="top">
        <Container>
          <Navbar.Brand><img className='mno' src={logo} alt="Logo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className='abc' id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className='mx-3'>HOME</Nav.Link>
              <Nav.Link as={Link} to="/about" className='mx-3'>ABOUT</Nav.Link>
              <Nav.Link as={Link} to="/contact" className='mx-3'>CONTACT</Nav.Link>
              {/* Add more links as needed */}
            </Nav>
            <Nav className='mx-5'>
              {user ? (
                <>
                  <Nav.Link as={Link} to="/dashboard" className='mx-3'>
                    Hi, {user.name}
                  </Nav.Link>
                  <Button variant="outline-danger" onClick={handleLogout} className='mx-2'>
                    Logout
                  </Button>
                </>
              ) : (
                <NavDropdown title={<FontAwesomeIcon icon={faUser} />} id="login-dropdown">
                  <NavDropdown.Item as={Link} to="/login-teacher">Login as Teacher</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/login-student">Login as Student</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/">Login as School</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
            <Button variant="light" onClick={() => setSidebarOpen(!sidebarOpen)} className='mx-2'>
              <FontAwesomeIcon icon={faBars} />
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
    </>
  );
};

export default Header;
