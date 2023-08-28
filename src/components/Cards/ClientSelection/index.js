import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, CardBody, Col, FormGroup, Input, InputGroup, InputGroupAddon, Label, Row } from "reactstrap";
import ActionsBackend from "context/actionsBackend";
import AlertsContext from "context/alerts";
import apiRoutes from "../../../api/routes";
import LoadingContext from 'context/loading';

const ClientSelectionCard = ({ activeClient, setActiveClient, moduleId }) => {
    const [clientsList, setClientsList] = useState([])
    const [isChangingClient, setIsChangingClient] = useState(true)

    const { newAlert } = useContext(AlertsContext)
    const { axiosGetQuery, loadingActions } = useContext(ActionsBackend)
    const { setIsLoading } = useContext(LoadingContext)

    const getClientsList = async () => {
        const response = await axiosGetQuery(apiRoutes.usersDir.sub.clients, [{ moduleId }])
        if (!response.error) {
            setClientsList(response.data)
        } else {
            newAlert("danger", "Hubo un error!", "Puede que aún no haya clientes cargados en la base de datos!")
        }
    }

    const changeClient = (client) => {
        setActiveClient(JSON.parse(client))
        setIsChangingClient(false)
    }

    useEffect(() => {
        isChangingClient && getClientsList()
        // eslint-disable-next-line 
    }, [isChangingClient])

    useEffect(() => {
        setIsLoading(loadingActions)
    }, [loadingActions, setIsLoading])

    return (
        <Card>
            <CardBody className="py-2">
                <Row>
                    <Col md="12">
                        {
                            isChangingClient ?
                                <FormGroup>
                                    <Label>Empresas</Label>
                                    <InputGroup>
                                        <Input type="select" value={JSON.stringify(activeClient)} onChange={e => changeClient(e.target.value)}>
                                            {
                                                clientsList.length > 0 && clientsList.map((client, key) => {
                                                    !activeClient && changeClient(JSON.stringify(client.Clients[0]))
                                                    return <option value={JSON.stringify(client.Clients[0])} key={key}>{client.Clients[0].business_name} (CUIT: {client.Clients[0].document_number})</option>
                                                })
                                            }
                                        </Input>
                                        <InputGroupAddon addonType="append"><Button color="danger" onClick={e => {
                                            e.preventDefault()
                                            setIsChangingClient(false)
                                        }}>X</Button></InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                                :
                                <FormGroup>
                                    <Label>Empresa activa</Label>
                                    <InputGroup>
                                        <Input type="text" disabled value={activeClient ? `${activeClient.business_name} (CUIT: ${activeClient.document_number})` : "No hay cliente seleccionado"} />
                                        <InputGroupAddon addonType="append"><Button color="primary" onClick={e => {
                                            e.preventDefault()
                                            setIsChangingClient(true)
                                        }}>Cambiar Empresa</Button></InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                        }
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default ClientSelectionCard