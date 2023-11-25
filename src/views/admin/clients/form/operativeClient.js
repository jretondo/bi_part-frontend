import API_ROUTES from '../../../../api/routes';
import ActionsBackend from 'context/actionsBackend';
import AlertsContext from 'context/alerts';
import { verifyDocumentNumber } from 'function/verifyDocumentNumber';
import React, { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    Label,
    Row,
    Tooltip
} from 'reactstrap';
import 'react-quill/dist/quill.snow.css';
import InputSearch from '../../../../components/Search/InputSearch';

const OperativeClientsForm = ({
    setIsLoading,
    commercialClientInfo,
    operativeClientInfo,
    setIsOpenClientForm
}) => {

    const [documentNumber, setDocumentNumber] = useState(operativeClientInfo ? operativeClientInfo.document_number : "")
    const [isDocumentValid, setIsDocumentValid] = useState(operativeClientInfo ? true : false)
    const [businessName, setBusinessName] = useState(operativeClientInfo ? operativeClientInfo.business_name : "")
    const [email, setEmail] = useState(operativeClientInfo ? operativeClientInfo.email : "")
    const [ivaConditionId, setIvaConditionId] = useState(operativeClientInfo ? operativeClientInfo.iva_condition_id : 30)
    const [direction, setDirection] = useState(operativeClientInfo ? operativeClientInfo.direction : "")
    const [phone, setPhone] = useState(operativeClientInfo ? operativeClientInfo.phone : "")
    const [activity, setActivity] = useState(operativeClientInfo ? operativeClientInfo.activity_description : "")
    const [city, setCity] = useState(operativeClientInfo ? operativeClientInfo.city : "")
    const [dataInfoToolTip, setDataInfoToolTip] = useState(false)
    const [isMono, setIsMono] = useState(false)
    const [isLegalPerson, setIsLegalPerson] = useState(operativeClientInfo ? operativeClientInfo.is_legal_person : false)
    const [hasSocialSecurity, setHasSocialSecurity] = useState(operativeClientInfo ? operativeClientInfo.social_security : false)
    const [balance, setBalance] = useState(operativeClientInfo ? operativeClientInfo.balance : false)
    const [userSeller, setUserSeller] = useState(operativeClientInfo.Admin ? operativeClientInfo.Admin : "")
    const [userList, setUserList] = useState([])

    const [observations, setObservations] = useState(operativeClientInfo ? operativeClientInfo.observations : "")

    const { newAlert, newActivity } = useContext(AlertsContext)
    const { axiosGetQuery, loadingActions, axiosQueryFile, axiosPost } = useContext(ActionsBackend)

    const newClientPost = async () => {
        const dataPost = {
            document_type: 80,
            document_number: documentNumber,
            business_name: businessName,
            fantasie_name: businessName,
            email: email,
            iva_condition_id: ivaConditionId,
            direction: direction,
            phone: phone,
            city: city,
            activity_description: activity,
            is_legal_person: isLegalPerson,
            social_security: hasSocialSecurity,
            balance: balance,
            observations: observations,
            commercial_client_id: commercialClientInfo.id,
            is_mono: isMono,
            user_id: userSeller.id
        }
        operativeClientInfo && (dataPost.id = operativeClientInfo.id)
        const response = await axiosPost(API_ROUTES.operativeClientsDir.operativeClients, dataPost)
        if (!response.error) {
            newAlert("success", "Registrado con éxito!", "Cliente registrado éxitosamente!")
            newActivity("Ha registrado al cliente: " + businessName + " (" + documentNumber + ")")
            setIsOpenClientForm(false)
        } else {
            newAlert("danger", "Hubo un error!", "Controle que todos los datos sean los correctos!. Error: " + response.errorMsg)
        }
    }

    const downloadTaxProof = async () => {
        const dataPost = [
            { documentNumber },
            { isMono }
        ]
        const response = await axiosQueryFile(API_ROUTES.commercialClientsDir.sub.dataTaxProof, dataPost, "application/pdf")
        if (!response.error) {
            newAlert("success", "Archivo descargado con éxito!", "En el PDF se encuentra la constancia de inscripción del contribuyente.")
        } else {
            newAlert("danger", "Hubo un error!", "Posiblemente no tenga un certificado activo o los permisos en AFIP para acceder al padrón. Error: " + response.errorMsg)
        }
    }

    const getClientDataTax = async (e) => {
        const documentVerify = verifyDocumentNumber(e.target.value)
        if (documentVerify.isValid) {
            setIsDocumentValid(true)
            const response = await axiosGetQuery(API_ROUTES.commercialClientsDir.sub.dataTax, [{ documentNumber: documentNumber }])
            try {

                const personType = response.data.data.datosGenerales.tipoPersona
                if (personType === "FISICA") {
                    setBusinessName(response.data.data.datosGenerales.apellido + " " + response.data.data.datosGenerales.nombre)
                    setIsLegalPerson(false)
                } else {
                    setBusinessName(response.data.data.datosGenerales.razonSocial)
                    setIsLegalPerson(true)
                }
                setCity(response.data.data.datosGenerales.domicilioFiscal.descripcionProvincia)
                setDirection(response.data.data.datosGenerales.domicilioFiscal.direccion)
                if (response.data.data.datosMonotributo) {
                    setIvaConditionId(20)
                    setActivity(response.data.data.datosMonotributo.actividadMonotributista.descripcionActividad)
                    setIsMono(true)
                } else {
                    setIsMono(false)
                    const taxes = response.data.data.datosRegimenGeneral.impuesto
                    // eslint-disable-next-line 
                    taxes.map(item => {
                        switch (item.idImpuesto) {
                            case 30:
                                setIvaConditionId(item.idImpuesto)
                                break;
                            case 32:
                                setIvaConditionId(item.idImpuesto)
                                break;
                            case 20:
                                setIvaConditionId(item.idImpuesto)
                                break;
                            case 33:
                                setIvaConditionId(item.idImpuesto)
                                break;
                            case 34:
                                setIvaConditionId(item.idImpuesto)
                                break;
                            default:
                                break;
                        }
                    })
                    setActivity(response.data.data.datosRegimenGeneral.actividad[0].descripcionActividad)
                }
            } catch (error) {
            }
        } else {
            setIsDocumentValid(false)
        }
    }

    const getUserList = async () => {
        const response = await axiosGetQuery(API_ROUTES.usersDir.users, [])
        if (!response.error) {
            setUserList(response.data.items)
        } else {
            newAlert("danger", "Hubo un error!", "Error: " + response.errorMsg)
        }
    }

    const clientSearchFn = (user, searchedText) => {
        if ((`${user.name} ${user.lastname}`).toLowerCase().includes(searchedText.toLowerCase())) {
            return user
        }
    }

    useEffect(() => {
        setIsLoading(loadingActions)
    }, [loadingActions, setIsLoading])

    useEffect(() => {
        getUserList()
        // eslint-disable-next-line
    }, [])

    return (<>
        <Card>
            <CardHeader>
                <Row>
                    <Col md="10">
                        <h2>{operativeClientInfo ? `Modificar cliente operativo ${operativeClientInfo.business_name} CUIT: ${operativeClientInfo.document_number} del Comercial:` : `Nuevo Cliente Operativo del Cliente Comercial: `}</h2>
                        <h2>{`${commercialClientInfo.business_name} CUIT: ${commercialClientInfo.document_number}`}</h2>
                    </Col>
                    <Col md="2" style={{ textAlign: "right" }}>
                        <button
                            className="btn btn-danger"
                            onClick={e => {
                                e.preventDefault();
                                setIsOpenClientForm(false);
                            }}
                        >X</button>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <Form onSubmit={e => {
                    e.preventDefault();
                    newClientPost();
                }} >
                    <Row>
                        <Col md="3">
                            <FormGroup>
                                <Label for="cuitTxt">CUIT</Label>
                                <InputGroup>
                                    <Input
                                        type="number"
                                        id="cuitTxt"
                                        placeholder="CUIT del cliente..."
                                        value={documentNumber}
                                        onChange={e => setDocumentNumber(e.target.value)}
                                        onBlur={(e) => getClientDataTax(e)}
                                        invalid={!isDocumentValid}
                                        valid={isDocumentValid}
                                        required />

                                    <InputGroupAddon addonType="append">
                                        <Button
                                            style={{ borderRadius: "0.375rem", borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                            id="btnTaxInfo"
                                            color={isDocumentValid ? "success" : "danger"}
                                            onClick={e => {
                                                e.preventDefault()
                                                downloadTaxProof()
                                            }}
                                            disabled={!isDocumentValid}><i className='fas fa-search'></i></Button>
                                    </InputGroupAddon>
                                    <FormFeedback>El CUIT colocado es incorrecto!</FormFeedback>
                                </ InputGroup>
                                <Tooltip placement="top" isOpen={dataInfoToolTip} target="btnTaxInfo" toggle={() => setDataInfoToolTip(!dataInfoToolTip)}>
                                    Ver información completa
                                </Tooltip>
                            </FormGroup>
                        </Col>
                        <Col md="6">
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
                        <Col md="3">
                            <FormGroup>
                                <Label for="fantasieTxt">Condición frente al IVA</Label>
                                <Input
                                    type="select"
                                    id="fantasieTxt"
                                    placeholder="Nombre de fantasía..."
                                    value={ivaConditionId}
                                    onChange={e => setIvaConditionId(e.target.value)}
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
                                    placeholder="Actividad principal..."
                                    value={activity}
                                    onChange={e => setActivity(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <FormGroup>
                                <Label for="personTypeSelect">Tipo de persona</Label>
                                <Input id="personTypeSelect" type="select" value={isLegalPerson} onChange={e => setIsLegalPerson(e.target.value)}>
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
                                    placeholder="Dirección del cliente..."
                                    value={direction}
                                    onChange={e => setDirection(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <FormGroup>
                                <Label for="cityTxt">Localidad</Label>
                                <Input
                                    type="text"
                                    id="cityTxt"
                                    placeholder="Localidad del cliente..."
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="8">
                            <FormGroup>
                                <Label for="emailTxt">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="emailTxt"
                                    placeholder="Email del cliente..."
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <FormGroup>
                                <Label for="phoneTxt">Telefóno</Label>
                                <Input
                                    type="text"
                                    name="phone"
                                    id="phoneTxt"
                                    placeholder="Telefóno del cliente..."
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3">
                            <FormGroup>
                                <Label for="socialSecurity">Presenta 931</Label>
                                <Input id="socialSecurity" type="select" value={hasSocialSecurity} onChange={e => setHasSocialSecurity(e.target.value)}>
                                    <option value={false}>No</option>
                                    <option value={true}>Si</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <FormGroup>
                                <Label for="balanceBool">Presenta Balance</Label>
                                <Input id="balanceBool" type="select" value={balance} onChange={e => setBalance(e.target.value)}>
                                    <option value={false}>No</option>
                                    <option value={true}>Si</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <InputSearch
                                itemsList={userList}
                                itemSelected={userSeller}
                                title={"Usuario a comisionar"}
                                placeholderInput={"Busque un usuario..."}
                                getNameFn={(user) => `${user.name} ${user.lastname}`}
                                setItemSelected={setUserSeller}
                                searchFn={clientSearchFn}
                            />
                        </Col>
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
                                    value={observations}
                                    onChange={setObservations}
                                    modules={{
                                        toolbar: ['bold', 'italic', 'underline']
                                    }}
                                    style={{ height: "250px", background: "#e8eaed" }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col md="12" style={{ textAlign: "center" }}>
                            <button
                                className="btn btn-primary"
                                style={{ width: "150px", margin: "20px" }}
                                type="submit"
                            >
                                {operativeClientInfo ? "Modificar" : "Agregar"}
                            </button>
                            <button
                                className="btn btn-danger"
                                style={{ width: "150px", margin: "20px" }}
                                onClick={e => {
                                    e.preventDefault();
                                    setIsOpenClientForm(false);
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

export default OperativeClientsForm