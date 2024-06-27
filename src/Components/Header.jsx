import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container, Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import './Styles/Header.css'; // Import the CSS file
import logo from "./Assets/logo-2.jpeg";
import { Link, useNavigate } from 'react-router-dom';
import config from "../config";
import Sidebar from './Sidebar'; // Add this line
import Addstudents from './Addstudent';
import Addteachers from './Addteachers';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loginType, setLoginType] = useState('');
    const [classes, setClasses] = useState([]);
    const [series, setSeries] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false); // Add this line
    const navigate = useNavigate();
  
    useEffect(() => {
        fetch(`${config.apiBaseUrl}/fullmarks-user/navbar/fetchclasslist.php`)
            .then(response => response.json())
            .then(data => setClasses(data))
            .catch(error => console.error('Error fetching class names:', error));
    }, []);

    useEffect(() => {
        fetch(`${config.apiBaseUrl}/fullmarks-user/navbar/fetchserieslist.php`)
            .then(response => response.json())
            .then(data => setSeries(data))
            .catch(error => console.error('Error fetching series names:', error));
    }, []);
  
    const handleClassSelect = (classId) => {
        navigate(`/classes/${classId}`);
    };

    const handleSeriesSelect = (subjectId) => {
        navigate(`/series/${subjectId}`);
    };
  
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLoginClick = (type) => {
        setLoginType(type);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setLoginType('');
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <Navbar
                className={`bg-light fw-bold custom-navbar ${scrolled ? 'scrolled' : ''}`}
                expand="lg"
                fixed="top"
            >
                <Container >
                    <Navbar.Brand><img className='mno' src={logo} alt="Logo" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className='abc' id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/" className='mx-3'>HOME</Nav.Link>
                            <Nav.Link as={Link} to="/about" className='mx-3'>ABOUT</Nav.Link>


                            <NavDropdown className='mx-3' style={{ color: 'white', textDecoration: 'none' }} title="SUBJECTS" id="series-nav-dropdown">
                                {series.map((seriesItem, index) => (
                                    <NavDropdown.Item key={index} onClick={() => handleSeriesSelect(seriesItem.subject_id)}>
                                        {seriesItem.subject_name}
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>
                            
                            <NavDropdown className='mx-3' title="CLASS" id="class-nav-dropdown">
                                {classes.map((classItem, index) => (
                                    <NavDropdown.Item key={index} onClick={() => handleClassSelect(classItem.class_id)}>
                                        {classItem.class_name}
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>
                            <Nav.Link as={Link} to="/contact" className='mx-3'>CONTACT</Nav.Link>
                        </Nav>
                        <Nav className='mx-5'>
                            <NavDropdown title={<FontAwesomeIcon icon={faUser} />} id="login-dropdown">
                                <NavDropdown.Item onClick={() => handleLoginClick('teacher')}>Login as Teacher</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleLoginClick('student')}>Login as Student</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleLoginClick('school')}>Login as School</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Button variant="light" onClick={toggleSidebar} className='mx-2'>
                            <FontAwesomeIcon icon={faBars} />
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <LoginModal show={showModal} handleClose={handleClose} loginType={loginType} />
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} /> {/* Add this line */}
        </>
    );
};

const LoginModal = ({ show, handleClose, loginType }) => {
    const renderForm = () => {
        if (loginType === 'school') {
            return (
                <>
                    <div>
                        <h5>Login as School</h5>
                        <Form>
                            <Form.Group controlId="schoolUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" />
                            </Form.Group>
                            <Form.Group controlId="schoolPassword" className="mt-2">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter password" />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-3">
                                Login
                            </Button>
                            <p className="mt-3">Contact admin to register as a school.</p>
                        </Form>
                    </div>
                </>
            );
        }  if (loginType === 'student') {
            return (
                <>
                <div>
                <Addstudents/>
                </div>
                </>
            );
        } if (loginType === 'teacher') {
            return (
                <>
                <div>
                <Addteachers/>
                </div>
                </>
            );
        }  
    };

    return (
        <Modal show={show} onHide={handleClose} centered dialogClassName="custom-modal-width">
            <Modal.Header closeButton>
                <Modal.Title>{loginType ? `Login as ${loginType.charAt(0).toUpperCase() + loginType.slice(1)}` : ''}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {renderForm()}
            </Modal.Body>
        </Modal>
    );
    
};

export default Header;
