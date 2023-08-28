import API_ROUTES from '../../../../api/routes';
import ActionsBackend from 'context/actionsBackend';
import AlertsContext from 'context/alerts';
import React, { useContext } from 'react';
import { Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import swal from 'sweetalert';

const CertificateRow = ({
    id,
    certificate,
    first,
    page,
    setCertificateInfo,
    setIsOpenCertificateForm,
    setPage,
    refreshToggle
}) => {

    const { newAlert, newActivity } = useContext(AlertsContext)
    const { axiosDelete, loadingActions, axiosPut, axiosGetFile } = useContext(ActionsBackend)

    const deleteUser = async (e, id, certificateInfo, first, page) => {
        e.preventDefault()
        swal({
            title: "Eliminar el certificado " + certificateInfo + "!",
            text: "¿Está seguro de eliminar a este certificado? Esta desición es permanente.",
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
                    const response = await axiosDelete(API_ROUTES.certificatesDir.certificates, id)
                    if (!response.error) {
                        if (first) {
                            if (page > 1) {
                                backPage = true
                            }
                        }
                        newActivity(`Se ha eliminado el certificado ${certificateInfo})`)
                        newAlert("success", "Certificado eliminado con éxito!", "")
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
        setCertificateInfo(client)
        setIsOpenCertificateForm(true)
    }

    const changeStateCert = async (id, enabled) => {
        const data = {
            id: id,
            field: {
                enabled: !enabled
            }
        }
        const response = await axiosPut(API_ROUTES.certificatesDir.certificates, data)
        if (!response.error) {
            refreshToggle()
        } else {
            newAlert("danger", "Hubo un error!", "Intentelo nuevamente. Error: " + response.errorMsg)
        }
    }

    const downloadCertificate = async (e, id) => {
        e.preventDefault()
        const response = await axiosGetFile(API_ROUTES.certificatesDir.sub.crtKey, id, "application/x-gzip")
        if (!response.error) {
            newAlert("success", "Archivo descargado con éxito!", "Descomprima el archivo para encontrar el .crt y el .key")
        } else {
            newAlert("danger", "Hubo un error!", "Revise los datos colocados. Error: " + response.errorMsg)
        }
    }

    return (
        <tr key={id} className={loadingActions ? "shimmer" : ""} >
            <td style={{ textAlign: "center" }}>
                {certificate.id}
            </td>
            <td style={{ textAlign: "center" }}>
                {certificate.crt_name}
            </td>
            <td style={{ textAlign: "center" }}>
                {certificate.business_name}
            </td>
            <td style={{ textAlign: "center" }}>
                {certificate.document_number}
            </td>
            <td style={{ textAlign: "center" }}>
                <Button
                    color={certificate.enabled ? "success" : "gray"}
                    onClick={e => {
                        e.preventDefault()
                        changeStateCert(certificate.id, certificate.enabled)
                    }}
                >
                    {certificate.enabled ? "Activo" : "Deshabilitado"}
                </Button>
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
                            onClick={e => downloadCertificate(e, certificate.id)}
                        >
                            <i className="fas fa-download"></i>
                            Descargar .crt y .key
                        </DropdownItem>
                        <DropdownItem
                            href="#pablo"
                            onClick={e => details(e, certificate)}
                        >
                            <i className="fas fa-edit"></i>
                            Editar
                        </DropdownItem>
                        <DropdownItem
                            href="#pablo"
                            onClick={e => deleteUser(e, certificate.id, certificate.crt_name + " de ID: " + certificate.id, first, page)}
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

export default CertificateRow