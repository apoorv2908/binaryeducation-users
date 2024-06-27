import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from "../config"
import { Navbar, Nav, NavDropdown, Container, Modal, Button, Form } from 'react-bootstrap';


const Addstudents = () => {
  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [school, setSchool] = useState('');
  const [className, setClassName] = useState('');
  const [schools, setSchools] = useState([]);
  const [classes, setClasses] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  const apiKey = 'SmNzN3BHZTFvRTlmQW43MG01M0hleThOVFFGVnF6c0RPbEF4cmJIRQ==';

  useEffect(() => {
    fetchSchools();
    fetchClasses();
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

  const fetchClasses = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Classes/fetchclasses.php`);
      const data = await response.json();
      if (data.success) {
        setClasses(data.classes);
      } else {
        console.error('Failed to fetch classes');
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Users/Students/addstudents.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentName, email, password, contactNumber, country, state, city, zipcode, school, className }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Student added successfully');
        navigate("/students")
      } else {
        alert('Failed to add student');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding student');
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
                <div >
                        <h5 className= 'bg-warning'>Login</h5>
                        <Form>
                            <Form.Group controlId="schoolUsername">
                                <Form.Label className= 'mt-4 fw-bold fs-6' >Email/Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" />
                            </Form.Group>
                            <Form.Group controlId="schoolPassword" className="mt-2">
                                <Form.Label  className= 'mt-4 fw-bold'>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter password" />
                            </Form.Group>
                            <div className= 'd-flex justify-content-end'>
                            <Button style={{ backgroundColor: "#0A1172", outline: "none", border: "none"}} type="submit" className="mt-3">
                                Login
                            </Button>
                            </div>
                            <div className= 'text-primary d-flex justify-content-end'>
                              Forgot Password?
                            </div>
                           
                        </Form>
                    </div>
                    <div className ="vr rem"></div>

                <hr></hr>
                  <form onSubmit={handleSubmit}>
                  <h5 className= 'bg-warning'>Register</h5>
                  <br></br>
<div>

  <div className= 'd-flex justify-content-between'>
                    <div>
                    <label className= 'fw-bold'>Student Name</label>
                    <input
                      className='mt-3 xyf cursor form-control'
                      placeholder='Enter Student Name'
                      value={studentName}
                      required = "true"
                      onChange={(e) => setStudentName(e.target.value)}

                    /><br></br>
                    </div>


                   




                  

                    <div>
                    <label className= 'fw-bold'>Email</label>
                    <input
                      className='form-control mt-3 cursor'
                      type='email'
                      placeholder='Enter Email'
                      value={email}
                      required = "true"
                      onChange={(e) => setEmail(e.target.value)}
                    /><br />
                    </div>





                    <div>
                    <label className= 'fw-bold'>Contact Number</label><br />
                    <input
                      className='form-control mt-3 cursor'
                      placeholder='Enter Contact Number'
                      value={contactNumber}
                      required = "true"
                      onChange={(e) => setContactNumber(e.target.value)}
                    /><br />
                    </div>

</div>

                    <div><label className= 'fw-bold'>School</label><br />
                    <select
                      className='form-control mt-3 cursor'
                      value={school}
                      required = "true"
                      onChange={(e) => setSchool(e.target.value)}
                    >
                      <option value="">Select School</option>
                      {schools.map((school) => (
                        <option key={school.school_id} value={school.school_id}>{school.school_name}</option>
                      ))}
                    </select><br /></div>




                    <div>
                    <label className= 'fw-bold'>Class</label><br />
                    <select
                      className='form-control mt-3 cursor'
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                    >
                      <option value="">Select Class</option>
                      {classes.map((classItem) => (
                        <option key={classItem.class_id} value={classItem.class_name}>{classItem.class_name}</option>
                      ))}
                    </select><br />
                    </div>


                     

<div className= 'd-flex justify-content-between'>


                    <div>
                    <label className= 'fw-bold'>Country</label><br />
                    <select
                      className='form-control mt-3 cursor'
                      value={country}
                      required = "true"
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country.iso2} value={country.iso2}>{country.name}</option>
                      ))}
                    </select><br />
                    </div>


                    <div>
                    <label className= 'fw-bold'>State</label><br />
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
                    <label className= 'fw-bold'>City</label><br />
                    <select
                      className='form-control mt-3 cursor'
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.name}>{city.name}</option>
                      ))}
                    </select><br />
                    </div>

                    <div>
                    <label className= 'fw-bold'>Zipcode</label><br />
                    <input
                      className='form-control mt-3 cursor'
                      placeholder='Enter Zipcode'
                      value={zipcode}
                      onChange={(e) => setZipcode(e.target.value)}
                    /><br />
                    </div>

                  </div>
                    
                   </div> 
                    
                   
                    
                    
                    
                    
                 

<div>
                    <label className= 'fw-bold'>Password</label><br />
                    <input
                      className='form-control mt-3 cursor'
                      type='password'
                      placeholder='Enter Password'
                      value={password}
                      required = "true"
                      onChange={(e) => setPassword(e.target.value)}
                    /><br /><br></br>
                    </div>
                    <div className= 'd-flex justify-content-end'>
                    <button type="submit" style={{ backgroundColor: "#0A1172", outline: "none", border: "none"}} className="btn btn-primary mt-3">Register</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addstudents;
