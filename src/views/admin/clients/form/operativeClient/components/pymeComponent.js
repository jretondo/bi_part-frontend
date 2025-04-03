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
  Row,
  Tooltip,
} from 'reactstrap';
import AlertsContext from '../../../../../../context/alerts';
import ActionsBackend from '../../../../../../context/actionsBackend';
import API_ROUTES from '../../../../../../api/routes';
import { socialSecurityRankingsCalc } from '../../../../../../function/rankingsCalc';

const PymeProductInput = ({
  productPyme,
  setMonotributoPyme,
  cuit,
  colSize,
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [productName, setMonotributoName] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [productList, setMonotributoList] = useState([]);

  const [socialSecurity, setSocialSecurity] = useState({
    socialSecurity: false,
    hasSocialSecurity: false,
    socialSecurityRank: 0,
  });

  const { newAlert, newActivity } = useContext(AlertsContext);
  const { axiosGetQuery, axiosPost } = useContext(ActionsBackend);

  const createProductPyme = async () => {
    const data = {
      name: productName,
    };
    const response = await axiosPost(
      API_ROUTES.productPymeDir.productPyme,
      data,
    );
    if (!response.error) {
      newAlert(
        'success',
        'Producto Pyme creado!',
        'El producto Pyme ha sido creado con éxito',
      );
      newActivity('El usuario ha creado un nuevo producto Pyme');
      setModalOpen(false);
      getProductTypeList();
    } else {
      newAlert('danger', 'Hubo un error!', 'Error: ' + response.errorMsg);
    }
  };

  const getProductTypeList = async () => {
    const response = await axiosGetQuery(
      API_ROUTES.productPymeDir.productPyme,
      [],
    );
    if (!response.error) {
      setMonotributoList(response.data);
    } else {
      newAlert('danger', 'Hubo un error!', 'Error: ' + response.errorMsg);
    }
  };

  useEffect(() => {
    socialSecurity.hasSocialSecurity &&
      setSocialSecurity({
        ...socialSecurity,
        socialSecurityRank: socialSecurityRankingsCalc(cuit),
      });
    // eslint-disable-next-line
  }, [socialSecurity.hasSocialSecurity]);

  useEffect(() => {
    getProductTypeList();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Col md={colSize}>
        <FormGroup>
          <Label for="balanceBool">Producto Pyme</Label>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <Button
                color={productPyme.isProductPyme ? 'success' : 'danger'}
                onClick={() =>
                  setMonotributoPyme({
                    ...productPyme,
                    isProductPyme: !productPyme.isProductPyme,
                  })
                }
              >
                {productPyme.isProductPyme ? 'Si' : 'No'}
              </Button>
            </InputGroupAddon>
            <Input
              type="select"
              style={{ paddingLeft: '10px' }}
              disabled={!productPyme.isProductPyme}
              value={productPyme.productPymeId}
              onChange={(e) =>
                setMonotributoPyme({
                  ...productPyme,
                  productPymeId: e.target.value,
                })
              }
            >
              <option value={false}>Seleccione el producto Pyme...</option>
              {productList.length > 0 &&
                productList.map((team, index) => {
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
                Agregar más productos Pyme
              </Tooltip>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
      </Col>
      <Modal
        isOpen={modalOpen}
        toggle={() => setModalOpen(!modalOpen)}
        size="md"
      >
        <ModalHeader>
          <h3>Agregar Tipo de Producto Pyme</h3>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <FormGroup>
                <Label for="teamName">Nombre del producto Pyme</Label>
                <Input
                  type="text"
                  id="teamName"
                  name="teamName"
                  onChange={(e) => setMonotributoName(e.target.value)}
                  value={productName}
                />
              </FormGroup>
            </Col>
          </Row>
          <Button color="primary" onClick={() => createProductPyme()}>
            Crear producto Pyme
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
};

export default PymeProductInput;
