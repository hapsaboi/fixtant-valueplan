import React,{useState,useEffect} from "react";
import axios from "axios";
import { record } from "../data/api";
//import Application from "./Application";
import Notifications from "components/Notification/Notification";
import FormData from './Form'
import RecordData from './Record'

// react-bootstrap components
import {
  Card,
  Table,
  Container,
  Row,
  Col,Button
} from "react-bootstrap";

function Record() {
  const [notificationStatus, setNotificationStatus] = useState(false)
  const [notificationDetails, setNotificationDetails] = useState({msg:"",type:""});
  const [records,setRecords] = useState([]);
  const [single,setSingle] = useState({});
  const [show,setShow] = useState(false);

  
  useEffect(
		() => {
			async function fetchRecords() {
				await axios.get(record.showRecords).then((response)=>{
					if(response.data.status===true){
            setRecords(response.data.data);
          }
          else{
            setNotificationDetails({msg:"Error Loading Records, Please Referesh The Page", type:"danger"});
            setNotificationStatus(true);
          }
				})
			}
			fetchRecords();
		},
  []);
  
  const thead = ["Name", "Record Type", "Date Applied","Action"];
  return (
    <>
      {notificationStatus?<Notifications details={notificationDetails} />:null}
      <Container fluid>
        <Row>
        {!show ?
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Records</Card.Title>
                <p className="card-category">
                  Here is a list of all records made
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                        {thead.map((prop, key) => {
                          
                          return <th className="border-0" key={key}>{prop}</th>;
                        })}
                    </tr>
                  </thead>
                    <tbody>
                      {records.length>0?
                        <>
                        {records.map((f, key) => {
                          return (
                            <tr key={key}>
                              <td>{f.name} </td>
                              <td>{f.record_type} </td>
                              <td>{new Date(f.date).toLocaleString()}</td>
                              <td><Button style={{fill:"blue", display:"flex", alignItems:"center"}} onClick={()=>{setSingle(f); setShow(true)}}>View</Button></td>
                            </tr>
                          );
                        })}
                        </>
                        :""}
                    </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          :
          <RecordData form={single} setShow={setShow}/>
        }
        </Row>
      </Container>
    </>
  );
}

export default Record;
