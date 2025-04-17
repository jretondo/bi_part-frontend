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

const ClientTypeInput = ({ clientType, setClientType, col }) => {
  const [clientTypeList, setClientTypeList] = useState([]);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipOpen2, setTooltipOpen2] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [clientTypeName, setClientTypeName] = useState('');
  const [clientTypeDescription, setClientTypeDescription] = useState('');

  const { newAlert, newActivity } = useContext(AlertsContext);
  const { axiosGetQuery, axiosPost, axiosDelete } = useContext(ActionsBackend);

  const getClientTypeList = async () => {
    const response = await axiosGetQuery(
      API_ROUTES.clientTypeDir.clientType,
      [],
    );
    if (!response.error) {
      setClientTypeList(response.data);
    } else {
      newAlert('danger', 'Hubo un error!', 'Error: ' + response.errorMsg);
    }
  };

  const createClientType = async () => {
    const response = await axiosPost(API_ROUTES.clientTypeDir.clientType, {
      name: clientTypeName,
      description: clientTypeDescription,
    });
    if (!response.error) {
      newAlert('success', 'Tipo creado!', 'El tipo ha sido creado con éxito');
      newActivity('El usuario ha creado un nuevo tipo de cliente');
      setModalOpen(false);
      getClientTypeList();
    } else {
      newAlert('danger', 'Hubo un error!', 'Error: ' + response.errorMsg);
    }
  };

  const deleteClientType = async (clientTypeId) => {
    const response = await axiosDelete(
      API_ROUTES.clientTypeDir.clientType,
      clientTypeId,
    );
    if (!response.error) {
      newAlert('success', 'Tipo borrado!', 'El tipo ha sido borrado con éxito');
      newActivity('El usuario ha borrado un tipo de cliente');
      getClientTypeList();
    } else {
      newAlert('danger', 'Hubo un error!', 'Error: ' + response.errorMsg);
    }
  };

  useEffect(() => {
    getClientTypeList();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Col md={col}>
        <FormGroup>
          <Label for="balanceBool">Tipo de Pago</Label>
          <InputGroup>
            <Input
              required
              type="select"
              value={clientType}
              onChange={(e) => setClientType(e.target.value)}
            >
              <option value={false}>Seleccione un tipo...</option>
              {clientTypeList.length > 0 &&
                clientTypeList.map((clientType, index) => {
                  return (
                    <option key={index} value={clientType.id}>
                      {clientType.name}
                    </option>
                  );
                })}
            </Input>
            <InputGroupAddon addonType="append">
              <Button
                id="addClientTypesBtn"
                color="primary"
                onClick={() => setModalOpen(true)}
              >
                {<i className="fas fa-plus"></i>}
              </Button>
              <Tooltip
                placement="top"
                isOpen={tooltipOpen}
                target="addClientTypesBtn"
                toggle={() => setTooltipOpen(!tooltipOpen)}
              >
                Agregar más tipos
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
          <h3>Agregar Tipo de Pago</h3>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="clientTypeName">Nombre del tipo</Label>
            <Input
              type="text"
              id="clientTypeName"
              name="clientTypeName"
              onChange={(e) => setClientTypeName(e.target.value)}
              value={clientTypeName}
            />
          </FormGroup>
          <FormGroup>
            <Label for="clientTypeDescription">Descripción del tipo</Label>
            <Input
              type="textarea"
              id="clientTypeDescription"
              name="clientTypeDescription"
              onChange={(e) => setClientTypeDescription(e.target.value)}
              value={clientTypeDescription}
            />
          </FormGroup>

          <Button color="primary" onClick={() => createClientType()}>
            Crear tipo de cliente
          </Button>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={modalOpen2}
        toggle={() => setModalOpen2(!modalOpen2)}
        size="lg"
      >
        <ModalHeader>
          <h3>Borrar Tipos de Cliente</h3>
        </ModalHeader>
        <ModalBody>
          <TableList titlesArray={['Nombre', 'Descripción', '']}>
            {clientTypeList.map((clientType, index) => {
              return (
                <tr key={index}>
                  <td style={{ textAlign: 'center' }}>{clientType.name}</td>
                  <td style={{ textAlign: 'center' }}>
                    {clientType.description}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <Button
                      color="danger"
                      onClick={() => deleteClientType(clientType.id)}
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

export default ClientTypeInput;
