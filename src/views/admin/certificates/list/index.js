import API_ROUTES from '../../../../api/routes';
import { useAxiosGetList } from 'hooks/useAxiosGetList';
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Pagination, Row } from 'reactstrap';
import { SearchFormComponent } from 'components/Search/Search1';
import { TableList } from 'components/Lists/TableList';
import CertificateRow from './row';

const CertificatesList = ({
    setCertificateInfo,
    setIsOpenCertificateForm,
    setIsOpenCertRequest,
    setIsLoading
}) => {
    const titlesArray = ["Id", "Nombre", "Razón Social", "CUIT", "Activo", ""]
    const [list, setList] = useState(<></>)
    const [page, setPage] = useState(1)
    const [refreshList, setRefreshList] = useState(false)
    const [stringSearched, setStringSearched] = useState("")

    const {
        dataPage,
        pageObj,
        errorList,
        loadingList
    } = useAxiosGetList(
        API_ROUTES.certificatesDir.certificates,
        page, refreshList, [{ query: stringSearched }]
    )

    useEffect(() => {
        setIsLoading(loadingList)
    }, [loadingList, setIsLoading])

    useEffect(() => {
        if (errorList) {
            setList(
                <tr style={{ textAlign: "center", width: "100%" }}>
                    <td> <span style={{ textAlign: "center", marginRight: "auto", marginLeft: "auto" }}> No hay certificados cargados</span></td>
                </tr>
            )
        } else {
            setList(
                dataPage.map((certificate, key) => {
                    let first
                    if (key === 0) {
                        first = true
                    } else {
                        first = false
                    }
                    return (
                        <CertificateRow
                            key={key}
                            id={key}
                            certificate={certificate}
                            first={first}
                            page={page}
                            setCertificateInfo={setCertificateInfo}
                            setIsOpenCertificateForm={setIsOpenCertificateForm}
                            setPage={setPage}
                            refreshToggle={() => setRefreshList(!refreshList)}
                        />
                    )
                })
            )
        }
        return () => {
            setList(<></>)
        }
        // eslint-disable-next-line
    }, [dataPage, errorList, loadingList])

    return (
        <Card>
            <CardHeader className="border-0">
                <Row>
                    <Col md="4" >
                        <h2 className="mb-0">Lista de Certificados</h2>
                    </Col>
                    <Col md="8" style={{ textAlign: "right" }}>
                        <SearchFormComponent
                            setStringSearched={setStringSearched}
                            stringSearched={stringSearched}
                            setRefreshList={setRefreshList}
                            refreshList={refreshList}
                            title="Buscar un certificado"
                        />
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col>
                        <TableList
                            titlesArray={titlesArray}
                        >
                            {list}
                        </TableList>
                    </Col>
                </Row>
            </CardBody>
            <CardFooter>
                <Row>
                    <Col md="6">
                        <Button
                            color="primary"
                            onClick={e => {
                                e.preventDefault();
                                setCertificateInfo(false);
                                setIsOpenCertRequest(false);
                                setIsOpenCertificateForm(true);
                            }}
                        >
                            Nuevo Certificado
                        </Button>
                        <Button
                            color="info"
                            onClick={e => {
                                e.preventDefault();
                                setCertificateInfo(false);
                                setIsOpenCertificateForm(false);
                                setIsOpenCertRequest(true);
                            }}
                        >
                            Generar .SCR (Solicitud de certificado)
                        </Button>
                    </Col>
                    <Col>
                        {!pageObj ? null : <Pagination
                            page={page}
                            setPage={setPage}
                            dataPages={pageObj}
                        />}
                    </Col>
                </Row>
            </CardFooter>
        </Card>
    )
}

export default CertificatesList