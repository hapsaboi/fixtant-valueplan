import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";
import { ngo, logo, BackEnd, states } from "../data/api";
import { FormGroup, Label, Input } from "reactstrap";
import Notifications from "components/Notification/Notification";

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function User() {
  const { userDetail, setUserDetail } = useAuth();
  const [userData, setUserData] = useState(userDetail);
  const [notificationStatus, setNotificationStatus] = useState(false)
  const [notificationDetails, setNotificationDetails] = useState({ msg: "", type: "" });
  const [file, setFile] = useState();


  async function editProfile(e) {
    e.preventDefault();
    await axios.patch(ngo.editProfile, userData).then((res) => {
      if (res.data.status) {
        setNotificationDetails({ msg: "Profile Updated Successfully", type: "success", change: res.data.change });
        setUserDetail(userData);
      }
      else {
        setNotificationDetails({ msg: "Error Updating Profile", type: "Danger" });
      }
      setNotificationStatus(true);
    });
  }


  async function addLogo(e) {
    e.preventDefault();
    var data = new FormData();

    data.append('file', file[0]);

    await axios.post(logo.addLogo, data).then((res) => {
      console.log(res);
      if (res.data.status) {
        setNotificationDetails({ msg: res.data.message, type: "success" });
      }
      else {
        setNotificationDetails({ msg: "Upload Unsuccessful, Please Refresh and Try Again!", type: "danger" });
      }
      setNotificationStatus(true);
    }).catch(function (error) {
      if (error.response) {
        // Request made and server responded
        setNotificationDetails({ msg: error.response.data.message, type: "danger" });
      }
    });

  }
  return (
    <>
      {notificationStatus ? <Notifications details={notificationDetails} /> : null}
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit NGO Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={editProfile}>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>NGO Name</label>
                        <Form.Control
                          defaultValue={userData.name}
                          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                          placeholder="NGO"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>

                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Form.Control
                          placeholder="Email"
                          type="email"
                          defaultValue={userData.email}
                          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Phone</label>
                        <Form.Control
                          defaultValue={userData.phone}
                          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                          placeholder="09012345666"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Registration No</label>
                        <Form.Control
                          defaultValue={userData.registration_number}
                          placeholder="1233"
                          disabled
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Address</label>
                        <Form.Control
                          defaultValue={userData.address}
                          onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                          placeholder="Address"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label for="exampleSelect">
                          Select
                        </Label>
                        <Input
                          name="select"
                          type="select"
                          onChange={(e) => setUserData({ ...userData, state: e.target.value })}
                        >
                          <option>
                            {userData.state?userData.state:"Select"}
                          </option>
                          {states.map((cat, key) => {
                            return (
                              <option key={key}>
                                {cat}
                              </option>);
                          })}
                        </Input>
                      </FormGroup>                    
                      </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Category</label>
                        <Form.Control
                          defaultValue={userData.category}
                          onChange={(e) => setUserData({ ...userData, category: e.target.value })}
                          placeholder="category"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Activities</label>
                        <Form.Control
                          defaultValue={userData.activities}
                          onChange={(e) => setUserData({ ...userData, activities: e.target.value })}
                          placeholder="Activities"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>About </label>
                        <Form.Control
                          cols="80"
                          defaultValue={userData.about}
                          onChange={(e) => setUserData({ ...userData, about: e.target.value })}
                          placeholder="Here can be your description"
                          rows="4"
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Mission</label>
                        <Form.Control
                          cols="80"
                          defaultValue={userData.mission}
                          onChange={(e) => setUserData({ ...userData, mission: e.target.value })}
                          placeholder="Here can be your mission"
                          rows="4"
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Vision</label>
                        <Form.Control
                          cols="80"
                          defaultValue={userData.vision}
                          onChange={(e) => setUserData({ ...userData, vision: e.target.value })}
                          placeholder="Here can be your vision"
                          rows="4"
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
              </div>
              <Card.Body>
                <div className="author">
                  <form encType="multipart/form-data" onSubmit={addLogo}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={userData.logo ? BackEnd + userData.logo : "../img/user.png"}
                    ></img>
                    <br />
                    <input type="file" required onChange={(e) => setFile(e.target.files)}
                      name="file"
                   />
                    <hr />
                    <div style={{ paddingLeft: "30%" }}>

                      <Button type="submit"
                        style={{ fill: "blue", display: "flex", alignItems: "center" }}>Upload Logo</Button>
                      <hr />
                    </div>
                    <h5 style={{ color: "black" }}>{userData.name}</h5>
                    <h5 style={{ color: "black" }}>{userData.address}</h5>

                  </form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
