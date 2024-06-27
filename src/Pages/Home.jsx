import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import BookList from '../Components/BookList';
import a1 from "./Assets/a1.jpg";
import a2 from "./Assets/a2.jpg";
import a3 from "./Assets/a3.jpg";
import a4 from "./Assets/a4.jpg";
import "./Styles/Home.css";
import CategoryGrid from '../Components/CategoryGrid';
import Newsfeed from '../Components/Newsfeed';
import Testimonials from '../Components/Testimonials';
import Aboutus from '../Components/Aboutus';

const banners = [
  { src: a4, text: "Join Our Learning Community", buttonText: "Start Now" },
];

  
const Home = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
        setFadeIn(true);
      }, 500); // Duration of fade out
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    document.title = 'Home';
  }, []);

  return (
    <Container fluid className='p-0'>
      <Row className='p-0'>
        <Col>
          <div className="banner-container position-relative">
            <img src={banners[currentBanner].src} className={`banner img-fluid ${fadeIn ? 'fade-in' : 'fade-out'}`} alt="Banner" />
            <div className="banner-text-container d-flex flex-column justify-content-center align-items-center position-absolute top-50 start-50 translate-middle text-center">
              <h2 className="banner-text mb-4">{banners[currentBanner].text}</h2>
              <Button className="banner-button btn-lg">{banners[currentBanner].buttonText}</Button>
            </div>
          </div>
          <Aboutus/>
          <BookList />
          <Newsfeed/>
          <Testimonials/>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
