import index from "views/admin/dashboard"
import userAdmin from 'views/admin/userAdmin'
import clients from 'views/admin/clients'
import certificates from 'views/admin/certificates'
import products from 'views/admin/products'
import deals from 'views/admin/deals'
import sellPoints from 'views/admin/sellPoints'
import SelfEmployedScales from "views/admin/selfEmployed/scales"
import SelfEmployedClients from "views/admin/selfEmployed/clients"
import SelfEmployedControl from "views/admin/selfEmployed/control"
import SelfEmployedEntries from "views/admin/selfEmployed/entries"

var routes = [
  {
    path: "/index",
    name: "Inicio",
    icon: "ni ni-tv-2 text-blue",
    component: index,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 0
  }, {
    path: "/user-admin",
    name: "Usuarios",
    icon: "ni ni-single-02 text-blue",
    component: userAdmin,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 6
  }, {
    path: "/business",
    name: "Clientes",
    icon: "ni ni-briefcase-24 text-red",
    component: clients,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 7
  },
  {
    path: "/certificates",
    name: "Certificados Digitales",
    icon: "ni ni-key-25 text-green",
    component: certificates,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 8
  },
  {
    path: "/sellPoints",
    name: "Puntos de Venta",
    icon: "ni ni-shop text-red",
    component: sellPoints,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 9
  },
  {
    path: "/products",
    name: "Productos Servicios",
    icon: "ni ni-bag-17 text-blue",
    component: products,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 10
  },
  {
    path: "/deals",
    name: "Contratos y vencimientos",
    icon: "ni ni-calendar-grid-58 text-red",
    component: deals,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 11
  },
  {
    sub: [
      {
        name: "Escalas",
        path: "/selfEmployed/scales",
        component: SelfEmployedScales,
      },
      {
        name: "Clientes",
        path: "/selfEmployed/clients",
        component: SelfEmployedClients,
      },
      {
        name: "Control",
        path: "/selfEmployed/control",
        component: SelfEmployedControl,
      },
      {
        name: "Carga",
        path: "/selfEmployed/entries",
        component: SelfEmployedEntries,
      }
    ],
    name: "Monotributistas",
    icon: "ni ni-badge text-green",
    layout: process.env.PUBLIC_URL + "/admin",
    id: 12
  },
];
export default routes;
