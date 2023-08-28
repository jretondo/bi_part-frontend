import API_ROUTES from '../../../../api/routes';
import ActionsBackend from 'context/actionsBackend';
import AlertsContext from 'context/alerts';
import React, { useContext, useEffect, useState } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import swal from 'sweetalert';

const ClientRow = ({
    id,
    client,
    first,
    page,
    setClientInfo,
    setIsOpenClientForm,
    setPage,
    refreshToggle
}) => {
    const [ivaConditionStr, setIvaConditionStr] = useState("")
    const { newAlert, newActivity } = useContext(AlertsContext)
    const { axiosDelete, loadingActions } = useContext(ActionsBackend)

    const deleteUser = async (e, id, clientInfo, first, page) => {
        e.preventDefault()
        swal({
            title: "Eliminar al cliente " + clientInfo + "!",
            text: "¿Está seguro de eliminar a este cliente? Esta desición es permanente.",
            icon: "warning",
            buttons: {
                cancel: "No",
                Si: true
            },
            dangerMode: true,
        })
            .then(async (willDelete) => {
                let backPage = false
                if (willDelete) {
                    const response = await axiosDelete(API_ROUTES.clientsDir.clients, id)
                    if (!response.error) {
                        if (first) {
                            if (page > 1) {
                                backPage = true
                            }
                        }
                        newActivity(`Se ha eliminado al cliente ${clientInfo})`)
                        newAlert("success", "Cliente eliminado con éxito!", "")
                        if (backPage) {
                            setPage(parseInt(page - 1))
                        } else {
                            refreshToggle()
                        }
                    } else {
                        newAlert("danger", "Hubo un error!", "Intentelo nuevamente. Error: " + response.errorMsg)
                    }
                }
            });
    }

    const details = (e, client) => {
        e.preventDefault()
        setClientInfo(client)
        setIsOpenClientForm(true)
    }

    useEffect(() => {
        switch (client.iva_condition_id) {
            case 30:
                setIvaConditionStr("IVA Responsable Inscripto")
                break;
            case 32:
                setIvaConditionStr("IVA Sujeto Exento")
                break;
            case 20:
                setIvaConditionStr("Responsable Monotributo")
                break;
            case 33:
                setIvaConditionStr("IVA Responsable No Inscripto")
                break;
            case 34:
                setIvaConditionStr("IVA No Alcanzado")
                break;
            default:
                break;
        }
    }, [client.iva_condition_id])

    return (
        <tr key={id} className={loadingActions ? "shimmer" : ""} >
            <td style={{ textAlign: "center" }}>
                {client.business_name}
            </td>
            <td style={{ textAlign: "center" }}>
                {client.document_number}
            </td>
            <td style={{ textAlign: "center" }}>
                {client.email}
            </td>
            <td style={{ textAlign: "center" }}>
                {ivaConditionStr}
            </td>
            <td className="text-right">
                <UncontrolledDropdown>
                    <DropdownToggle
                        className="btn-icon-only text-light"
                        href="#pablo"
                        role="button"
                        size="sm"
                        color=""
                        onClick={e => e.preventDefault()}
                    >
                        <i className="fas fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                        <DropdownItem
                            href="#pablo"
                            onClick={e => details(e, client)}
                        >
                            <i className="fas fa-edit"></i>
                            Editar
                        </DropdownItem>
                        <DropdownItem
                            href="#pablo"
                            onClick={e => deleteUser(e, client.id, client.business_name + " CUIT: " + client.document_number, first, page)}
                        >
                            <i className="fas fa-trash-alt"></i>
                            Eliminar
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </td>
        </tr>
    )
}

export default ClientRow