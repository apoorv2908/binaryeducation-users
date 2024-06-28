import React from 'react'
import '../Styles/Dashboard.css'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SchoolDashboard() {

  const navigate = useNavigate();

  return (
    <div>
      <div className='dashboarddiv'>
        <h1>SCHOOL DASHBOARD</h1>
      </div>

      <Row>
        <Col lg={3} sm={12}>
          <Sidebar className=''>

            <Menu>
              <MenuItem onClick={()=>navigate('/dashboard-schoolbooks')}> Books Assigned </MenuItem>
              <MenuItem onClick={()=>navigate('/dashboard-schoolstudents')}> Students </MenuItem>
              <MenuItem onClick={()=>navigate('/dashboard-schoolteachers')}> Teachers </MenuItem>
            </Menu>
          </Sidebar>
        </Col>

        <Col lg={3} sm={12}>
        </Col>

        <Col lg={3} sm={12}>
        </Col>

        <Col lg={3} sm={12}>
        </Col>
      </Row>


    </div>
  )
}

export default SchoolDashboard