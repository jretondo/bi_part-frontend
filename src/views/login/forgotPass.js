import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  NavLink,
  Spinner
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import UrlNodeServer from '../../api/routes'
import axios from 'axios'
import alertsContext from 'context/alerts';

const ForgPass = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const { newAlert, newActivity } = useContext(alertsContext)

  const passRecovery = async () => {
    const data = {
      email: email
    }
    setLoading(true)
    await axios.patch(UrlNodeServer.authDir.auth, data)
      .then(res => {
        setLoading(false)
        if (res.data.status === 200) {
          newActivity("El usuario ha recuperado la contraseña")
          newAlert("success", "Contraseña nueva!", "La nueva contraseña ha sido enviada a su casilla de email.")
          setDone(true)
        } else {
          newAlert("danger", "Error inesperado!", "Intente nuevamente.")
        }
      })
      .catch(() => {
        newAlert("danger", "Error inesperado!", "Intente nuevamente.")
      })
  }

  if (done) {
    return (
      <Redirect
        className="text-light"
        to={process.env.PUBLIC_URL + "/auth/login"}
      />
    )
  } else {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5">
              <div className="text-center text-muted mb-4">
                <span style={{ fontWeight: "bold" }}>Ingrese su casilla de correo:</span>
              </div>
              {
                loading ?
                  <Col md="12" style={{ textAlign: "center" }}>
                    <Spinner color="primary" style={{ width: "250px", height: "250px" }} />
                  </Col> :
                  <Form onSubmit={e => {
                    e.preventDefault()
                    passRecovery()
                  }}>
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="new-email" id="emailInp" required />
                      </InputGroup>
                    </FormGroup>

                    <div className="text-center">
                      <Button style={{ marginTop: "3em" }} color="primary" type="submit">
                        Recuperar Contraseña
                      </Button>
                    </div>
                  </Form>
              }
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <NavLink
                className="text-light"
                to={process.env.PUBLIC_URL + "/auth/login"}
                tag={Link}
              >
                <small>Loguearse</small>
              </NavLink>
            </Col>
            <Col className="text-right" xs="6">

            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default ForgPass;
