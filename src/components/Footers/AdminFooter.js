import CONFIG_APP from "config";
import moment from "moment";
import React from "react";

// reactstrap components
import { Row, Col } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer" style={{ backgroundColor: "#f8f9fe" }}>
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-muted">
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
      </footer>
    );
  }
}

export default Footer;
