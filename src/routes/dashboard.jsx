// @material-ui/icons
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import Business from "@material-ui/icons/Business";
import People from "@material-ui/icons/People"
import ViewHeadline from "@material-ui/icons/ViewHeadline";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
import Centros from "views/Centros/Centros.jsx";
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import Usuarios from "views/Usuarios/Usuarios.jsx";
import Tradicional from "views/Tradicional/Tradicional.jsx";
import Still from "views/Still/Still.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Simulador de pago",
    navbarName: "Configuracion",
    icon: MonetizationOn,
    component: DashboardPage
  },
  {
    path: "/centros",
    sidebarName: "Centros",
    navbarName: "Lista de Centros",
    icon: Business,
    component: Centros
  },
  {
    path: "/Usuarios",
    sidebarName: "Usuarios",
    navbarName: "Lista de Usuarios",
    icon: People,
    component: Usuarios
  },
  {
    path: "/Tradicional",
    sidebarName: "Tradicional",
    navbarName: "Parametro Tradicional",
    icon: ViewHeadline,
    component: Tradicional
  },
  {
    path: "/Still",
    sidebarName: "Still",
    navbarName: "Parametro Still",
    icon: FormatListBulleted,
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
