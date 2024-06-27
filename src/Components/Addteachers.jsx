import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import config from "../config";
import { Button, Form, Modal } from 'react-bootstrap';

const Addteachers = () => {
  const [teacherName, setTeacherName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [school, setSchool] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [schools, setSchools] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showModal, setShowModal] = useState(true);

  const navigate = useNavigate();

  const apiKey = 'SmNzN3BHZTFvRTlmQW43MG01M0hleThOVFFGVnF6c0RPbEF4cmJIRQ==';

  useEffect(() => {
    fetchSchools();
    fetchCountries();
  }, []);

  useEffect(() => {
    if (country) {
      fetchStates();
    }
  }, [country]);

  useEffect(() => {
    if (state) {
      fetchCities();
    }
  }, [state]);

  const fetchSchools = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Users/Schools/fetchschools.php`);
      const data = await response.json();
      if (data.success) {
        setSchools(data.schools);
      } else {
        console.error('Failed to fetch schools');
      }
    } catch (error) {
      console.error('Error fetching schools:', error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://api.countrystatecity.in/v1/countries', {
        headers: {
          'X-CSCAPI-KEY': apiKey
        }
      });
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchStates = async () => {
    try {
      const response = await fetch(`https://api.countrystatecity.in/v1/countries/${country}/states`, {
        headers: {
          'X-CSCAPI-KEY': apiKey
        }
      });
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await fetch(`https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`, {
        headers: {
          'X-CSCAPI-KEY': apiKey
        }
      });
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', loginEmail);
    formData.append('password', loginPassword);

    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-user/user/login.php`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setLoggedInUser(data.username);
        setLoginError('');
        setShowModal(false);

        // Close the login form modal (assumed to be a modal)
        // Implement modal close logic here
      } else {
        setLoginError('Username/password not found');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginError('Error during login');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('teacherName', teacherName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('contactNumber', contactNumber);
    formData.append('country', country);
    formData.append('state', state);
    formData.append('city', city);
    formData.append('zipcode', zipcode);
    formData.append('school', school);
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Users/Teachers/addteachers.php`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        alert('Teacher added successfully');
        navigate("/");
      } else {
        alert('Failed to add teacher');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding teacher');
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          {/* Main content */}
        
          <div className="col-md-12">
            <div className="container mt-3">
              {/* Topbar */}
              <div className="row">

                <div className="col-md-12 d-flex justify-content-between shadow-lg p-3 mb-5 bg-white rounded">
                  <div>
                      <div>

                        <h5 className='bg-warning'>Login</h5>
                        <Form onSubmit={handleLogin}>
                          <Form.Group controlId="loginEmail">
                            <Form.Label className='mt-4 fw-bold fs-6'>Email/Username</Form.Label>
                            <Form.Control 
                              type="text" 
                              placeholder="Enter username" 
                              value={loginEmail}
                              onChange={(e) => setLoginEmail(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group controlId="loginPassword" className="mt-2">
                            <Form.Label className='mt-4 fw-bold'>Password</Form.Label>
                            <Form.Control 
                              type="password" 
                              placeholder="Enter password" 
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                            />
                          </Form.Group>
                          <div className='d-flex justify-content-end'>
                            <Button style={{ backgroundColor: "#0A1172", outline: "none", border: "none" }} type="submit" className="mt-3">
                              Login
                            </Button>
                          </div>
                          {loginError && (
                            <div className='text-danger d-flex justify-content-end'>
                              {loginError}
                            </div>
                          )}
                          <div className='text-primary d-flex justify-content-end'>
                            Forgot Password?
                          </div>
                        </Form>
                      </div>
                
                  </div>
                  <div className="vr rem"></div>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <h5 className='bg-warning'>Register</h5>
                    <br></br>
                    <div>
                      <div className='d-flex justify-content-between'>
                        <div>
                          <label className='fw-bold'>Teacher Name</label>
                          <input
                            className='mt-3 xyf cursor form-control'
                            placeholder='Enter Teacher Name'
                            value={teacherName}
                            onChange={(e) => setTeacherName(e.target.value)}
                            required
                          /><br></br>
                        </div>
                        <div>
                          <label className='fw-bold'>Email</label>
                          <input
                            className='form-control mt-3 cursor'
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          /><br />
                        </div>
                        <div>
                          <label className='fw-bold'>Contact Number</label><br />
                          <input
                            className='form-control mt-3 cursor'
                            placeholder='Enter Contact Number'
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            required
                          /><br />
                        </div>
                      </div>
                      <div><label className='fw-bold'>School</label><br />
                        <select
                          className='form-control mt-3 cursor'
                          value={school}
                          onChange={(e) => setSchool(e.target.value)}
                        >
                          <option value="">Select School</option>
                          {schools.map((school) => (
                            <option key={school.school_id} value={school.school_id}>{school.school_name}</option>
                          ))}
                        </select><br /></div>
                      
                      <div className='d-flex justify-content-between'>
                      <div>
                        <label className='fw-bold'>Country</label><br />
                        <select
                          className='form-control mt-3 cursor'
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        >
                          <option value="">Select Country</option>
                          {countries.map((country) => (
                            <option key={country.iso2} value={country.iso2}>{country.name}</option>
                          ))}
                        </select><br />
                      </div>
                        <div>
                          <label className='fw-bold'>State</label><br />
                          <select
                            className='form-control mt-3 cursor'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                          >
                            <option value="">Select State</option>
                            {states.map((state) => (
                              <option key={state.iso2} value={state.iso2}>{state.name}</option>
                            ))}
                          </select><br />
                        </div>
                        <div>
                          <label className='fw-bold'>City</label><br />
                          <select
                            className='form-control mt-3 cursor'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                              <option key={city.id} value={city.id}>{city.name}</option>
                            ))}
                          </select><br />
                        </div>
                        <div>
                          <label className='fw-bold'>Zipcode</label><br />
                          <input
                            className='form-control mt-3 cursor'
                            placeholder='Enter Zipcode'
                            value={zipcode}
                            onChange={(e) => setZipcode(e.target.value)}
                          /><br />
                        </div>
                      </div>
                      <div className='d-flex justify-content-between'>
                       
                        <div>
                          <label className='fw-bold'>Password</label><br />
                          <input
                            className='form-control mt-3 cursor'
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          /><br />
                        </div>
                      </div>
                      <div className='d-flex justify-content-between'>
                        <div>
                          <label className='fw-bold'>Profile Picture</label><br />
                          <input
                            className='mt-3 cursor'
                            type='file'
                            accept='image/*'
                            onChange={(e) => setProfilePic(e.target.files[0])}
                          />
                        </div>
                      </div>
                      <Button style={{ backgroundColor: "#0A1172", outline: "none", border: "none" }} type="submit" className="mt-3">
                        Register
                      </Button>
                    </div>
                    
                  </form>
                </div>
              </div>

              
            </div>
          </div>
          
          {/* End of Main content */}
        </div>
      </div>
      
    </div>
  );
};

export default Addteachers;
