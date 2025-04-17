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
  Tooltip,
} from 'reactstrap';
import 'react-quill/dist/quill.snow.css';
import TeamInput from './components/team';
import ClientTypeInput from './components/clientType';
import PymeProductInput from './components/pymeComponent';
import DivisionInput from './components/division';
import {
  domesticRankingsCalc,
  ivaRankingsCalc,
  socialSecurityRankingsCalc,
} from '../../../../../function/rankingsCalc';
import MonotributistaInput from './components/monotributista';
import GrossIncomeInput from './components/grossIncome';
import InputSearch from '../../../../../components/Search/InputSearch';

const OperativeClientsForm = ({
  setIsLoading,
  commercialClientInfo,
  operativeClientInfo,
  setIsOpenClientForm,
}) => {
  const [documentNumber, setDocumentNumber] = useState(
    operativeClientInfo ? operativeClientInfo.document_number : '',
  );
  const [isDocumentValid, setIsDocumentValid] = useState(
    operativeClientInfo ? true : false,
  );
  const [businessName, setBusinessName] = useState(
    operativeClientInfo ? operativeClientInfo.business_name : '',
  );
  const [ivaConditionId, setIvaConditionId] = useState(
    operativeClientInfo ? operativeClientInfo.iva_condition_id : 30,
  );
  const [direction, setDirection] = useState(
    operativeClientInfo ? operativeClientInfo.direction : '',
  );
  const [activity, setActivity] = useState(
    operativeClientInfo ? operativeClientInfo.activity_description : '',
  );
  const [city, setCity] = useState(
    operativeClientInfo ? operativeClientInfo.city : '',
  );
  const [dataInfoToolTip, setDataInfoToolTip] = useState(false);
  const [isMono, setIsMono] = useState(false);
  const [isLegalPerson, setIsLegalPerson] = useState(
    operativeClientInfo ? operativeClientInfo.is_legal_person : false,
  );
  const [physicalPerson, setPhysicalPerson] = useState(
    operativeClientInfo ? operativeClientInfo.physical_person : false,
  );
  const [teamId, setTeamId] = useState(
    operativeClientInfo ? operativeClientInfo.team_id : '',
  );

  const [division, setDivision] = useState(
    operativeClientInfo ? operativeClientInfo.division_id : '',
  );

  const [bornDate, setBornDate] = useState(
    operativeClientInfo ? operativeClientInfo.born_date : '',
  );

  const [date, setDate] = useState(
    operativeClientInfo ? operativeClientInfo.date : '',
  );

  const [clientType, setClientType] = useState(
    operativeClientInfo ? operativeClientInfo.client_type_id : 0,
  );

  const [productPyme, setProductPyme] = useState({
    productPymeId: operativeClientInfo
      ? operativeClientInfo.product_pyme_id
      : false,
    isProductPyme: operativeClientInfo.product_pyme_id ? true : false,
  });

  const [observations, setObservations] = useState(
    operativeClientInfo ? operativeClientInfo.observations : '',
  );

  const [balance, setBalance] = useState(
    operativeClientInfo ? operativeClientInfo.balance : false,
  );

  const [balanceClose, setBalanceClose] = useState(
    operativeClientInfo ? operativeClientInfo.balance_close : false,
  );

  const [cupon, setCupon] = useState(
    operativeClientInfo ? operativeClientInfo.cupon : false,
  );

  const [invoice, setInvoice] = useState(
    operativeClientInfo ? operativeClientInfo.invoice : false,
  );

  const [system, setSystem] = useState(
    operativeClientInfo ? operativeClientInfo.system : false,
  );

  const [sociality, setSociality] = useState(
    operativeClientInfo ? operativeClientInfo.sociality : false,
  );

  const [team_balance_id, setTeam_balance_id] = useState(
    operativeClientInfo ? operativeClientInfo.team_balance_id : false,
  );

  const [risk, setRisk] = useState(
    operativeClientInfo ? operativeClientInfo.risk.toString() : false,
  );

  const [team_risk_id, setTeam_risk_id] = useState(
    operativeClientInfo ? operativeClientInfo.team_risk_id : false,
  );

  const [grossIncome, setGrossIncome] = useState(
    operativeClientInfo
      ? {
          hasGrossIncome: operativeClientInfo.gross_income_id ? true : false,
          grossIncomeId: operativeClientInfo.gross_income_id,
        }
      : {
          hasGrossIncome: false,
          grossIncomeId: false,
        },
  );

  const [monotributista, setMonotributista] = useState(
    operativeClientInfo.monotributo_type_id
      ? {
          isMonotributo: operativeClientInfo.monotributo_type_id ? true : false,
          monotributoTypeId: operativeClientInfo.monotributo_type_id,
        }
      : {
          isMonotributo: false,
          monotributoId: false,
        },
  );

  const [socialSecurity, setSocialSecurity] = useState(
    operativeClientInfo.social_security
      ? {
          socialSecurity: operativeClientInfo.social_security,
          hasSocialSecurity: operativeClientInfo.social_security ? true : false,
        }
      : {
          socialSecurity: false,
          hasSocialSecurity: false,
        },
  );

  const [domesticService, setDomesticService] = useState(
    operativeClientInfo.domestic_service
      ? {
          domesticService: operativeClientInfo.domestic_service,
          hasDomesticService: operativeClientInfo.domestic_service
            ? true
            : false,
        }
      : {
          domesticService: false,
          hasDomesticService: false,
        },
  );

  const [userList, setUserList] = useState([]);
  const [userTax, setUserTax] = useState(
    operativeClientInfo.operative_taxes_user_id
      ? operativeClientInfo.operative_taxes_user_id
      : false,
  );
  const [userDomestic, setUserDomestic] = useState(false);
  const [userOnboard, setUserOnboard] = useState(false);

  const { newAlert, newActivity } = useContext(AlertsContext);
  const { axiosGetQuery, loadingActions, axiosQueryFile, axiosPost } =
    useContext(ActionsBackend);

  const newClientPost = async () => {
    if (!clientType) {
      newAlert(
        'danger',
        'Hubo un error!',
        'Debe seleccionar un tipo de cliente!',
      );
      return;
    }
    if (!teamId) {
      newAlert('danger', 'Hubo un error!', 'Debe seleccionar un equipo!');
      return;
    }
    const dataPost = {
      commercial_client_id: commercialClientInfo.id,
      document_type: 80,
      document_number: documentNumber,
      business_name: businessName,
      fantasie_name: businessName,
      email: '',
      iva_condition_id: ivaConditionId,
      direction: direction,
      phone: '',
      city: city,
      is_legal_person: isLegalPerson,
      born_date: bornDate,
      client_type_id: clientType,
      activity_description: activity,
      physical_person: physicalPerson,

      product_pyme_id: productPyme.productPymeId,
      team_id: teamId,
      division_id: division,

      balance: balance,
      observations: observations,

      cupon: cupon,
      invoice: invoice,
      system: system,
      sociality: sociality,
      risk: risk,
      team_balance_id: team_balance_id,
      team_risk_id: team_risk_id,
      balance_close: balanceClose,

      //ProdPyme
      gross_income_id: grossIncome.grossIncomeId,
      monotributo_type_id: monotributista.monotributoTypeId,
      social_security: socialSecurity.socialSecurity,
      domestic_service: domesticService.domesticService,
      operative_taxes_user_id: userTax.id,
      operative_onboard_user_id: userOnboard.id,
      operative_domestic_user_id: userDomestic.id,
    };
    operativeClientInfo && (dataPost.id = operativeClientInfo.id);
    const response = await axiosPost(
      API_ROUTES.operativeClientsDir.operativeClients,
      dataPost,
    );
    if (!response.error) {
      newAlert(
        'success',
        'Registrado con éxito!',
        'Cliente registrado éxitosamente!',
      );
      newActivity(
        'Ha registrado al cliente: ' +
          businessName +
          ' (' +
          documentNumber +
          ')',
      );
      setIsOpenClientForm(false);
    } else {
      newAlert(
        'danger',
        'Hubo un error!',
        'Controle que todos los datos sean los correctos!. Error: ' +
          response.errorMsg,
      );
    }
  };
  console.log('balance :>> ', balance);
  const downloadTaxProof = async () => {
    const dataPost = [{ documentNumber }, { isMono }];
    const response = await axiosQueryFile(
      API_ROUTES.commercialClientsDir.sub.dataTaxProof,
      dataPost,
      'application/pdf',
    );
    if (!response.error) {
      newAlert(
        'success',
        'Archivo descargado con éxito!',
        'En el PDF se encuentra la constancia de inscripción del contribuyente.',
      );
    } else {
      newAlert(
        'danger',
        'Hubo un error!',
        'Posiblemente no tenga un certificado activo o los permisos en AFIP para acceder al padrón. Error: ' +
          response.errorMsg,
      );
    }
  };

  const getClientDataTax = async (e) => {
    const documentVerify = verifyDocumentNumber(e.target.value);
    if (documentVerify.isValid) {
      setIsDocumentValid(true);
      const response = await axiosGetQuery(
        API_ROUTES.commercialClientsDir.sub.dataTax,
        [{ documentNumber: documentNumber }],
      );
      try {
        const personType = response.data.data.datosGenerales.tipoPersona;
        if (personType === 'FISICA') {
          setBusinessName(
            response.data.data.datosGenerales.apellido +
              ' ' +
              response.data.data.datosGenerales.nombre,
          );
          setIsLegalPerson(false);
        } else {
          const fecha = response.data.data.datosGenerales.fechaContratoSocial
            .toString()
            .slice(0, 10);
          try {
            setBornDate(fecha);
          } catch (error) {}
          setBusinessName(response.data.data.datosGenerales.razonSocial);
          setIsLegalPerson(true);
        }
        setCity(
          response.data.data.datosGenerales.domicilioFiscal
            .descripcionProvincia,
        );
        setDirection(
          response.data.data.datosGenerales.domicilioFiscal.direccion,
        );
        if (response.data.data.datosMonotributo) {
          setIvaConditionId(20);
          setActivity(
            response.data.data.datosMonotributo.actividadMonotributista
              .descripcionActividad,
          );
          setIsMono(true);
        } else {
          setIsMono(false);
          const taxes = response.data.data.datosRegimenGeneral.impuesto;
          // eslint-disable-next-line
          taxes.map((item) => {
            switch (item.idImpuesto) {
              case 30:
                setIvaConditionId(item.idImpuesto);
                break;
              case 32:
                setIvaConditionId(item.idImpuesto);
                break;
              case 20:
                setIvaConditionId(item.idImpuesto);
                break;
              case 33:
                setIvaConditionId(item.idImpuesto);
                break;
              case 34:
                setIvaConditionId(item.idImpuesto);
                break;
              default:
                break;
            }
          });
          setActivity(
            response.data.data.datosRegimenGeneral.actividad[0]
              .descripcionActividad,
          );
        }
      } catch (error) {}
    } else {
      setIsDocumentValid(false);
    }
  };

  const getUserList = async () => {
    const response = await axiosGetQuery(API_ROUTES.usersDir.users, []);
    if (!response.error) {
      setUserList(response.data.items);
    } else {
      newAlert('danger', 'Hubo un error!', 'Error: ' + response.errorMsg);
    }
  };

  const clientSearchFn = (user, searchedText) => {
    if (
      `${user.name} ${user.lastname}`
        .toLowerCase()
        .includes(searchedText.toLowerCase())
    ) {
      return user;
    }
  };

  useEffect(() => {
    getUserList();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setIsLoading(loadingActions);
  }, [loadingActions, setIsLoading]);

  return (
    <>
      <Card>
        <CardHeader>
          <Row>
            <Col md="10">
              <h2>
                {operativeClientInfo
                  ? `Modificar cliente operativo ${operativeClientInfo.business_name} CUIT: ${operativeClientInfo.document_number} del Comercial:`
                  : `Nuevo Cliente Operativo del Cliente Comercial: `}
              </h2>
              <h2>{`${commercialClientInfo.business_name} CUIT: ${commercialClientInfo.document_number}`}</h2>
            </Col>
            <Col md="2" style={{ textAlign: 'right' }}>
              <button
                className="btn btn-danger"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpenClientForm(false);
                }}
              >
                X
              </button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              newClientPost();
            }}
          >
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
                      onChange={(e) => setDocumentNumber(e.target.value)}
                      onBlur={(e) => getClientDataTax(e)}
                      invalid={!isDocumentValid}
                      valid={isDocumentValid}
                      required
                    />

                    <InputGroupAddon addonType="append">
                      <Button
                        style={{
                          borderRadius: '0.375rem',
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0,
                        }}
                        id="btnTaxInfo"
                        color={isDocumentValid ? 'success' : 'danger'}
                        onClick={(e) => {
                          e.preventDefault();
                          downloadTaxProof();
                        }}
                        disabled={!isDocumentValid}
                      >
                        <i className="fas fa-search"></i>
                      </Button>
                    </InputGroupAddon>
                    <FormFeedback>El CUIT colocado es incorrecto!</FormFeedback>
                  </InputGroup>
                  <Tooltip
                    placement="top"
                    isOpen={dataInfoToolTip}
                    target="btnTaxInfo"
                    toggle={() => setDataInfoToolTip(!dataInfoToolTip)}
                  >
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
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label for="personTypeSelect">Tipo de persona</Label>
                  <Input
                    id="personTypeSelect"
                    type="select"
                    value={isLegalPerson}
                    onChange={(e) => setIsLegalPerson(e.target.value)}
                  >
                    <option value={false}>Física</option>
                    <option value={true}>Juridica</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label for="businessNameTxt">
                    {isLegalPerson
                      ? 'Fecha Contrato Social'
                      : 'Fecha Nacimiento'}
                  </Label>
                  <Input
                    type="date"
                    id="bornDateTxt"
                    placeholder="Fecha..."
                    value={bornDate}
                    onChange={(e) => setBornDate(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label for="dateTxt">Fecha de alta</Label>
                  <Input
                    type="date"
                    id="dateTxt"
                    placeholder="Fecha..."
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
              <ClientTypeInput
                clientType={clientType}
                setClientType={setClientType}
                col={3}
              />
            </Row>
            <div
              style={{
                border: '1px solid #e8eaed',
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '20px',
              }}
            >
              <Row>
                <PymeProductInput
                  productPyme={productPyme}
                  setMonotributoPyme={setProductPyme}
                  cuit={documentNumber}
                  colSize={4}
                />
                {productPyme.isProductPyme && (
                  <>
                    <TeamInput
                      colSize={3}
                      teamId={teamId}
                      setTeamId={setTeamId}
                    />
                    <DivisionInput
                      colSize={3}
                      divisionId={division}
                      setDivisionId={setDivision}
                    />
                    <Col md="2">
                      <FormGroup>
                        <Label for="teamName">Rancking IVA</Label>
                        <Input
                          type="text"
                          id="teamName"
                          name="teamName"
                          value={ivaRankingsCalc(documentNumber)}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </>
                )}
              </Row>

              {productPyme.isProductPyme && (
                <>
                  <Row>
                    <GrossIncomeInput
                      grossIncome={grossIncome}
                      setGrossIncome={setGrossIncome}
                      colSize={4}
                    />
                    <MonotributistaInput
                      monotributoType={monotributista}
                      setMonotributoType={setMonotributista}
                      colSize={4}
                    />
                    <Col md="4">
                      <InputSearch
                        itemsList={userList}
                        itemSelected={userTax}
                        title={'Responsable Impuesto'}
                        placeholderInput={'Busque un usuario...'}
                        getNameFn={(user) => `${user.name} ${user.lastname}`}
                        setItemSelected={setUserTax}
                        searchFn={clientSearchFn}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Row
                        style={{
                          border: '1px solid #e8eaed',
                          padding: '10px',
                          borderRadius: '5px',
                          marginBottom: '20px',
                          marginLeft: '20px',
                          marginRight: '20px',
                          textAlign: 'center',
                        }}
                      >
                        <Col md="4">
                          <FormGroup>
                            <Label for="balanceBool">Presenta 931</Label>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <Button
                                  color={
                                    socialSecurity.hasSocialSecurity
                                      ? 'success'
                                      : 'danger'
                                  }
                                  onClick={() =>
                                    setSocialSecurity({
                                      ...socialSecurity,
                                      hasSocialSecurity:
                                        !socialSecurity.hasSocialSecurity,
                                    })
                                  }
                                >
                                  {socialSecurity.hasSocialSecurity
                                    ? 'Si'
                                    : 'No'}
                                </Button>
                              </InputGroupAddon>
                              <Input
                                style={{
                                  paddingLeft: '10px',
                                  paddingRight: '10px',
                                  border: '1px solid',
                                }}
                                type="number"
                                name="socialSecurityRank"
                                id="socialSecurityRankTxt"
                                placeholder="Nomina 931..."
                                disabled={!socialSecurity.hasSocialSecurity}
                                onChange={(e) =>
                                  setSocialSecurity({
                                    ...socialSecurity,
                                    socialSecurity: e.target.value,
                                  })
                                }
                                value={socialSecurity.socialSecurity}
                              />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                        <Col md="3">
                          <FormGroup>
                            <Label>Ranking</Label>
                            <Input
                              style={{
                                paddingLeft: '10px',
                                paddingRight: '10px',
                                border: '1px solid',
                              }}
                              type="number"
                              name="socialSecurityRank"
                              id="socialSecurityRankTxt"
                              placeholder="Ranking 931..."
                              value={socialSecurityRankingsCalc(
                                documentNumber,
                              ).toString()}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col md="5">
                          <InputSearch
                            itemsList={userList}
                            itemSelected={userOnboard}
                            title={'Responsable Laboral'}
                            placeholderInput={'Busque un usuario...'}
                            getNameFn={(user) =>
                              `${user.name} ${user.lastname}`
                            }
                            setItemSelected={setUserOnboard}
                            searchFn={clientSearchFn}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col md="6">
                      <Row
                        style={{
                          border: '1px solid #e8eaed',
                          padding: '10px',
                          borderRadius: '5px',
                          marginBottom: '20px',
                          marginLeft: '20px',
                          marginRight: '20px',
                          textAlign: 'center',
                        }}
                      >
                        <Col md="4">
                          <FormGroup>
                            <Label for="balanceBool">Servicio Domestico</Label>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <Button
                                  color={
                                    domesticService.hasDomesticService
                                      ? 'success'
                                      : 'danger'
                                  }
                                  onClick={() =>
                                    setDomesticService({
                                      ...domesticService,
                                      hasDomesticService:
                                        !domesticService.hasDomesticService,
                                    })
                                  }
                                >
                                  {domesticService.hasDomesticService
                                    ? 'Si'
                                    : 'No'}
                                </Button>
                              </InputGroupAddon>
                              <Input
                                style={{
                                  paddingLeft: '10px',
                                  paddingRight: '10px',
                                  border: '1px solid',
                                }}
                                type="number"
                                name="domesticServiceRank"
                                id="domesticServiceRankTxt"
                                placeholder="Nomina 931..."
                                disabled={!domesticService.hasDomesticService}
                                onChange={(e) =>
                                  setDomesticService({
                                    ...domesticService,
                                    domesticService: e.target.value,
                                  })
                                }
                                value={domesticService.domesticService}
                              />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                        <Col md="3">
                          <FormGroup>
                            <Label>Ranking</Label>
                            <Input
                              style={{
                                paddingLeft: '10px',
                                paddingRight: '10px',
                                border: '1px solid',
                              }}
                              type="number"
                              name="domesticServiceRank"
                              id="domesticServiceRankTxt"
                              placeholder="Ranking Servicio Somestico..."
                              value={domesticRankingsCalc(
                                documentNumber,
                              ).toString()}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col md="5">
                          <InputSearch
                            itemsList={userList}
                            itemSelected={userDomestic}
                            title={'Responsable Dometica'}
                            placeholderInput={'Busque un usuario...'}
                            getNameFn={(user) =>
                              `${user.name} ${user.lastname}`
                            }
                            setItemSelected={setUserDomestic}
                            searchFn={clientSearchFn}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </>
              )}
            </div>
            <Row>
              <Col md="4">
                <div
                  style={{
                    border: '1px solid #e8eaed',
                    padding: '10px',
                    borderRadius: '5px',
                    marginBottom: '20px',
                  }}
                >
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label for="balanceBool">Producto Riesgo</Label>
                        <Input
                          id="balanceBool"
                          type="select"
                          value={risk}
                          onChange={(e) => setRisk(e.target.value)}
                        >
                          <option value={false}>No</option>
                          <option value={true}>Si</option>
                        </Input>
                      </FormGroup>
                    </Col>

                    {risk === 'true' ? (
                      <TeamInput
                        title={'Equipo Riesgo'}
                        colSize={8}
                        teamId={team_risk_id}
                        setTeamId={setTeam_risk_id}
                      />
                    ) : (
                      <Col md="6"></Col>
                    )}
                  </Row>
                </div>
              </Col>
              <Col md="8">
                <div
                  style={{
                    border: '1px solid #e8eaed',
                    padding: '10px',
                    borderRadius: '5px',
                    marginBottom: '20px',
                  }}
                >
                  <Row>
                    <Col md="5">
                      <FormGroup>
                        <Label for="balanceBool">Presenta Balance</Label>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <Button
                              color={balance ? 'success' : 'danger'}
                              onClick={() => setBalance(!balance)}
                            >
                              {balance ? 'Si' : 'No'}
                            </Button>
                          </InputGroupAddon>
                          <Input
                            style={{
                              paddingLeft: '10px',
                              paddingRight: '10px',
                              border: '1px solid',
                            }}
                            type="select"
                            disabled={!balance}
                            onChange={(e) => setBalanceClose(e.target.value)}
                            value={balanceClose}
                          >
                            <option value={false}>Seleccione un mes...</option>
                            <option value={1}>Enero</option>
                            <option value={2}>Febrero</option>
                            <option value={3}>Marzo</option>
                            <option value={4}>Abril</option>
                            <option value={5}>Mayo</option>
                            <option value={6}>Junio</option>
                            <option value={7}>Julio</option>
                            <option value={8}>Agosto</option>
                            <option value={9}>Septiembre</option>
                            <option value={10}>Octubre</option>
                            <option value={11}>Noviembre</option>
                            <option value={12}>Diciembre</option>
                          </Input>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    {balance && (
                      <>
                        <TeamInput
                          title={'Equipo Balance'}
                          colSize={4}
                          teamId={team_balance_id}
                          setTeamId={setTeam_balance_id}
                        />
                        <Col md="3">
                          <FormGroup>
                            <Label>Ranking</Label>
                            <Input
                              style={{
                                paddingLeft: '10px',
                                paddingRight: '10px',
                                border: '1px solid',
                              }}
                              type="number"
                              name="BalanceRank"
                              id="BalanceRankTxt"
                              placeholder="Ranking Balance..."
                              value={
                                balance
                                  ? parseInt(balanceClose) > 7
                                    ? parseInt(balanceClose) + 5 - 12
                                    : parseInt(balanceClose) + 5
                                  : 0
                              }
                              disabled
                            />
                          </FormGroup>
                        </Col>
                      </>
                    )}
                  </Row>
                </div>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md="2">
                <FormGroup>
                  <Label for="balanceBool">Producto Cupón</Label>
                  <Input
                    id="balanceBool"
                    type="select"
                    value={cupon}
                    onChange={(e) => setCupon(e.target.value)}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Si</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label for="balanceBool">Producto Facturación</Label>
                  <Input
                    id="balanceBool"
                    type="select"
                    value={invoice}
                    onChange={(e) => setInvoice(e.target.value)}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Si</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="2">
                <FormGroup>
                  <Label for="balanceBool">Producto Sistema</Label>
                  <Input
                    id="balanceBool"
                    type="select"
                    value={system}
                    onChange={(e) => setSystem(e.target.value)}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Si</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="2">
                <FormGroup>
                  <Label for="balanceBool">Producto Societario</Label>
                  <Input
                    id="balanceBool"
                    type="select"
                    value={sociality}
                    onChange={(e) => setSociality(e.target.value)}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Si</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label for="balanceBool">Producto Anuales P.F.</Label>
                  <Input
                    id="balanceBool"
                    type="select"
                    value={physicalPerson}
                    onChange={(e) => setPhysicalPerson(e.target.value)}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Si</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <FormGroup>
                  <Label for="obsTxt">Detalle:</Label>
                  <ReactQuill
                    id="obsTxt"
                    debug="info"
                    placeholder="Describa el detalle o concepto del cobro..."
                    theme="snow"
                    value={observations}
                    onChange={setObservations}
                    modules={{
                      toolbar: ['bold', 'italic', 'underline'],
                    }}
                    style={{ height: '250px', background: '#e8eaed' }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md="12" style={{ textAlign: 'center' }}>
                <button
                  className="btn btn-primary"
                  style={{ width: '150px', margin: '20px' }}
                  type="submit"
                >
                  {operativeClientInfo ? 'Modificar' : 'Agregar'}
                </button>
                <button
                  className="btn btn-danger"
                  style={{ width: '150px', margin: '20px' }}
                  onClick={(e) => {
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
    </>
  );
};

export default OperativeClientsForm;
