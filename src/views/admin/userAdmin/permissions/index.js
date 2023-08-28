import apiRoutes from '../../../../api/routes'
import React, { useContext, useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import alertsContext from 'context/alerts';
import actionsBackend from 'context/actionsBackend';
import TabUserPermission from './tabUserPermissions';

const UserPermissions = ({
    setNewForm,
    idUser,
    userName,
    setIsLoading
}) => {
    const [permissionsList, setPermissionsList] = useState([])

    const { newAlert, newActivity } = useContext(alertsContext)
    const { axiosGetQuery, axiosPost, loadingActions } = useContext(actionsBackend)

    useEffect(() => {
        setIsLoading(loadingActions)
    }, [loadingActions, setIsLoading])

    const getPermissions = async () => {
        const response = await axiosGetQuery(apiRoutes.usersDir.sub.permissions, [{ idUser: idUser }])
        if (!response.error) {
            setPermissionsList(response.data)
        } else {
            newAlert("danger", "Hubo un problema!", "Hubo un error al querer traer los permisos y los clientes. Controle que haya clientes cargados.")
        }
    }

    const postNewPermissions = async () => {
        const dataPost = {
            permissionsList,
            idUser
        }
        const response = await axiosPost(apiRoutes.usersDir.sub.permissions, dataPost)
        if (!response.error) {
            newActivity(`El administrador le concedió nuevos permisos al usuario ${userName} (id: ${idUser})`)
            newAlert("success", "Registrado con éxito!", "Fueron concedido los nuevos permisos.")
            setNewForm(false)
        } else {
            newAlert("danger", "Hubo un problema!", "No se puedieron actualizar los permisos. intente nuevamente. Si persiste llamar a soporte.")
        }
    }

    useEffect(() => {
        getPermissions()
        // eslint-disable-next-line
    }, [])

    return (
        <Card>
            <CardHeader>
                <Row>
                    <Col md="10">
                        <h2>{`Permisos en clientes para el usuario ${userName}`}</h2>
                    </Col>
                    <Col md="2" style={{ textAlign: "right" }}>
                        <button
                            className="btn btn-danger"
                            onClick={e => {
                                e.preventDefault();
                                setNewForm(false);
                            }}
                        >X</button>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <Container>
                    <div className='pb-5'>
                        <TabUserPermission
                            permissionsList={permissionsList}
                            setPermissionsList={setPermissionsList}
                        />
                    </div>
                </Container>
                <Container>
                    <Row>
                        <Col md="12" style={{ textAlign: "center" }}>
                            <button
                                className="btn btn-primary"
                                style={{ width: "200px", margin: "25px" }}
                                onClick={e => {
                                    e.preventDefault()
                                    postNewPermissions()
                                }}
                            >
                                Confirmar Permisos
                            </button>
                            <button
                                className="btn btn-danger"
                                style={{ width: "200px", margin: "25px" }}
                                onClick={e => {
                                    e.preventDefault()
                                    setNewForm(false)
                                }}
                            >
                                Cancelar
                            </button>
                        </Col>
                    </Row>
                </Container>
            </CardBody>
        </Card>
    )
}

export default UserPermissions