import React from "react";
import { Route, Switch } from "react-router-dom";
import Profile from "./pages/Profile";
import Bookings from "views/client/Bookings.js";


function Client() {

const routes = [
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    layout: "/client",
  },
  {
    path: "/bookings",
    name: "Bookings",
    component: Bookings,
    layout: "/client",
  },
];

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/client") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
    
  };

  return ( 
     <Switch>{getRoutes(routes)}</Switch>
  )
          
}

export default Client;
