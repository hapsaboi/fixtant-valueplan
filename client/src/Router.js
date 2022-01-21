import React from 'react';
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import ValuePlanLandingPage from "demos/ValuePlanLandingPage.js";
import { useAuth } from './contexts/AuthContext';

import RouteClient from './RouteClient'
import AdminLayout from './views/admin/layouts/Admin'

import LoginPage from "pages/Login.js";
import SignupPage from "pages/Signup.js";
//import MainLandingPage from "MainLandingPage.js";

function RouterComp() {
    
    const { loggedIn,userDetail } = useAuth();
                
    return (
        <BrowserRouter>
            {loggedIn?
                <>
                {userDetail.type==='admin'?
                    <Switch>
                        <>
                        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
                        <Redirect to="/admin/dashboard" />
                        </>
                    </Switch>
                :
                
                    <Switch>
                        <>
                        <Route exact path="/" component={ValuePlanLandingPage} />     
                        <Route path="/client" render={(props) => <RouteClient {...props} />} />
                        <Redirect to="/" />
                        </>
                    </Switch>
                }
               </>
            :
                <Switch>
                    <Route exact path="/" component={ValuePlanLandingPage} /> 
                    <Route path="/signup" component={SignupPage} />  
                    <Route path="/login" component={LoginPage} /> 
                    {/* <Redirect to="/" /> */}
                </Switch>
            
            }          
          
        </BrowserRouter>
    )
}
export default RouterComp;


