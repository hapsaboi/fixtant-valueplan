
import Dashboard from "./views/Dashboard.js";
import UserProfile from "./views/UserProfile.js";
import Records from "./views/Records";
import Locations from "./views/Locations";
import Volunteers from "./views/Volunteer";
import Users from "./views/Users";
import Needy from "./views/Needy";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/locations",
    name: "Locations",
    icon: "nc-icon nc-notes",
    component: Locations,
    layout: "/admin",
  },
  {
    path: "/partners",
    name: "Users",
    icon: "nc-icon nc-notes",
    component: Users,
    layout: "/admin",
  },
  {
    path: "/volunteers",
    name: "Volunteers",
    icon: "nc-icon nc-notes",
    component: Volunteers,
    layout: "/admin",
  },
  {
    path: "/needy",
    name: "Needy",
    icon: "nc-icon nc-notes",
    component: Needy,
    layout: "/admin",
  },
  {
    path: "/records",
    name: "Records",
    icon: "nc-icon nc-notes",
    component: Records,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "NGO Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  }
];

export default dashboardRoutes;
