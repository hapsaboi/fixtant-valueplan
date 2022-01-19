import React,{useState,useEffect} from "react";
import axios from "axios";
import { user } from "../data/api";
//import Application from "./Application";
import Notifications from "components/Notification/Notification";
import FormData from './Form'

// react-bootstrap components
import {
  Card,
  Table,
  Container,
  Row,
  Col,Button
} from "react-bootstrap";

function TableList() {
  const [notificationStatus, setNotificationStatus] = useState(false)
  const [notificationDetails, setNotificationDetails] = useState({msg:"",type:""});
  const [users,setUsers] = useState([]);
  const [single,setSingle] = useState({});
  const [show,setShow] = useState(false);

  
  useEffect(
		() => {
			async function fetchUsers() {
				await axios.get(user.showAllUsers).then((response)=>{
					if(response.data.status===true){
            setUsers(response.data.data);
          }
          else{
            setNotificationDetails({msg:"Error Loading Forms, Please Referesh The Page", type:"danger"});
            setNotificationStatus(true);
          }
				})
			}
			fetchUsers();
		},
  []);
  
  const thead = ["Name", "Email","DOB","Phone","Action"];
  return (
    <>
      {notificationStatus?<Notifications details={notificationDetails} />:null}
      <Container fluid>
        <Row>
        {!show ?
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Users</Card.Title>
                <p className="card-category">
                  Here is a list of all users
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
                      {users.length>0?
                        <>
                        {users.map((f, key) => {
                          return (
                            <tr key={key}>
                              <td>{f.name} </td>
                              <td>{f.email} </td>
                              <td>{f.dob}</td>
                              <td>{f.phone}</td>
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
          <FormData form={single} setShow={setShow}/>
        }
        </Row>
      </Container>
    </>
  );
}

export default TableList;
