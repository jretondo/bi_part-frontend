import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Tooltip,
} from 'reactstrap';
import API_ROUTES from '../../../../../../api/routes';
import AlertsContext from '../../../../../../context/alerts';
import ActionsBackend from '../../../../../../context/actionsBackend';

const GrossIncomeInput = ({ grossIncome, setGrossIncome, colSize }) => {
  const [grossIncomeList, setGrossIncomeList] = useState([]);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [grossIncomeName, setGrossIncomeName] = useState('');
  const [grossIncomeDescription, setGrossIncomeDescription] = useState('');

  const { newAlert, newActivity } = useContext(AlertsContext);
  const { axiosGetQuery, axiosPost } = useContext(ActionsBackend);

  const getGrossIncomeList = async () => {
    const response = await axiosGetQuery(
      API_ROUTES.grossIncomesDir.grossIncomes,
      [],
    );
    if (!response.error) {
      setGrossIncomeList(response.data);
    } else {
      newAlert('danger', 'Hubo un error!', 'Error: ' + response.errorMsg);
    }
  };

  const createGrossIncome = async () => {
    const response = await axiosPost(API_ROUTES.grossIncomesDir.grossIncomes, {
      name: grossIncomeName,
      description: grossIncomeDescription,
    });
    if (!response.error) {
      newAlert(
        'success',
        'Equipo creado!',
        'El equipo ha sido creado con éxito',
      );
      newActivity('El usuario ha creado un nuevo equipo');
      setModalOpen(false);
      getGrossIncomeList();
    } else {
      newAlert('danger', 'Hubo un error!', 'Error: ' + response.errorMsg);
    }
  };

  useEffect(() => {
    getGrossIncomeList();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Col md={colSize}>
        <FormGroup>
          <Label for="balanceBool">Ingresos Brutos</Label>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <Button
                color={grossIncome.hasGrossIncome ? 'success' : 'danger'}
                onClick={() =>
                  setGrossIncome({
                    ...grossIncome,
                    hasGrossIncome: !grossIncome.hasGrossIncome,
                  })
                }
              >
                {grossIncome.hasGrossIncome ? 'Si' : 'No'}
              </Button>
            </InputGroupAddon>
            <Input
              type="select"
              style={{ paddingLeft: '10px' }}
              disabled={!grossIncome.hasGrossIncome}
              value={grossIncome.grossIncomeId}
              onChange={(e) =>
                setGrossIncome({
                  ...grossIncome,
                  grossIncomeId: e.target.value,
                })
              }
            >
              <option value={false}>Seleccione un impuesto...</option>
              {grossIncomeList.length > 0 &&
                grossIncomeList.map((grossIncome, index) => {
                  return (
                    <option key={index} value={grossIncome.id}>
                      {grossIncome.name}
                    </option>
                  );
                })}
            </Input>
            <InputGroupAddon addonType="append">
              <Button
                color="primary"
                id="addIIBBBtn"
                onClick={() => setModalOpen(true)}
              >
                {<i className="fas fa-plus"></i>}
              </Button>
              <Tooltip
                placement="top"
                isOpen={tooltipOpen}
                target="addIIBBBtn"
                toggle={() => setTooltipOpen(!tooltipOpen)}
              >
                Agregar más IIBB
              </Tooltip>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
      </Col>
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
        <ModalHeader>
          <h3>Agregar IIBB</h3>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="grossIncomeName">Nombre del IIBB</Label>
            <Input
              type="text"
              id="grossIncomeName"
              name="grossIncomeName"
              onChange={(e) => setGrossIncomeName(e.target.value)}
              value={grossIncomeName}
            />
          </FormGroup>
          <FormGroup>
            <Label for="grossIncomeDescription">Descripción del IIBB</Label>
            <Input
              type="textarea"
              id="grossIncomeDescription"
              name="grossIncomeDescription"
              onChange={(e) => setGrossIncomeDescription(e.target.value)}
              value={grossIncomeDescription}
            />
          </FormGroup>

          <Button color="primary" onClick={() => createGrossIncome()}>
            Crear IIBB
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
};

export default GrossIncomeInput;
