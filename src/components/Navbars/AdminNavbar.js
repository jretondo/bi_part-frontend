import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";
import User from 'assets/img/theme/default-avatar.png';
import { ModalMyProfile } from "../Modals/ModalProfile";
import { ModalActivity } from "components/Modals/ModalActivity";

const AdminNavbar = (props) => {
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isAdmin, setIsAdmin] = useState(0)
  const [exit, setExit] = useState(false)
  const [modalProfile, setModalProfile] = useState(false)
  const [modalAct, setModalAct] = useState(false)

  useEffect(() => {
    setName(localStorage.getItem("name"))
    setLastName(localStorage.getItem("lastName"))
    setIsAdmin(localStorage.getItem("admin"))
  }, [])

  const SalirBtn = (e) => {
    e.preventDefault()
    setExit(true)
  }

  if (exit) {
    return (
      <Redirect
        className="text-light"
        to="/auth/login"
      />
    )
  } else {
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {props.brandText}
            </Link>
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={User}
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {name} {" "}{lastName}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Bienvenido!</h6>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" onClick={e => {
                    e.preventDefault()
                    setModalProfile(true)
                  }}>
                    <i className="ni ni-single-02" />
                    <span>Mi perfil</span>
                  </DropdownItem>
                  {
                    isAdmin ?
                      <DropdownItem to="/admin/user-profile" onClick={e => {
                        e.preventDefault()
                        setModalAct(true)
                      }}>
                        <i className="ni ni-calendar-grid-58" />
                        <span>Actividad</span>
                      </DropdownItem> : null
                  }
                  <DropdownItem to="/admin/user-profile" >
                    <i className="ni ni-support-16" />
                    <a href="https://api.whatsapp.com/send?phone=5493512009913&text=Hola%20Javier%2C%20estoy%20teniendo%20problemas%20con%20la%20aplicaci%C3%B3n.%20Solicito%20asistencia%20para%20solucionarlo.%20Gracias!%0AAplicaci%C3%B3n%3A%20%22Municipalidad%20de%20La%20Calera%22" target="_blank" rel="noreferrer" style={{ color: "black" }}><span>Soporte</span></a>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="#pablo" onClick={e => SalirBtn(e)}>
                    <i className="ni ni-user-run" />
                    <span>Salir</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
        <ModalMyProfile
          modal={modalProfile}
          toggle={() => setModalProfile(!modalProfile)}
        />
        <ModalActivity
          modal={modalAct}
          toggle={() => setModalAct(!modalAct)}
        />
      </>
    )
  }
}

export default AdminNavbar;
