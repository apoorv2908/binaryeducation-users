import React from 'react';
import logo from "./Assets/logo-2.jpeg";
import "./Styles/Aboutus.css";

const Aboutus = () => {
  return (
    <div className='mt-5'>
                  <p className="text-center mb-3  h6 rn1" style={{ color: "#0A1172" }}>OUT STORY</p>
      <div className= 'pt-2 d-flex justify-content-center h2 '>About Us</div>
      <div className=" d-flex flex-column flex-lg-row justify-content-between align-items-center">
        <div className='m-5 text-container'>
          <div className='about-title text-warning h5 fw-bold'>ABOUT BINARY EDUCATION</div>
          <br />
          <div className='text-black h2'>Welcome to Binary Education !!</div>
          <div className='about-content'>
            Recognizing the need is the primary than we expected Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint ipsa voluptatibus,
            Lorem ipsum dolor sit amet, consectetur adipisic ing elit, sed eius to mod tempors incididunt ut labore et dolore magna this aliqua enims ad minim. Lorem ipsum dolor sit amet, consectetur adipisic ing elit, sed eius to mod tempor. Lorem ipsum dolor sit amet
            <br /><br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat reprehenderit ex quas dolorem sapiente nulla molestiae minus voluptate voluptas dolore, vitae debitis architecto qui. Nulla minima ratione voluptate placeat! Nobis!
            <br /><br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae modi dolor quidem sapiente aperiam veniam iusto a, corporis quo dolorum. Est consequuntur harum nisi et laudantium voluptatem laborum minima autem.
          </div>
        </div>

        <div className='m-5 image-container'>
          <img src={logo} alt="Logo" className='img-fluid' />
        </div>
      </div>
    </div>
  );
}

export default Aboutus;
