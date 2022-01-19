import React,{useEffect,useState} from "react";
import { forms,authenticate } from "../data/api";
import axios from "axios";
// react-bootstrap components
import {
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useAuth } from "contexts/AuthContext";
import Notifications from "components/Notification/Notification";


function Dashboard() {
  const [notificationStatus, setNotificationStatus] = useState(false)
  const [notificationDetails, setNotificationDetails] = useState({msg:"",type:""});
  const [form,setForms] = useState([]);
  const {userDetail,setUserDetail} = useAuth();
  

  useEffect(
		() => {
     
			async function fetchApplications() {
        await axios.get(authenticate.getNgoData).then((user)=>{
        setUserDetail(user.data);	
      });
				await axios.get(forms.showForms).then((response)=>{
					if(response.data.status===true){
            setForms(response.data.data);
          }
          else{
            setNotificationDetails({msg:"Error Loading Dashoard, Please Referesh The Page", type:"danger"});
            setNotificationStatus(true);
          }
				})
			}
			fetchApplications();
		},
  []);
  function filterValue(obj, key, value) {
    return obj.filter(function(v){ return v[key] === value});
  }

  return (
    <>
      {notificationStatus === true ? <Notifications details={notificationDetails}  />:null}
      
      <Container fluid>
        <Row>
          <Col lg="6" sm="6">
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
                      <p className="card-category">Sponsors</p>
                      <Card.Title as="h4">Sponsors: {filterValue(form,"form_type","Sponsor").length}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
            </Card>
          </Col>

          <Col lg="6" sm="6">
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
                      <p className="card-category">Partners</p>
                      <Card.Title as="h4">Partners: {filterValue(form,"form_type","Partners").length}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg="6" sm="6">
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
                      <p className="card-category">Volunteers</p>
                      <Card.Title as="h4">Volunteers: {filterValue(form,"form_type","Volunteer").length}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
            </Card>
          </Col>

          <Col lg="6" sm="6">
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
                      <p className="card-category">Needy</p>
                      <Card.Title as="h4">Needy: {filterValue(form,"form_type","Needy").length}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
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
