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

const DivisionInput = ({ divisionId, setDivisionId, colSize }) => {
  const [divisionList, setDivisionList] = useState([]);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [divisionName, setDivisionName] = useState('');
  const [divisionDescription, setDivisionDescription] = useState('');

  const { newAlert, newActivity } = useContext(AlertsContext);
  const { axiosGetQuery, axiosPost } = useContext(ActionsBackend);

  const getDivisionList = async () => {
    const response = await axiosGetQuery(API_ROUTES.divisionDir.division, []);
    if (!response.error) {
      setDivisionList(response.data);
    } else {
      newAlert('danger', 'Hubo una error!', 'Error: ' + response.errorMsg);
    }
  };

  const createDivision = async () => {
    const response = await axiosPost(API_ROUTES.divisionDir.division, {
      name: divisionName,
      description: divisionDescription,
    });
    if (!response.error) {
      newAlert(
        'success',
        'División creado!',
        'El división ha sido creado con éxito',
      );
      newActivity('El usuario ha creado una nuevo división');
      setModalOpen(false);
      getDivisionList();
    } else {
      newAlert('danger', 'Hubo una error!', 'Error: ' + response.errorMsg);
    }
  };

  useEffect(() => {
    getDivisionList();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Col md={colSize}>
        <FormGroup>
          <Label for="balanceBool">División</Label>
          <InputGroup>
            <Input
              type="select"
              value={divisionId}
              onChange={(e) => setDivisionId(e.target.value)}
            >
              <option value={false}>Seleccione una división...</option>
              {divisionList.length > 0 &&
                divisionList.map((division, index) => {
                  return (
                    <option key={index} value={division.id}>
                      {division.name}
                    </option>
                  );
                })}
            </Input>
            <InputGroupAddon addonType="append">
              <Button
                id="addDivisionsBtn"
                color="primary"
                onClick={() => setModalOpen(true)}
              >
                {<i className="fas fa-plus"></i>}
              </Button>
              <Tooltip
                placement="top"
                isOpen={tooltipOpen}
                target="addDivisionsBtn"
                toggle={() => setTooltipOpen(!tooltipOpen)}
              >
                Agregar más divisiones
              </Tooltip>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
      </Col>
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
        <ModalHeader>
          <h3>Agregar división</h3>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="divisionName">Nombre de la división</Label>
            <Input
              type="text"
              id="divisionName"
              name="divisionName"
              onChange={(e) => setDivisionName(e.target.value)}
              value={divisionName}
            />
          </FormGroup>
          <FormGroup>
            <Label for="divisionDescription">Descripción de la división</Label>
            <Input
              type="textarea"
              id="divisionDescription"
              name="divisionDescription"
              onChange={(e) => setDivisionDescription(e.target.value)}
              value={divisionDescription}
            />
          </FormGroup>

          <Button color="primary" onClick={() => createDivision()}>
            Crear división
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
};

export default DivisionInput;
