import API_ROUTES from '../../../../../api/routes';
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
import InputSearch from '../../../../../components/Search/InputSearch';
import TeamInput from './components/team';
import MonotributistaInput from './components/monotributista';
import GrossIncomeInput from './components/grossIncome';
import ServiceTypeInput from './components/serviceType';
import ClientTypeInput from './components/clientType';

const OperativeClientsForm = ({
    setIsLoading,
    commercialClientInfo,
    operativeClientInfo,
    setIsOpenClientForm
}) => {

    const [documentNumber, setDocumentNumber] = useState(operativeClientInfo ? operativeClientInfo.document_number : "")
    const [isDocumentValid, setIsDocumentValid] = useState(operativeClientInfo ? true : false)
    const [businessName, setBusinessName] = useState(operativeClientInfo ? operativeClientInfo.business_name : "")
    const [ivaConditionId, setIvaConditionId] = useState(operativeClientInfo ? operativeClientInfo.iva_condition_id : 30)
    const [direction, setDirection] = useState(operativeClientInfo ? operativeClientInfo.direction : "")
    const [activity, setActivity] = useState(operativeClientInfo ? operativeClientInfo.activity_description : "")
    const [city, setCity] = useState(operativeClientInfo ? operativeClientInfo.city : "")
    const [dataInfoToolTip, setDataInfoToolTip] = useState(false)
    const [isMono, setIsMono] = useState(false)
    const [isLegalPerson, setIsLegalPerson] = useState(operativeClientInfo ? operativeClientInfo.is_legal_person : false)
    const [physicalPerson, setPhysicalPerson] = useState(operativeClientInfo ? operativeClientInfo.physical_person : false)
    const [teamId, setTeamId] = useState(operativeClientInfo ? operativeClientInfo.team_id : "")
    const [bornDate, setBornDate] = useState(operativeClientInfo ? operativeClientInfo.born_date : "")
    const [clientType, setClientType] = useState(operativeClientInfo ? operativeClientInfo.client_type_id : 0)

    const [socialSecurity, setSocialSecurity] = useState({
        socialSecurity: operativeClientInfo ? operativeClientInfo.social_security : false,
        hasSocialSecurity: operativeClientInfo.social_security ? true : false,
        socialSecurityRank: operativeClientInfo ? operativeClientInfo.social_security_rank : 0,
    })
    const [socialSecurityRankingList, setSocialSecurityRankingList] = useState([])

    const [grossIncome, setGrossIncome] = useState({
        grossIncomeId: operativeClientInfo ? operativeClientInfo.gross_income_id : false,
        hasGrossIncome: operativeClientInfo ? operativeClientInfo.gross_income_id : false
    })

    const [domesticService, setDomesticService] = useState({
        domesticService: operativeClientInfo ? operativeClientInfo.domestic_service : false,
        hasDomesticService: operativeClientInfo.domestic_service ? true : false
    })

    const [serviceSelected, setServiceSelected] = useState(operativeClientInfo ? operativeClientInfo.service_type_id : false)

    const [monotributoType, setMonotributoType] = useState({
        monotributoTypeId: operativeClientInfo ? operativeClientInfo.monotributo_type_id : false,
        isMonotributo: operativeClientInfo.monotributo_type_id ? true : false
    })

    const [vatRanking, setVatRanking] = useState(operativeClientInfo ? operativeClientInfo.vat_rank : 0)
    const [vatRankingList, setVatRankingList] = useState([])

    const [balance, setBalance] = useState(operativeClientInfo ? operativeClientInfo.balance : false)
    const [userSeller, setUserSeller] = useState(operativeClientInfo.Admin ? operativeClientInfo.Admin : "")
    const [userList, setUserList] = useState([])

    const [observations, setObservations] = useState(operativeClientInfo ? operativeClientInfo.observations : "")

    const { newAlert, newActivity } = useContext(AlertsContext)
    const { axiosGetQuery, loadingActions, axiosQueryFile, axiosPost } = useContext(ActionsBackend)

    const newClientPost = async () => {
        if (!clientType) {
            newAlert("danger", "Hubo un error!", "Debe seleccionar un tipo de cliente!")
            return
        }
        if (!serviceSelected) {
            newAlert("danger", "Hubo un error!", "Debe seleccionar un tipo de servicio!")
            return
        }
        if (!userSeller) {
            newAlert("danger", "Hubo un error!", "Debe seleccionar un responsable operativo!")
            return
        }
        if (!teamId) {
            newAlert("danger", "Hubo un error!", "Debe seleccionar un equipo!")
            return
        }
        const dataPost = {
            commercial_client_id: commercialClientInfo.id,
            document_type: 80,
            document_number: documentNumber,
            business_name: businessName,
            fantasie_name: businessName,
            email: "",
            iva_condition_id: ivaConditionId,
            direction: direction,
            phone: "",
            city: city,
            is_legal_person: isLegalPerson,
            born_date: bornDate,
            client_type_id: clientType,
            activity_description: activity,
            monotributo_type_id: monotributoType.isMonotributo ? monotributoType.monotributoTypeId : null,
            balance: balance,
            physical_person: physicalPerson,
            social_security: socialSecurity.hasSocialSecurity ? socialSecurity.socialSecurity : null,
            social_security_rank: socialSecurity.socialSecurityRank,
            gross_income_id: grossIncome.hasGrossIncome ? grossIncome.grossIncomeId : null,
            vat_rank: vatRanking,
            domestic_service: domesticService.hasDomesticService ? domesticService.domesticService : null,
            service_type_id: serviceSelected,
            user_id: userSeller.id,
            team_id: teamId,
            observations: observations
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
            const lastDigit = parseInt(e.target.value.slice(-1))
            const vatRanking = vatRankingList.find(item => item.digit === lastDigit)
            const socialSecurityFind = socialSecurityRankingList.find(item => item.digit === lastDigit)

            setVatRanking(vatRanking ? vatRanking.rank : 0)
            setSocialSecurity({
                ...socialSecurity,
                socialSecurityRank: socialSecurityFind ? socialSecurityFind.rank : 0
            })
            setIsDocumentValid(true)
            const response = await axiosGetQuery(API_ROUTES.commercialClientsDir.sub.dataTax, [{ documentNumber: documentNumber }])
            try {

                const personType = response.data.data.datosGenerales.tipoPersona
                if (personType === "FISICA") {
                    setBusinessName(response.data.data.datosGenerales.apellido + " " + response.data.data.datosGenerales.nombre)
                    setIsLegalPerson(false)
                } else {
                    const fecha = (response.data.data.datosGenerales.fechaContratoSocial).toString().slice(0, 10)
                    try {
                        setBornDate(fecha)
                    } catch (error) {
                    }
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

    const getVatRankingList = async () => {
        const response = await axiosGetQuery(API_ROUTES.vatRankingDir.vatRanking, [])
        if (!response.error) {
            setVatRankingList(response.data)
        } else {
            newAlert("danger", "Hubo un error!", "Error: " + response.errorMsg)
        }
    }

    const getSocialSecurityRankingList = async () => {
        const response = await axiosGetQuery(API_ROUTES.socialSecurityDir.socialSecurity, [])
        if (!response.error) {
            setSocialSecurityRankingList(response.data)
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
        getVatRankingList()
        getSocialSecurityRankingList()
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
                        <Col md="4">
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
                        <Col md="8">
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
                    </Row>
                    <Row>
                        <Col md="4">
                            <FormGroup>
                                <Label for="personTypeSelect">Tipo de persona</Label>
                                <Input id="personTypeSelect" type="select" value={isLegalPerson} onChange={e => setIsLegalPerson(e.target.value)}>
                                    <option value={false}>Física</option>
                                    <option value={true}>Juridica</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <FormGroup>
                                <Label for="businessNameTxt">{isLegalPerson ? "Fecha Contrato Social" : "Fecha Nacimieno"}</Label>
                                <Input
                                    type="date"
                                    id="bornDateTxt"
                                    placeholder="Fecha..."
                                    value={bornDate}
                                    onChange={e => setBornDate(e.target.value)}
                                    required />
                            </FormGroup>
                        </Col>
                        <ClientTypeInput
                            clientType={clientType}
                            setClientType={setClientType}
                        />
                    </Row>
                    <Row>
                        <Col md="4">
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
                        <MonotributistaInput
                            monotributoType={monotributoType}
                            setMonotributoType={setMonotributoType}
                        />
                        <Col md="2">
                            <FormGroup>
                                <Label for="balanceBool">Presenta Balance</Label>
                                <Input id="balanceBool" type="select" value={balance} onChange={e => setBalance(e.target.value)}>
                                    <option value={false}>No</option>
                                    <option value={true}>Si</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md="2">
                            <FormGroup>
                                <Label for="balanceBool">Presenta Persona Fisica</Label>
                                <Input id="balanceBool" type="select" value={physicalPerson} onChange={e => setPhysicalPerson(e.target.value)}>
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
                                    <InputGroupAddon addonType="prepend">
                                        <Button
                                            color={socialSecurity.hasSocialSecurity ? "success" : "danger"}
                                            onClick={() =>
                                                setSocialSecurity({
                                                    ...socialSecurity,
                                                    hasSocialSecurity: !socialSecurity.hasSocialSecurity
                                                })}
                                        >{socialSecurity.hasSocialSecurity ? "Si" : "No"}
                                        </Button></InputGroupAddon>
                                    <Input
                                        style={{ paddingLeft: "10px", paddingRight: "10px", border: "1px solid" }}
                                        type="number"
                                        name="socialSecurityRank"
                                        id="socialSecurityRankTxt"
                                        placeholder="Nomina 931..."
                                        disabled={!socialSecurity.hasSocialSecurity}
                                        onChange={e => setSocialSecurity({ ...socialSecurity, socialSecurity: e.target.value })}
                                        value={socialSecurity.socialSecurity}
                                    />
                                    <Input
                                        style={{ paddingLeft: "10px", paddingRight: "10px", border: "1px solid" }}
                                        type="number"
                                        name="socialSecurityRank"
                                        id="socialSecurityRankTxt"
                                        placeholder="Ranking 931..."
                                        value={socialSecurity.socialSecurityRank}
                                        disabled
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <GrossIncomeInput
                            grossIncome={grossIncome}
                            setGrossIncome={setGrossIncome}
                        />
                        <Col md="4">
                            <FormGroup>
                                <Label for="balanceBool">Ranking IVA</Label>
                                <InputGroup>
                                    <Input
                                        style={{ paddingLeft: "10px", paddingRight: "10px", border: "1px solid" }}
                                        type="number"
                                        name="socialSecurityRank"
                                        id="socialSecurityRankTxt"
                                        placeholder="Ranking IVA..."
                                        value={vatRanking}
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
                                    <InputGroupAddon addonType="prepend">
                                        <Button
                                            color={domesticService.hasDomesticService ? "success" : "danger"}
                                            onClick={() =>
                                                setDomesticService({
                                                    ...domesticService,
                                                    hasDomesticService: !domesticService.hasDomesticService
                                                })}
                                        >{domesticService.hasDomesticService ? "Si" : "No"}
                                        </Button></InputGroupAddon>
                                    <Input
                                        style={{ paddingLeft: "10px", paddingRight: "10px", border: "1px solid" }}
                                        type="number"
                                        name="socialSecurityRank"
                                        id="socialSecurityRankTxt"
                                        placeholder="Nomina Servicio Domestico.."
                                        disabled={!domesticService.hasDomesticService}
                                        onChange={e => setDomesticService({ ...domesticService, domesticService: e.target.value })}
                                        value={domesticService.domesticService}
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <ServiceTypeInput
                            serviceSelected={serviceSelected}
                            setServiceSelected={setServiceSelected}
                        />
                        <Col md="3">
                            <InputSearch
                                itemsList={userList}
                                itemSelected={userSeller}
                                title={"Responsable Operativo"}
                                placeholderInput={"Busque un usuario..."}
                                getNameFn={(user) => `${user.name} ${user.lastname}`}
                                setItemSelected={setUserSeller}
                                searchFn={clientSearchFn}
                            />
                        </Col>
                        <TeamInput
                            teamId={teamId}
                            setTeamId={setTeamId}
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