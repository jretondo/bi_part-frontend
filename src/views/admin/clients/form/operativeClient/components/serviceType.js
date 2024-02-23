import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, FormGroup, Input, InputGroup, InputGroupAddon, Label, Modal, ModalBody, ModalHeader, Tooltip } from 'reactstrap';
import API_ROUTES from '../../../../../../api/routes';
import AlertsContext from '../../../../../../context/alerts';
import ActionsBackend from '../../../../../../context/actionsBackend';

const ServiceTypeInput = ({
    serviceSelected,
    setServiceSelected
}) => {
    const [serviceTypeList, setServiceTypeList] = useState([])
    const [tooltipOpen, setTooltipOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [serviceTypeName, setServiceTypeName] = useState("")
    const [serviceTypeDescription, setServiceTypeDescription] = useState("")

    const { newAlert, newActivity } = useContext(AlertsContext)
    const { axiosGetQuery, axiosPost } = useContext(ActionsBackend)

    const getServiceTypeList = async () => {
        const response = await axiosGetQuery(API_ROUTES.serviceTypeDir.serviceType, [])
        if (!response.error) {
            setServiceTypeList(response.data)
        } else {
            newAlert("danger", "Hubo un error!", "Error: " + response.errorMsg)
        }
    }

    const createServiceType = async () => {
        const response = await axiosPost(API_ROUTES.serviceTypeDir.serviceType, {
            name: serviceTypeName,
            description: serviceTypeDescription
        })
        if (!response.error) {
            newAlert("success", "Equipo creado!", "El equipo ha sido creado con éxito")
            newActivity("El usuario ha creado un nuevo equipo")
            setModalOpen(false)
            getServiceTypeList()
        } else {
            newAlert("danger", "Hubo un error!", "Error: " + response.errorMsg)
        }
    }

    useEffect(() => {
        getServiceTypeList()
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <Col md="3">
                <FormGroup>
                    <Label for="balanceBool">Tipo de Servicio</Label>
                    <InputGroup>
                        <Input
                            type="select"
                            value={serviceSelected}
                            onChange={e => setServiceSelected(e.target.value)}
                        >
                            <option value={false}>Seleccione un servicio...</option>
                            {
                                serviceTypeList.length > 0 && serviceTypeList.map((serviceType, index) => {
                                    return (
                                        <option key={index} value={serviceType.id}>{serviceType.name}</option>
                                    )
                                })
                            }
                        </Input>
                        <InputGroupAddon addonType="append">
                            <Button
                                color="primary"
                                id="addTypeBtn"
                                onClick={() => setModalOpen(!modalOpen)}
                            >
                                {<i className='fas fa-plus'></i>}
                            </Button>
                            <Tooltip placement="top" isOpen={tooltipOpen} target="addTypeBtn" toggle={() => setTooltipOpen(!tooltipOpen)}>
                                Agregar más Tipos de Servicio
                            </Tooltip>
                        </InputGroupAddon>
                    </InputGroup>
                </FormGroup>
            </Col>
            <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
                <ModalHeader>
                    <h3>Agregar equipo</h3>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="serviceTypeName">Nombre del tipo de servicio</Label>
                        <Input
                            type="text"
                            id="serviceTypeName"
                            name="serviceTypeName"
                            onChange={e => setServiceTypeName(e.target.value)}
                            value={serviceTypeName}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="serviceTypeDescription">Descripción del tipo de serv.</Label>
                        <Input
                            type="textarea"
                            id="serviceTypeDescription"
                            name="serviceTypeDescription"
                            onChange={e => setServiceTypeDescription(e.target.value)}
                            value={serviceTypeDescription}
                        />
                    </FormGroup>

                    <Button
                        color="primary"
                        onClick={() => createServiceType()}
                    >
                        Crear tipo de serv.
                    </Button>
                </ModalBody>
            </Modal>
        </>
    );
}

export default ServiceTypeInput