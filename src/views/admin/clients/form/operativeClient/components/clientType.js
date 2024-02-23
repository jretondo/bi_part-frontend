import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, FormGroup, Input, InputGroup, InputGroupAddon, Label, Modal, ModalBody, ModalHeader, Tooltip } from 'reactstrap';
import API_ROUTES from '../../../../../../api/routes';
import AlertsContext from '../../../../../../context/alerts';
import ActionsBackend from '../../../../../../context/actionsBackend';

const ClientTypeInput = ({
    clientType,
    setClientType
}) => {
    const [clientTypeList, setClientTypeList] = useState([])
    const [tooltipOpen, setTooltipOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [clientTypeName, setClientTypeName] = useState("")
    const [clientTypeDescription, setClientTypeDescription] = useState("")

    const { newAlert, newActivity } = useContext(AlertsContext)
    const { axiosGetQuery, axiosPost } = useContext(ActionsBackend)

    const getClientTypeList = async () => {
        const response = await axiosGetQuery(API_ROUTES.clientTypeDir.clientType, [])
        if (!response.error) {
            setClientTypeList(response.data)
        } else {
            newAlert("danger", "Hubo un error!", "Error: " + response.errorMsg)
        }
    }

    const createClientType = async () => {
        const response = await axiosPost(API_ROUTES.clientTypeDir.clientType, {
            name: clientTypeName,
            description: clientTypeDescription
        })
        if (!response.error) {
            newAlert("success", "Tipo creado!", "El tipo ha sido creado con éxito")
            newActivity("El usuario ha creado un nuevo tipo de cliente")
            setModalOpen(false)
            getClientTypeList()
        } else {
            newAlert("danger", "Hubo un error!", "Error: " + response.errorMsg)
        }
    }

    useEffect(() => {
        getClientTypeList()
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <Col md="5">
                <FormGroup>
                    <Label for="balanceBool">Tipo de Cliente</Label>
                    <InputGroup>
                        <Input
                            type="select"
                            value={clientType}
                            onChange={e => setClientType(e.target.value)}
                        >
                            <option >Seleccione un tipo...</option>
                            {
                                clientTypeList.length > 0 && clientTypeList.map((clientType, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={clientType.id}
                                        >
                                            {clientType.name}
                                        </option>
                                    )
                                })
                            }
                        </Input>
                        <InputGroupAddon addonType="append">
                            <Button
                                id="addClientTypesBtn"
                                color="primary"
                                onClick={() => setModalOpen(true)}
                            >
                                {<i className='fas fa-plus'></i>}
                            </Button>
                            <Tooltip placement="top" isOpen={tooltipOpen} target="addClientTypesBtn" toggle={() => setTooltipOpen(!tooltipOpen)}>
                                Agregar más tipos
                            </Tooltip>
                        </InputGroupAddon>
                    </InputGroup>
                </FormGroup>
            </Col>
            <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
                <ModalHeader>
                    <h3>Agregar Tipo de Cliente</h3>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="clientTypeName">Nombre del tipo</Label>
                        <Input
                            type="text"
                            id="clientTypeName"
                            name="clientTypeName"
                            onChange={e => setClientTypeName(e.target.value)}
                            value={clientTypeName}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="clientTypeDescription">Descripción del tipo</Label>
                        <Input
                            type="textarea"
                            id="clientTypeDescription"
                            name="clientTypeDescription"
                            onChange={e => setClientTypeDescription(e.target.value)}
                            value={clientTypeDescription}
                        />
                    </FormGroup>

                    <Button
                        color="primary"
                        onClick={() => createClientType()}
                    >
                        Crear tipo de cliente
                    </Button>
                </ModalBody>
            </Modal>
        </>
    );
}

export default ClientTypeInput