import apiRoutes from '../../api/routes';
import React, { useEffect, useState } from 'react';
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from 'reactstrap';
import { useAxiosGetList } from '../../hooks/useAxiosGetList';

export const ModalMyProfile = ({
    modal,
    toggle
}) => {
    const [dataUser, setDataUser] = useState({
        name: "",
        lastname: "",
        user: "",
        email: "",
        tel: ""
    })

    const {
        dataPage,
        errorList,
        loadingList } =
        useAxiosGetList(
            apiRoutes.usersDir.sub.mydata,
            0, modal, []
        )

    useEffect(() => {
        try {
            setDataUser({
                name: dataPage.name,
                lastname: dataPage.lastname,
                email: dataPage.email,
                tel: dataPage.tel,
                user: dataPage.user
            })
        } catch (error) {

        }
    }, [dataPage])

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Mi perfil
            </ModalHeader>
            <ModalBody>
                {
                    errorList ? null :
                        loadingList ?
                            <Row>
                                <Col style={{ textAlign: "center" }}>
                                    <Spinner style={{ width: "150px", height: "150px" }} />
                                </Col>
                            </Row>
                            :
                            <>
                                <Row>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>Nombre</Label>
                                            <Input disabled value={dataUser.name} />
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>Apellido</Label>
                                            <Input disabled value={dataUser.lastname} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>Usuario</Label>
                                            <Input disabled value={dataUser.user} />
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>Telefóno</Label>
                                            <Input disabled value={dataUser.tel} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                            <Label>
                                                Email
                                            </Label>
                                            <Input disabled value={dataUser.email} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </>
                }
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={e => {
                    e.preventDefault()
                    toggle()
                }}>
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>
    )
}