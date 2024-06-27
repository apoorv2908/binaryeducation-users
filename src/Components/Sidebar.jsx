import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/Sidebar.css'; // Create this CSS file for sidebar styles
import logo from "./Assets/logo-2.jpeg";


const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className=" mt-4 sidebar-content">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <p className= 'text-grey h6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ullam voluptas distinctio molestias? Doloribus, quas explicabo rerum voluptate quisquam sapiente perferendis. Corporis non quod commodi aliquid eaque animi doloribus! Explicabo!</p>
                
                <div className="sidebar-location">
                <iframe className= 'sidebar-map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28010.116307587756!2d77.1727220390824!3d28.65179679183049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d029c5f402ed3%3A0x942174294c9dd946!2sKarol%20Bagh%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1719383297840!5m2!1sen!2sin"></iframe>
                </div>
                <div className="sidebar-social">
                    <Link to="#"><i className="fab fa-facebook"></i></Link>
                    <Link to="#"><i className="fab fa-twitter"></i></Link>
                    <Link to="#"><i className="fab fa-pinterest"></i></Link>
                    <Link to="#"><i className="fab fa-linkedin"></i></Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
