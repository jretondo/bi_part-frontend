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
import AlertsContext from '../../../../../../context/alerts';
import ActionsBackend from '../../../../../../context/actionsBackend';
import API_ROUTES from '../../../../../../api/routes';

const MonotributistaInput = ({
  monotributoType,
  setMonotributoType,
  colSize,
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [monotributoName, setMonotributoName] = useState('');
  const [monotributoDescription, setMonotributoDescription] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [monotributoList, setMonotributoList] = useState([]);

  const { newAlert, newActivity } = useContext(AlertsContext);
  const { axiosGetQuery, axiosPost } = useContext(ActionsBackend);

  const createMonotribuType = async () => {
    const response = await axiosPost(
      API_ROUTES.monotributoTypeDir.monotributoType,
      {
        name: monotributoName,
        description: monotributoDescription,
      },
    );
    if (!response.error) {
      newAlert(
        'success',
        'Equipo creado!',
        'El equipo ha sido creado con éxito',
      );
      newActivity('El usuario ha creado un nuevo equipo');
      setModalOpen(false);
      getMonotributoTypeList();
    } else {
      newAlert('danger', 'Hubo un error!', 'Error: ' + response.errorMsg);
    }
  };

  const getMonotributoTypeList = async () => {
    const response = await axiosGetQuery(
      API_ROUTES.monotributoTypeDir.monotributoType,
      [],
    );
    if (!response.error) {
      setMonotributoList(response.data);
    } else {
      newAlert('danger', 'Hubo un error!', 'Error: ' + response.errorMsg);
    }
  };

  useEffect(() => {
    getMonotributoTypeList();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Col md={colSize}>
        <FormGroup>
          <Label for="balanceBool">Monotributista</Label>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <Button
                color={monotributoType.isMonotributo ? 'success' : 'danger'}
                onClick={() =>
                  setMonotributoType({
                    ...monotributoType,
                    isMonotributo: !monotributoType.isMonotributo,
                  })
                }
              >
                {monotributoType.isMonotributo ? 'Si' : 'No'}
              </Button>
            </InputGroupAddon>
            <Input
              type="select"
              style={{ paddingLeft: '10px' }}
              disabled={!monotributoType.isMonotributo}
              value={monotributoType.monotributoTypeId}
              onChange={(e) =>
                setMonotributoType({
                  ...monotributoType,
                  monotributoTypeId: e.target.value,
                })
              }
            >
              <option value={false}>Seleccione tipo monotributo...</option>
              {monotributoList.length > 0 &&
                monotributoList.map((team, index) => {
                  return (
                    <option key={index} value={team.id}>
                      {team.name}
                    </option>
                  );
                })}
            </Input>
            <InputGroupAddon addonType="append">
              <Button
                color="primary"
                id="addMonoBtn"
                onClick={() => setModalOpen(true)}
              >
                {<i className="fas fa-plus"></i>}
              </Button>
              <Tooltip
                placement="top"
                isOpen={tooltipOpen}
                target="addMonoBtn"
                toggle={() => setTooltipOpen(!tooltipOpen)}
              >
                Agregar más tipos de monotributo
              </Tooltip>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
      </Col>
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
        <ModalHeader>
          <h3>Agregar Tipo de Monotributo</h3>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="teamName">Nombre del tipo de monotributo</Label>
            <Input
              type="text"
              id="teamName"
              name="teamName"
              onChange={(e) => setMonotributoName(e.target.value)}
              value={monotributoName}
            />
          </FormGroup>
          <FormGroup>
            <Label for="teamDescription">
              Descripción del tipo de monotributo
            </Label>
            <Input
              type="textarea"
              id="teamDescription"
              name="teamDescription"
              onChange={(e) => setMonotributoDescription(e.target.value)}
              value={monotributoDescription}
            />
          </FormGroup>

          <Button color="primary" onClick={() => createMonotribuType()}>
            Crear tipo
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
};

export default MonotributistaInput;
