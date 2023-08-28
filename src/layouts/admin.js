import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import logo from 'assets/img/brand/logo_2.png';
import routes from "routes/admin";

class Admin extends React.Component {
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
  getRoutes = routes => {
    // eslint-disable-next-line
    return routes.map((prop, key) => {
      if (!prop.component) {
        if (prop.layout === process.env.PUBLIC_URL + "/admin") {
          return prop.sub.map((item, key1) => {
            return (
              <Route
                path={prop.layout + item.path}
                component={item.component}
                key={key1}
              />
            );
          })
        }
      } else {
        if (prop.layout === process.env.PUBLIC_URL + "/admin") {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        } else {
          return null;
        }
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
      if (!routes[i].component) {
        for (let e = 0; e < routes[i].sub.length; e++) {
          if (
            this.props.location.pathname.indexOf(
              routes[i].layout + routes[i].sub[e].path
            ) !== -1
          ) {
            return `${routes[i].name} / ${routes[i].sub[e].name}`;
          }
        }
      }
    }
    return "Brand";
  };
  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: process.env.PUBLIC_URL + "/admin/index",
            imgSrc: { logo },
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>
            {this.getRoutes(routes)}
            <Redirect from="*" to={process.env.PUBLIC_URL + "/admin/index"} />
          </Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default Admin;
