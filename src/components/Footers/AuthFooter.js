import CONFIG_APP from "config";
import moment from "moment";
import React from "react";

import { Container, Row, Col } from "reactstrap";

class Login extends React.Component {
  render() {
    return (
      <>
        <footer className="pt-5">
          <Container>
            <Row className="align-items-center justify-content-xl-between">
              <Col xl="12" style={{ textAlign: "center" }}>
                <div className="copyright text-center  text-muted">
                  © {moment(new Date()).format("YYYY")}{" "}{CONFIG_APP.projectName + " - Creado por "}
                  <a
                    className="font-weight-bold ml-1"
                    href="https://javier-retondo.ar"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "rgb(242, 197, 27)" }}
                  >
                    Javier Retondo
                  </a>
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default Login;
