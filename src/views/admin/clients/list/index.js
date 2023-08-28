import API_ROUTES from '../../../../api/routes';
import { useAxiosGetList } from 'hooks/useAxiosGetList';
import React, { useEffect, useState } from 'react';
import ClientRow from './row';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Pagination, Row } from 'reactstrap';
import { SearchFormComponent } from 'components/Search/Search1';
import { TableList } from 'components/Lists/TableList';

const ClientsList = ({
    setClientInfo,
    setIsOpenClientForm,
    setIsLoading
}) => {
    const titlesArray = ["Razón Social", "CUIT", "Email", "Cond. IVA", ""]
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
        API_ROUTES.clientsDir.clients,
        page, refreshList, [{ query: stringSearched }]
    )

    useEffect(() => {
        setIsLoading(loadingList)
    }, [loadingList, setIsLoading])

    useEffect(() => {
        if (errorList) {
            setList(
                <tr style={{ textAlign: "center", width: "100%" }}>
                    <td> <span style={{ textAlign: "center", marginRight: "auto", marginLeft: "auto" }}> No hay clientes cargados</span></td>
                </tr>
            )
        } else {
            setList(
                dataPage.map((client, key) => {
                    let first
                    if (key === 0) {
                        first = true
                    } else {
                        first = false
                    }
                    return (
                        <ClientRow
                            key={key}
                            id={key}
                            client={client}
                            first={first}
                            page={page}
                            setClientInfo={setClientInfo}
                            setIsOpenClientForm={setIsOpenClientForm}
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
                        <h2 className="mb-0">Lista de Empresas</h2>
                    </Col>
                    <Col md="8" style={{ textAlign: "right" }}>
                        <SearchFormComponent
                            setStringSearched={setStringSearched}
                            stringSearched={stringSearched}
                            setRefreshList={setRefreshList}
                            refreshList={refreshList}
                            title="Buscar una empresa"
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
                                setClientInfo(false)
                                setIsOpenClientForm(true);
                            }}
                        >
                            Nuevo Cliente
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

export default ClientsList