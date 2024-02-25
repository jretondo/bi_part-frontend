import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { Button, Card, CardBody, Col, FormGroup, Input, InputGroup, Label, Row, Tooltip } from 'reactstrap';
import TeamInput from '../form/operativeClient/components/team';

const ClientDetails = ({ bgColor, width, client, isCommercialClient }) => {
    const [seeDetails, setSeeDetails] = useState(false)
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);
    return (<>
        <Card style={{ backgroundColor: bgColor, border: "5px solid #073863", width: width, marginLeft: "auto" }}>
            {
                isCommercialClient &&
                <Row>
                    <Col md="12" style={{ textAlign: "right" }}>
                        <Button
                            color="info"
                            id={"seeMoreInfoBtn_" + client.id + (isCommercialClient ? "_commercial" : "")}
                            onClick={() => setSeeDetails(!seeDetails)}
                        >
                            {
                                seeDetails ?
                                    <i className='fa fa-minus'></i>
                                    :
                                    <i className='fa fa-info'></i>
                            }
                        </Button>
                        <Tooltip placement="right" isOpen={tooltipOpen} target={"seeMoreInfoBtn_" + client.id + (isCommercialClient ? "_commercial" : "")} toggle={toggle}>
                            {
                                seeDetails ?
                                    "Ocultar detalles"
                                    :
                                    "Ver detalles"
                            }
                        </Tooltip>
                    </Col>
                </Row>
            }

            {
                seeDetails && isCommercialClient ?
                    <>
                        <CardBody>
                            <Row>
                                <Col md="3">
                                    <FormGroup>
                                        <Label for="cuitTxt">CUIT</Label>
                                        <Input
                                            id="cuitTxt"
                                            value={client.document_number}
                                            disabled
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="businessNameTxt">Razón Social</Label>
                                        <Input
                                            type="text"
                                            id="businessNameTxt"
                                            value={client.business_name}
                                            disabled />
                                    </FormGroup>
                                </Col>
                                <Col md="3">
                                    <FormGroup>
                                        <Label for="fantasieTxt">Condición frente al IVA</Label>
                                        <Input
                                            type="select"
                                            id="fantasieTxt"
                                            value={client.iva_condition_id}
                                            disabled
                                        >
                                            <option value={30}>IVA Responsable Inscripto</option>
                                            <option value={32}>IVA Sujeto Exento</option>
                                            <option value={20}>Responsable Monotributo</option>
                                            <option value={33}>IVA Responsable No Inscripto</option>
                                            <option value={34}>IVA No Alcanzado</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="8">
                                    <FormGroup>
                                        <Label for="fantasieTxt">Actividad</Label>
                                        <Input
                                            type="text"
                                            id="activityTxt"
                                            value={client.activity_description}
                                            disabled
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label for="personTypeSelect">Tipo de persona</Label>
                                        <Input id="personTypeSelect"
                                            type="select"
                                            value={client.is_legal_person}
                                            disabled>
                                            <option value={false}>Física</option>
                                            <option value={true}>Juridica</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="8">
                                    <FormGroup>
                                        <Label for="directionTxt">Dirección</Label>
                                        <Input
                                            type="text"
                                            id="directionTxt"
                                            value={client.direction}
                                            disabled
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label for="cityTxt">Localidad</Label>
                                        <Input
                                            type="text"
                                            id="cityTxt"
                                            value={client.city}
                                            disabled
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="4">
                                    <FormGroup>
                                        <Label for="emailTxt">Email</Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            id="emailTxt"
                                            value={client.email}
                                            disabled
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="3">
                                    <FormGroup>
                                        <Label for="phoneTxt">Telefóno</Label>
                                        <Input
                                            type="text"
                                            name="phone"
                                            id="phoneTxt"
                                            value={client.phone}
                                            disabled
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="3">
                                    <FormGroup>
                                        <Label for="teamTxt">Equipo</Label>
                                        <Input
                                            id="teamTxt"
                                            type="text"
                                            value={client.team}
                                            disabled />
                                    </FormGroup>
                                </Col>
                                <Col md="2">
                                    <FormGroup>
                                        <Label for="balanceBool">Tipo de Cliente</Label>
                                        <Input id="balanceBool"
                                            type="select"
                                            value={client.type}
                                            disabled
                                        >
                                            <option value={0}>Mensual</option>
                                            <option value={1}>Eventual</option>
                                            <option value={2}>Inactivo</option>
                                            <option value={3}>Consultoria</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <FormGroup >
                                        <Label for="obsTxt">Detalle:</Label>
                                        {client.observations !== "" ?
                                            <div
                                                dangerouslySetInnerHTML={{ __html: client.observations }}
                                            >

                                            </div>
                                            : "Sin detalles"}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardBody>
                    </>
                    :
                    !seeDetails && isCommercialClient ? <></> :
                        <>
                            <CardBody>
                                <Row>
                                    <Col md="4">
                                        <FormGroup>
                                            <Label for="cuitTxt">CUIT</Label>
                                            <InputGroup>
                                                <Input
                                                    type="number"
                                                    value={client.document_number}
                                                    disabled
                                                />
                                            </ InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col md="8">
                                        <FormGroup>
                                            <Label for="businessNameTxt">Razón Social</Label>
                                            <Input
                                                type="text"
                                                value={client.business_name}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="4">
                                        <FormGroup>
                                            <Label for="personTypeSelect">Tipo de persona</Label>
                                            <Input id="personTypeSelect" type="select" value={client.is_legal_person}>
                                                <option value={false}>Física</option>
                                                <option value={true}>Juridica</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md="3">
                                        <FormGroup>
                                            <Label for="businessNameTxt">{client.is_legal_person ? "Fecha Contrato Social" : "Fecha Nacimieno"}</Label>
                                            <Input
                                                type="date"
                                                value={client.born_date}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="5">
                                        <FormGroup>
                                            <Label>Tipo de Cliente</Label>
                                            <Input
                                                value={client.ClientType.name}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="4">
                                        <FormGroup>
                                            <Label for="fantasieTxt">Actividad</Label>
                                            <Input
                                                type="text"
                                                value={client.activity_description}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="4">
                                        <FormGroup>
                                            <Label>Monotributista</Label>
                                            <Input
                                                type="text"
                                                value={client.MonotributoType ? client.MonotributoType.name : "No"}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup>
                                            <Label for="balanceBool">Presenta Balance</Label>
                                            <Input id="balanceBool" type="select" value={client.balance}>
                                                <option value={false}>No</option>
                                                <option value={true}>Si</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup>
                                            <Label for="balanceBool">Presenta Persona Fisica</Label>
                                            <Input id="balanceBool" type="select" value={client.physical_person}>
                                                <option value={false}>No</option>
                                                <option value={true}>Si</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md="4">
                                        <FormGroup>
                                            <Label for="balanceBool">Presenta 931</Label>
                                            <InputGroup>
                                                <Input
                                                    style={{ paddingLeft: "10px", paddingRight: "10px", border: "1px solid" }}
                                                    type="number"
                                                    disabled
                                                    value={client.social_security}
                                                />
                                                <Input
                                                    style={{ paddingLeft: "10px", paddingRight: "10px", border: "1px solid" }}
                                                    type="number"
                                                    value={client.social_security_rank}
                                                    disabled
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col md="4">
                                        <FormGroup>
                                            <Label for="balanceBool">Ingresos Brutos</Label>
                                            <Input
                                                value={client.GrossIncome ? client.GrossIncome.name : "No"}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="4">
                                        <FormGroup>
                                            <Label for="balanceBool">Ranking IVA</Label>
                                            <InputGroup>
                                                <Input
                                                    style={{ paddingLeft: "10px", paddingRight: "10px", border: "1px solid" }}
                                                    type="number"
                                                    value={client.vat_rank}
                                                    disabled
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="3">
                                        <FormGroup>
                                            <Label for="balanceBool">Servicio Domestico</Label>
                                            <InputGroup>
                                                <Input
                                                    style={{ paddingLeft: "10px", paddingRight: "10px", border: "1px solid" }}
                                                    type="number"
                                                    disabled
                                                    value={client.domestic_service ? client.domestic_service : "No"}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label>Tipo de Servicio</Label>
                                            <Input
                                                value={client.ServiceType.name}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="3">
                                        <FormGroup>
                                            <Label>Responsable Operativo</Label>
                                            <Input
                                                value={client.Admin.name + " " + client.Admin.lastname}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <TeamInput
                                        teamId={client.team_id}
                                    />
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <FormGroup >
                                            <Label for="obsTxt">Detalle:</Label>
                                            <ReactQuill
                                                id="obsTxt"
                                                debug='info'
                                                placeholder='Describa el detalle o concepto del cobro...'
                                                theme='snow'
                                                value={client.observations}
                                                modules={{
                                                    toolbar: ['bold', 'italic', 'underline']
                                                }}
                                                style={{ height: "250px", background: "#e8eaed" }}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                        </>
            }

        </Card>
    </>)
}

export default ClientDetails