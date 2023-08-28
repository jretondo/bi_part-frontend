import React, { useState, useEffect, useContext } from "react";
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
  UncontrolledTooltip,
  NavLink,
  Spinner
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import UrlNodeServer from '../../api/routes';
import axios from "axios";
import alertsContext from 'context/alerts';

const Login = () => {
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [seePassToggle, setSeePassToggle] = useState(false)
  const [typeInpPass, setTypeInpPass] = useState("password")
  const [rememberCred, setRememberCred] = useState(false)
  const [savedEmail, setSavedEmail] = useState(false)
  const [isLog, setIsLog] = useState(false)
  const [nvaPass, setNvaPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const { newAlert } = useContext(alertsContext)

  useEffect(() => {
    localStorage.removeItem("name")
    localStorage.removeItem("lastName")
    localStorage.removeItem("user-token")
    localStorage.removeItem("admin")
    if (!isLog) {
      const savedEmail = localStorage.getItem("savedEmail")
      if (savedEmail) {
        setUser(savedEmail)
        setRememberCred(true)
        setSavedEmail(true)
        try {
          document.getElementById("passInp").select()
          document.getElementById("passInp").focus()
        } catch (error) {
        }

      } else {
        setSavedEmail(false)
        try {
          document.getElementById("userInp").select()
          document.getElementById("userInp").focus()
        } catch (error) {
        }
      }
    }
    // eslint-disable-next-line
  }, [])

  const enter = async (e) => {
    e.preventDefault();
    const data = {
      username: user,
      password: pass
    }
    await axios.post(UrlNodeServer.authDir.auth, data)
      .then(res => {
        const response = res.data
        const status = parseInt(response.status)
        if (status === 200) {
          setLoading(false)

          const provisory = res.data.body.provisory
          const userData = res.data.body.userData
          localStorage.setItem("name", userData.name)
          localStorage.setItem("lastName", userData.lastname)
          localStorage.setItem("modules", JSON.stringify(res.data.body.modules))
          if (!userData.admin) {
          } else if (userData.admin) {
            localStorage.setItem("admin", true)
          }

          if (provisory) {
            if (rememberCred) {
              localStorage.setItem("savedEmail", user)
            } else {
              localStorage.removeItem("savedEmail")
            }
            localStorage.setItem("user-token", res.data.body.token)
            setNvaPass(true)
          } else {
            localStorage.setItem("user-token", res.data.body.token)
            if (rememberCred) {
              localStorage.setItem("savedEmail", user)
            } else {
              localStorage.removeItem("savedEmail")
            }
            setIsLog(true)
          }
        } else {
          newAlert("danger", "Error de ingreso!", "Posiblemente la contraseña sea incorrecta.")
        }
      })
      .catch(() => {
        newAlert("danger", "Error de ingreso!", "Posiblemente la contraseña sea incorrecta.")
      })
  }

  const togglePass = (e) => {
    e.preventDefault()
    if (seePassToggle) {
      setTypeInpPass("password")
    } else {
      setTypeInpPass("text")
    }
    setSeePassToggle(!seePassToggle)
  }

  const changeUser = (e) => {
    e.preventDefault()
    localStorage.removeItem("savedEmail")
    setSavedEmail(false)
    document.getElementById("userInp").select()
    document.getElementById("userInp").focus()
  }

  if (isLog) {
    return (
      <Redirect
        className="text-light"
        to={process.env.PUBLIC_URL + "/admin/index"}
      />
    )
  } else if (nvaPass) {
    return (
      <Redirect
        className="text-light"
        to={process.env.PUBLIC_URL + "/auth/new-pass"}
      />
    )
  } else {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5">
              <div className="text-center text-muted mb-4">
                <span style={{ fontWeight: "bold" }}>Ingrese con su credenciales:</span>
              </div>
              <Form role="form" onSubmit={e => enter(e)}>
                {
                  loading ?
                    <div style={{ textAlign: "center" }}>
                      <Spinner type="grow" color="light" /> </div> :
                    <>
                      {
                        savedEmail ?
                          <>
                            <FormGroup className="mb-3">
                              <InputGroup className="input-group-alternative">
                                <Input placeholder="Usuario" type="email" value={user} onChange={e => setUser(e.target.value)} autoComplete="new-user" id="userInp" required disabled />
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText style={{ padding: 0, }}>
                                    <Button id="btn_change_user" onClick={e => changeUser(e)}>
                                      <i className="fas fa-exchange-alt"></i>
                                    </Button>
                                  </InputGroupText>
                                </InputGroupAddon>
                              </InputGroup>
                            </FormGroup>
                            <UncontrolledTooltip
                              delay={0}
                              placement="top"
                              target="btn_change_user"
                            >Cambiar de usuario
                            </UncontrolledTooltip>
                          </>
                          :
                          <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-circle-08" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input placeholder="Usuario" type="text" value={user} onChange={e => setUser(e.target.value)} autoComplete="new-user" id="userInp" required />
                            </InputGroup>
                          </FormGroup>
                      }
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Contraseña" type={typeInpPass} autoComplete="new-password" value={pass} onChange={e => setPass(e.target.value)} id="passInp" required />
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <a href="/xa" id="verPass" onClick={e => togglePass(e)}> <i className="fas fa-eye" style={seePassToggle ? { color: "red" } : { color: "gray" }}></i></a>
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          id=" customCheckLogin"
                          type="checkbox"
                          checked={rememberCred}
                          onChange={e => setRememberCred(e.target.checked)}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor=" customCheckLogin"
                        >
                          <span className="text-muted">Recordar mis credenciales</span>
                        </label>
                      </div>
                      <div className="text-center">
                        <Button style={{ marginTop: "3em" }} color="primary" type="submit">
                          Ingresar
                        </Button>
                      </div>
                    </>
                }
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <NavLink
                className="text-light"
                to={process.env.PUBLIC_URL + "/auth/forgot-pass"}
                tag={Link}
              >
                <small>Olvidé mi contraseña</small>
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

export default Login;
