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
  ModalFooter,
  ModalHeader,
  Tooltip,
} from 'reactstrap';
import API_ROUTES from '../../../../../../api/routes';
import AlertsContext from '../../../../../../context/alerts';
import ActionsBackend from '../../../../../../context/actionsBackend';
import { TableList } from '../../../../../../components/Lists/TableList';

const DivisionInput = ({ divisionId, setDivisionId, colSize }) => {
  const [divisionList, setDivisionList] = useState([]);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [tooltipOpen2, setTooltipOpen2] = useState(false);
  const [divisionName, setDivisionName] = useState('');
  const [divisionDescription, setDivisionDescription] = useState('');

  const { newAlert, newActivity } = useContext(AlertsContext);
  const { axiosGetQuery, axiosPost, axiosDelete } = useContext(ActionsBackend);

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

  const deleteClientType = async (id) => {
    const response = await axiosDelete(API_ROUTES.divisionDir.division, id);
    if (!response.error) {
      newAlert(
        'success',
        'Tipo borrado!',
        'La division ha sido borrada con éxito',
      );
      newActivity('El usuario ha borrado una division');
      getDivisionList();
    } else {
      newAlert('danger', 'Hubo un error!', 'Error: ' + response.errorMsg);
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
            <InputGroupAddon addonType="append">
              <Button
                id="deleteClientTypesBtn"
                color="danger"
                onClick={() => setModalOpen2(true)}
              >
                {<i className="fas fa-trash"></i>}
              </Button>
              <Tooltip
                placement="top"
                isOpen={tooltipOpen2}
                target="deleteClientTypesBtn"
                toggle={() => setTooltipOpen2(!tooltipOpen2)}
              >
                Eliminar Tipos
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
      <Modal
        isOpen={modalOpen2}
        toggle={() => setModalOpen2(!modalOpen2)}
        size="lg"
      >
        <ModalHeader>
          <h3>Borrar Tipos de Monotributo</h3>
        </ModalHeader>
        <ModalBody>
          <TableList titlesArray={['Nombre', 'Descripción', '']}>
            {divisionList.map((division, index) => {
              return (
                <tr key={index}>
                  <td style={{ textAlign: 'center' }}>{division.name}</td>
                  <td style={{ textAlign: 'center' }}>
                    {division.description}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <Button
                      color="danger"
                      onClick={() => deleteClientType(division.id)}
                    >
                      {<i className="fas fa-trash"></i>}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </TableList>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => setModalOpen2(false)}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default DivisionInput;
