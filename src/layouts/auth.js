import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { Container, Row, Col } from "reactstrap";

import logo from 'assets/img/brand/logo_2.png';
import slogan from 'assets/img/brand/slogan_png.png';

import AuthFooter from "components/Footers/AuthFooter.js";
//import AuthNavbar from 'components/Navbars/AuthNavbar';

import routes from "routes/login";

const Auth = () => {
  useEffect(() => {
    document.body.classList.add("bg-default")
    return () => {
      document.body.classList.remove("bg-default")
    }
  }, [])

  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === process.env.PUBLIC_URL + "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={() => <prop.component />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <div className="main-content">
        <div className="header bg-primary py-4 mb-5">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <img src={logo} alt="logo" style={{ width: "80%" }} />
                  <img src={slogan} alt="slogan" style={{ width: "80%" }} />
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        {/* Page content */}
        <Container className="mt--8 pb-2">
          <Row className="justify-content-center">
            <Switch>
              {getRoutes(routes)}
              <Redirect from="*" to={process.env.PUBLIC_URL + "/auth/login"} />
            </Switch>
          </Row>
        </Container>
      </div>
      <AuthFooter />
    </>
  );
}

export default Auth;
