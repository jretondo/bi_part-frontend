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

const TeamInput = ({ teamId, setTeamId, colSize, title = 'Equipo' }) => {
  const [teamList, setTeamList] = useState([]);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');

  const { newAlert, newActivity } = useContext(AlertsContext);
  const { axiosGetQuery, axiosPost } = useContext(ActionsBackend);

  const getTeamList = async () => {
    const response = await axiosGetQuery(API_ROUTES.teamsDir.teams, []);
    if (!response.error) {
      setTeamList(response.data);
    } else {
      newAlert('danger', 'Hubo un error!', 'Error: ' + response.errorMsg);
    }
  };

  const createTeam = async () => {
    const response = await axiosPost(API_ROUTES.teamsDir.teams, {
      name: teamName,
      description: teamDescription,
    });
    if (!response.error) {
      newAlert(
        'success',
        'Equipo creado!',
        'El equipo ha sido creado con éxito',
      );
      newActivity('El usuario ha creado un nuevo equipo');
      setModalOpen(false);
      getTeamList();
    } else {
      newAlert('danger', 'Hubo un error!', 'Error: ' + response.errorMsg);
    }
  };

  useEffect(() => {
    getTeamList();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Col md={colSize}>
        <FormGroup>
          <Label for="balanceBool">{title}</Label>
          <InputGroup>
            <Input
              type="select"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
            >
              <option value={false}>Seleccione un equipo...</option>
              {teamList.length > 0 &&
                teamList.map((team, index) => {
                  return (
                    <option key={index} value={team.id}>
                      {team.name}
                    </option>
                  );
                })}
            </Input>
            <InputGroupAddon addonType="append">
              <Button
                id="addTeamsBtn"
                color="primary"
                onClick={() => setModalOpen(true)}
              >
                {<i className="fas fa-plus"></i>}
              </Button>
              <Tooltip
                placement="top"
                isOpen={tooltipOpen}
                target="addTeamsBtn"
                toggle={() => setTooltipOpen(!tooltipOpen)}
              >
                Agregar más equipos
              </Tooltip>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
      </Col>
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
        <ModalHeader>
          <h3>Agregar equipo</h3>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="teamName">Nombre del equipo</Label>
            <Input
              type="text"
              id="teamName"
              name="teamName"
              onChange={(e) => setTeamName(e.target.value)}
              value={teamName}
            />
          </FormGroup>
          <FormGroup>
            <Label for="teamDescription">Descripción del equipo</Label>
            <Input
              type="textarea"
              id="teamDescription"
              name="teamDescription"
              onChange={(e) => setTeamDescription(e.target.value)}
              value={teamDescription}
            />
          </FormGroup>

          <Button color="primary" onClick={() => createTeam()}>
            Crear equipo
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
};

export default TeamInput;
