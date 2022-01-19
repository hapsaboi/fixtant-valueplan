import React, { useState, useEffect } from "react";
import axios from "axios";
import { record } from "../data/api";
import Notifications from "components/Notification/Notification";

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  Table,
} from "react-bootstrap";

function FormD({ form, setShow }) {
  const [notificationStatus, setNotificationStatus] = useState(false)
  const [notificationDetails, setNotificationDetails] = useState({ msg: "", type: "" });
  const [records, setRecords] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [recordData, setRecordData] = useState({});

  async function addRecord(e) {
    let a;
    if(form.form_type === 'Needy'){a={benefit:recordData}}
    else if(form.form_type === 'Sponsor'){a={sponsoring:recordData}}
    else{a=recordData};

    e.preventDefault();
    let data = {...a,name:form.name,form_id:form._id,ngo_id:form.ngo_id,record_type:form.form_type};
  
    await axios.post(record.addRecord, data).then((res) => {
      if (res.data.status) {
        let rec = res.data.record;
        setRecords([...records, rec]);
        setIsAdd(!isAdd);
        setNotificationDetails({ msg: "Record added successfully", type: "success"});
      }
      else {
        setNotificationDetails({ msg: "Error adding record", type: "Danger" });
      }
      setNotificationStatus(true);
    });
  }

  useEffect(() => {
    async function fetchRecords() {
      
      await axios.get(record.showRecord, { params: { record_type: form.form_type, form_id:form._id } }).then((response) => {
        if (response.data.status === true) {
          console.log(response.data)
          setRecords(response.data.data);
        }
        else {
          setNotificationDetails({ msg: "Error Loading Records, Please Referesh The Page", type: "danger" });
          setNotificationStatus(true);
        }
      })
    }
    fetchRecords();
  }, []);

  const thead = ["Action", "Date Recorded"];
  return (
    <>
      {notificationStatus ? <Notifications details={notificationDetails} /> : null}
      <Container fluid>
        <Button style={{fill:"blue", display:"flex", alignItems:"center"}} onClick={()=>{setShow(false)}}>Back</Button>
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4"></Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col className="pr-1" md="6">
                    <Form.Group>
                      <label>Name: </label>
                      <br />
                      {form.name}
                    </Form.Group>
                  </Col>

                  <Col className="pl-1" md="6">
                    <Form.Group>
                      <label htmlFor="exampleInputEmail1">
                        Email address
                      </label>
                      <br />
                      {form.email}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="6">
                    <Form.Group>
                      <label>Phone</label>
                      <br />
                      {form.phone}
                    </Form.Group>
                  </Col>
                  <Col className="pl-1" md="6">
                    <Form.Group>
                      <label>Date</label>
                      <br />
                      {new Date(form.date).toLocaleString()}
                    </Form.Group>
                  </Col>
                </Row>
                {form.gender ?
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Gender</label>
                        <br />
                        {form.gender}
                      </Form.Group>
                    </Col>
                  </Row>
                  : ""
                }
                {form.occupation ?
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Occupation</label>
                        <br />
                        {form.occupation}
                      </Form.Group>
                    </Col>
                  </Row>
                  : ""
                }

                {form.organization_type ?
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Organization Type</label>
                        <br />
                        {form.gender}
                      </Form.Group>
                    </Col>
                  </Row>
                  : ""
                }

                {form.needs ?
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Needs</label>
                        <br />
                        {form.needs}
                      </Form.Group>
                    </Col>
                  </Row>
                  : ""
                }

                <Row>
                  <Col md="12">
                    <Form.Group>
                      <label>Address</label>
                      <br />
                      {form.address}
                    </Form.Group>
                  </Col>
                </Row>


                <Button
                  className="btn-fill pull-right"
                  type="submit"
                  variant="info"
                  hidden={isAdd}
                  onClick={() => { setIsAdd(true) }}
                >
                  Add Record
                </Button>
                <div className="clearfix"></div>

              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            {!isAdd ?
              <Card className="card-user">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      {thead.map((prop, key) => {

                        return <th className="border-0" key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {records.length > 0 ?
                      <>
                        {records.map((f, key) => {
                          return (
                            <tr key={key}>

                              {f.benefit ?
                                <td> {f.benefit.money ? "Money: " + f.benefit.money : null} <br /> {f.benefit.items ? "Items: " + f.benefit.items : null} <br /> {f.benefit.description ? " Description: " + f.benefit.description : null} <br /> </td>
                                : null
                              }
                              {f.volunteering ? <td>{f.volunteering} </td> : null}
                              {f.partnership ? <td>{f.partnership} </td> : null}
                              <td>{new Date(f.date).toLocaleString()}</td>
                            </tr>
                          );
                        })}
                      </>
                      : ""}
                  </tbody>
                </Table>
              </Card>
              :
              <>
                {form.form_type === 'Needy' || form.form_type === 'Sponsor' ?
                  <>
                    <Form.Group>
                      <label>Money</label>
                      <Form.Control
                        placeholder="100"
                        type="text"
                        onChange={(e) => setRecordData({ ...recordData, money: e.target.value })}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group>
                      <label>Items</label>
                      <Form.Control
                        placeholder="Soap, Food"
                        type="text"
                        onChange={(e) => setRecordData({ ...recordData, items: e.target.value })}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group>
                      <label>Description</label>
                      <Form.Control
                        placeholder="This item..."
                        type="text"
                        onChange={(e) => setRecordData({ ...recordData, description: e.target.value })}
                      ></Form.Control>
                    </Form.Group>
                  </>
                  :
                  <>
                    {form.form_type === "Volunteer" ?
                      <Form.Group>
                        <label>volunteering</label>
                        <Form.Control
                          placeholder="Volunteering"
                          type="text"
                          onChange={(e) => setRecordData({ volunteering: e.target.value })}
                        ></Form.Control>
                      </Form.Group>
                      :
                      <Form.Group>
                        <label>Partnership</label>
                        <Form.Control
                          placeholder="Partnership"
                          type="text"
                          onChange={(e) => setRecordData({ partnership: e.target.value })}
                        ></Form.Control>
                      </Form.Group>
                    }
                  </>
                }
                <Button
                  className="btn-fill pull-right"
                  type="submit"
                  variant="info"
                  onClick={addRecord }
                >
                  Add Record 
                </Button>
              </>
            }

          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FormD;
