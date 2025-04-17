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
  Row,
  Tooltip,
} from 'reactstrap';
import AlertsContext from '../../../../../../context/alerts';
import ActionsBackend from '../../../../../../context/actionsBackend';
import API_ROUTES from '../../../../../../api/routes';
import { socialSecurityRankingsCalc } from '../../../../../../function/rankingsCalc';
import { TableList } from '../../../../../../components/Lists/TableList';

const PymeProductInput = ({
  productPyme,
  setMonotributoPyme,
  cuit,
  colSize,
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [productName, setMonotributoName] = useState('');
  const [modalOpen2, setModalOpen2] = useState(false);
  const [tooltipOpen2, setTooltipOpen2] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [productList, setMonotributoList] = useState([]);

  const [socialSecurity, setSocialSecurity] = useState({
    socialSecurity: false,
    hasSocialSecurity: false,
    socialSecurityRank: 0,
  });

  const { newAlert, newActivity } = useContext(AlertsContext);
  const { axiosGetQuery, axiosPost, axiosDelete } = useContext(ActionsBackend);

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

  const deleteProductPyme = async (clientTypeId) => {
    const response = await axiosDelete(
      API_ROUTES.productPymeDir.productPyme,
      clientTypeId,
    );
    if (!response.error) {
      newAlert('success', 'Tipo borrado!', 'El tipo ha sido borrado con éxito');
      newActivity('El usuario ha borrado un tipo de cliente');
      getProductTypeList();
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
                productList.map((product, index) => {
                  return (
                    <option key={index} value={product.id}>
                      {product.name}
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
            {productList.map((product, index) => {
              return (
                <tr key={index}>
                  <td style={{ textAlign: 'center' }}>{product.name}</td>
                  <td style={{ textAlign: 'center' }}>{product.description}</td>
                  <td style={{ textAlign: 'center' }}>
                    <Button
                      color="danger"
                      onClick={() => deleteProductPyme(product.id)}
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

export default PymeProductInput;
