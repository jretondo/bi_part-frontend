import React, { useContext, useState } from 'react';
import { Button, Col, Row, Tooltip } from 'reactstrap';
import './accordion.css';
import swal from 'sweetalert';
import AlertsContext from 'context/alerts';
import ActionsBackend from 'context/actionsBackend';
import API_ROUTES from '../../../api/routes';

const PrincipalButtonAccordion = ({
    id,
    name,
    setActiveId,
    open,
    hasSub,
    openNewForm,
    openUpdate,
    refresh
}) => {
    const [openedButton, setOpenedButton] = useState("")
    const [plusToolTip, setPlusToolTip] = useState(false)
    const [openButtonToolTip, setOpenButtonToolTip] = useState(false)
    const [modifyButtonToolTip, setModifyButtonToolTip] = useState(false)
    const [trashToolTip, setTrashToolTip] = useState(false)

    const { newAlert, newActivity } = useContext(AlertsContext)
    const { axiosDelete } = useContext(ActionsBackend)

    const toggleButton = () => {
        open && setOpenedButton("-close")
        !open && setOpenedButton("-open")
        open && setActiveId((activeIds) => {
            let newArray = []
            // eslint-disable-next-line
            activeIds.map((item) => {
                (item !== id) && newArray.push(item)
            })
            return newArray
        })
        !open && setActiveId((activeIds) => [...activeIds, id])
    }

    const deleteAccount = async () => {
        swal({
            title: "Eliminar el cliente comercial " + name + " y todos los operativos!",
            text: "¿Está seguro de eliminar este cliente? Esta desición es permanente y se eliminarán todas los clientes operativos relacionados.",
            icon: "warning",
            buttons: {
                cancel: "No",
                Si: true
            },
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    const response = await axiosDelete(API_ROUTES.commercialClientsDir.commercialClients, id)
                    if (!response.error) {
                        newActivity(`Se ha eliminado el cliente ${name}) y sus clientes operativos.`)
                        newAlert("success", "Cliente eliminado con éxito!", "")
                        refresh()
                    } else {
                        newAlert("danger", "Hubo un error!", "Intentelo nuevamente. Error: " + response.errorMsg)
                    }
                }
            });
    }

    return (<>
        <Row>
            <Col md="12" className="py-2 px-3" style={{ border: "5px solid #073863", backgroundColor: "#e6e6e6" }}>
                <Row>
                    <Col md={6}>
                        <Row>
                            <h2 className="mt-2 mx-3" style={{ color: "#073863", fontWeight: "bold" }}>{name}</h2>
                        </Row>
                    </Col>
                    <Col md="6" className="text-right">
                        <Button color="primary" id={`plusButton-${id}-principal`} className="" onClick={openNewForm}>
                            <i className="fa fa-plus"></i>
                        </Button>
                        <Tooltip placement="right" isOpen={plusToolTip} target={`plusButton-${id}-principal`} toggle={() => setPlusToolTip(!plusToolTip)}>
                            Agregar un nuevo cliente operativo
                        </Tooltip>
                        <Button color="primary" id={`modifyButton-${id}-principal`} onClick={openUpdate}>
                            <i className="fa fa-edit"></i>
                        </Button>
                        <Tooltip placement="top" isOpen={modifyButtonToolTip} target={`modifyButton-${id}-principal`} toggle={() => setModifyButtonToolTip(!modifyButtonToolTip)}>
                            Modificar
                        </Tooltip>
                        <Button color="primary" id={`trashButton-${id}-principal`} onClick={e => {
                            e.preventDefault()
                            deleteAccount()
                        }}>
                            <i className="fa fa-trash"></i>
                        </Button>
                        <Tooltip placement="top" isOpen={trashToolTip} target={`trashButton-${id}-principal`} toggle={() => setTrashToolTip(!trashToolTip)}>
                            Eliminar cliente comercial y operativos
                        </Tooltip>
                        {
                            hasSub && <>
                                <Button color="primary" onClick={toggleButton} id={`openButton-${id}-principal`} className={`animated-button${openedButton}`}>
                                    <i className={"fa fa-caret-left"} style={{ position: "relative" }}></i>
                                </Button>
                                <Tooltip placement="top" isOpen={openButtonToolTip} target={`openButton-${id}-principal`} toggle={() => setOpenButtonToolTip(!openButtonToolTip)}>
                                    {openedButton === "-close" ? "Ver detalles y operativos" : "Cerrar"}
                                </Tooltip>
                            </>
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
    </>)
}

export default PrincipalButtonAccordion