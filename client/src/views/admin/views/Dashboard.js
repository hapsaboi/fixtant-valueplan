import React from "react";
//import { forms,authenticate } from "../data/api";
//import axios from "axios";
// react-bootstrap components
import {
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useAuth } from "contexts/AuthContext";
//import Notifications from "components/Notification/Notification";


function Dashboard() {
  const {userDetail} = useAuth();
  

  return (
    <>
      {/* {notificationStatus === true ? <Notifications details={notificationDetails}  />:null}
       */}
      <Container fluid>
        <Row>
          <Col lg="12" sm="12">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-circle-09 text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Message</p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stat">
                  Hello  - {userDetail.name}
                  <h2>Welcome! Our team says thank you for signing up. Please contact the Fixtant CEO Dillon Onyemelukwe with the number +2347048598912 and he will walk you through the process.
                  </h2>
                </div>
              </Card.Footer>
            </Card>
          </Col>

        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
