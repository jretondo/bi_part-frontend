import API_ROUTES from '../../../../api/routes';
import ActionsBackend from 'context/actionsBackend';
import AlertsContext from 'context/alerts';
import React, { useContext, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';

const CertRequestForm = ({
    setIsOpenCertRequest
}) => {
    const [documentNumber, setDocumentNumber] = useState("")
    const [businessName, setBusinessName] = useState("")
    const [certificateName, setCertificateName] = useState("")

    const { newAlert } = useContext(AlertsContext)
    const { axiosPostFile } = useContext(ActionsBackend)

    const generateCSR = async () => {
        const dataPost = {
            cuit: documentNumber,
            businessName: businessName,
            certificateName: certificateName
        }
        const response = await axiosPostFile(API_ROUTES.certificatesDir.sub.csr, dataPost, "application/x-gzip")
        if (!response.error) {
            resetForm()
            newAlert("success", "Archivo generado con éxito!", "Descomprima el archivo para encontrar el .csr y el .key")
        } else {
            newAlert("danger", "Hubo un error!", "Revise los datos colocados. Error: " + response.errorMsg)
        }
    }

    const resetForm = () => {
        setBusinessName("")
        setDocumentNumber("")
        setCertificateName("")
    }


    return (<>
        <Card>
            <CardHeader>
                <Row>
                    <Col md="10">
                        <h2>Generar CSR (Solicitud de certificado y llave privada)</h2>
                    </Col>
                    <Col md="2" style={{ textAlign: "right" }}>
                        <button
                            className="btn btn-danger"
                            onClick={e => {
                                e.preventDefault();
                                setIsOpenCertRequest(false);
                            }}
                        >X</button>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <Form onSubmit={e => {
                    e.preventDefault();
                    generateCSR();
                }} >
                    <Row>
                        <Col md="3">
                            <FormGroup>
                                <Label for="cuitTxt">CUIT</Label>
                                <Input
                                    type="number"
                                    id="cuitTxt"
                                    placeholder="CUIT..."
                                    value={documentNumber}
                                    onChange={e => setDocumentNumber(e.target.value)}
                                    required />
                            </FormGroup>
                        </Col>
                        <Col md="5">
                            <FormGroup>
                                <Label for="businessNameTxt">Razón Social</Label>
                                <Input
                                    type="text"
                                    id="businessNameTxt"
                                    placeholder="Razón Social..."
                                    value={businessName}
                                    onChange={e => setBusinessName(e.target.value)}
                                    required />
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <FormGroup>
                                <Label for="certNameTxt">Nombre del Certificado</Label>
                                <Input
                                    type="text"
                                    id="certNameTxt"
                                    placeholder="Nombre del certificado..."
                                    value={certificateName}
                                    onChange={e => setCertificateName(e.target.value)}
                                    required />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12" style={{ textAlign: "center" }}>
                            <button
                                className="btn btn-primary"
                                style={{ width: "150px", margin: "20px" }}
                                type="submit"
                            >
                                Generar CSR
                            </button>
                            <button
                                className="btn btn-danger"
                                style={{ width: "150px", margin: "20px" }}
                                onClick={e => {
                                    e.preventDefault();
                                    setIsOpenCertRequest(false);
                                }}
                            >
                                Cancelar
                            </button>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card>
    </>)
}

export default CertRequestForm