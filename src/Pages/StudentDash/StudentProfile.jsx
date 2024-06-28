import React from 'react'
import '../Styles/Dashboard.css'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function StudentProfile() {

    const navigate = useNavigate();
  return (
    <div>
         <div className='dashboarddiv'>
        <h1>STUDENT DASHBOARD</h1>
      </div>

      <Row>
        <Col lg={3} sm={12}>
          <Sidebar className=''>

            <Menu>
            <MenuItem onClick={()=>navigate('/dashboard-studentsbooks')}> My Books </MenuItem>
            <MenuItem onClick={()=>navigate('/dashboard-studentsprofile')}> My Profile </MenuItem>
            </Menu>
          </Sidebar>
        </Col>

        <Col lg={3} sm={12}>
        <h1>Student Profile</h1>
        </Col>

        <Col lg={3} sm={12}>
        </Col>

        <Col lg={3} sm={12}>
        </Col>
      </Row>
    </div>
  )
}

export default StudentProfile