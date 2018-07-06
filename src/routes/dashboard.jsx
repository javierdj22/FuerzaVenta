// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
// core components/views
import Centros from "views/Centros/Centros.jsx";
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import Usuarios from "views/Usuarios/Usuarios.jsx";
import Tradicional from "views/Tradicional/Tradicional.jsx";
import Still from "views/Still/Still.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Simulador de pago",
    navbarName: "Configuracion",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/centros",
    sidebarName: "Centros",
    navbarName: "Lista de Centros",
    icon: Person,
    component: Centros
  },
  {
    path: "/Usuarios",
    sidebarName: "Usuarios",
    navbarName: "Lista de Usuarios",
    icon: Person,
    component: Usuarios
  },
  {
    path: "/Tradicional",
    sidebarName: "Tradicional",
    navbarName: "Parametro Tradicional",
    icon: LibraryBooks,
    component: Tradicional
  },
  {
    path: "/Still",
    sidebarName: "Still",
    navbarName: "Parametro Still",
    icon: BubbleChart,
    component: Still
  },/*
  {
    path: "/maps",
    sidebarName: "Maps",
    navbarName: "Map",
    icon: LocationOn,
    component: Maps
  },
  {
    path: "/notifications",
    sidebarName: "Notifications",
    navbarName: "Notifications",
    icon: Notifications,
    component: NotificationsPage
  },
  {
    path: "/upgrade-to-pro",
    sidebarName: "Upgrade To PRO",
    navbarName: "Upgrade To PRO",
    icon: Unarchive, 
    component: UpgradeToPro
  },*/
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
