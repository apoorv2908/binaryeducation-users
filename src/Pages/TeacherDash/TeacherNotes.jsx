import React from 'react'
import '../Styles/Dashboard.css'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function TeacherNotes() {

    const navigate = useNavigate();
  return (
    <div>
         <div className='dashboarddiv'>
        <h1>TEACHER DASHBOARD</h1>
      </div>

      <Row>
        <Col lg={3} sm={12}>
          <Sidebar className=''>

            <Menu>
            <MenuItem onClick={()=>navigate('/dashboard-teacherbooks')}> My Books </MenuItem>
              <MenuItem onClick={()=>navigate('/dashboard-teacherstudents')}> My Students </MenuItem>
              <MenuItem onClick={()=>navigate('/dashboard-teacherprofile')}> My Profile </MenuItem>
              <MenuItem onClick={()=>navigate('/dashboard-teachernotes')}> My Notes </MenuItem>
            </Menu>
          </Sidebar>
        </Col>

        <Col lg={3} sm={12}>
        <h1>Teacher Notes</h1>
        </Col>

        <Col lg={3} sm={12}>
        </Col>

        <Col lg={3} sm={12}>
        </Col>
      </Row>
    </div>
  )
}

export default TeacherNotes