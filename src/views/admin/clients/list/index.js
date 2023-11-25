import API_ROUTES from '../../../../api/routes';
import { useAxiosGetList } from 'hooks/useAxiosGetList';
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, Row } from 'reactstrap';
import { SearchFormComponent } from 'components/Search/Search1';
import PrincipalButtonAccordion from 'components/Accordion/ListAccordion/principalButton';
import SubButtonAccordion from 'components/Accordion/ListAccordion/subButton';
import ClientDetails from './clientDetails';
import PaginationComp from '../../../../components/Pagination/Pages';

const ClientsList = ({
    setIsLoading,
    setCommercialClientInfo,
    setOperativeClientInfo,
    setIsOpenClientForm,
    setIsOperativeClient
}) => {
    const [page, setPage] = useState(1)
    const [refreshList, setRefreshList] = useState(false)
    const [stringSearched, setStringSearched] = useState("")
    const [activeIds, setActiveIds] = useState([])
    const [clientsListHtml, setClientsListHtml] = useState(<h3>No hay clientes para mostrar</h3>)

    const {
        pagesQuantity,
        dataPage,
        loadingList
    } = useAxiosGetList(
        API_ROUTES.commercialClientsDir.commercialClients,
        page, refreshList, [{ query: stringSearched }]
    )

    useEffect(() => {
        setIsLoading(loadingList)
    }, [loadingList, setIsLoading])

    const modulesBuilder = (clientsList, parentId, level, isParentOpen, isOperative) => {
        let bgColor = "#AD9CFF"
        switch (level) {
            case 1:
                bgColor = "#AD9CFF"
                break;
            case 2:
                bgColor = "#7E88E0"
                break;
            default:
                bgColor = "#e6e6e6"
                break;
        }
        return clientsList.map((client, key) => {
            return <div key={key}>
                {!isOperative ?
                    <div key={key}>
                        <PrincipalButtonAccordion
                            name={`${client.business_name} (${client.document_number})`}
                            key={client.id}
                            id={client.id}
                            open={(activeIds.includes(client.id))}
                            setActiveId={setActiveIds}
                            hasSub={true}
                            openNewForm={() => {
                                setOperativeClientInfo(false)
                                setIsOperativeClient(true)
                                setCommercialClientInfo(client)
                                setIsOpenClientForm(true)
                            }}
                            setClientInfo={setCommercialClientInfo}
                            openUpdate={() => {
                                setIsOperativeClient(false)
                                setCommercialClientInfo(client)
                                setIsOpenClientForm(true)
                            }}
                            refresh={() => setRefreshList(!refreshList)}
                        />
                        <Collapse isOpen={activeIds.includes(client.id)} key={key}>
                            <ClientDetails
                                client={client}
                                isCommercialClient={true}
                                bgColor={bgColor}
                            />
                        </Collapse>
                        {(client.OperativeClients && client.OperativeClients.length > 0 && isParentOpen) && modulesBuilder(client.OperativeClients, client.id, (level + 1), activeIds.includes(client.id), true)}
                    </div> :
                    <Collapse isOpen={activeIds.includes(parentId)} key={key}>
                        <SubButtonAccordion
                            level={level}
                            name={`${client.business_name} (${client.document_number})`}
                            key={client.id}
                            id={client.id}
                            open={activeIds.includes(client.id)}
                            setActiveId={setActiveIds}
                            setClientInfo={setCommercialClientInfo}
                            setIsOperativeClient={setIsOperativeClient}
                            hasSub={true}
                            bgColor={bgColor}
                            openUpdate={() => {
                                setIsOperativeClient(true)
                                setOperativeClientInfo(client)
                                setIsOpenClientForm(true)
                            }}
                            refresh={() => setRefreshList(!refreshList)}
                        />
                        <Collapse isOpen={activeIds.includes(client.id)} key={key}>
                            <ClientDetails
                                bgColor={bgColor}
                                width={"90%"}
                                client={client}
                                isCommercialClient={false}
                            />
                        </Collapse>
                    </Collapse>
                }
            </div>
        })
    }


    useEffect(() => {
        dataPage.length > 0 && setClientsListHtml(modulesBuilder(dataPage, false, 0, true, false))
        dataPage.length === 0 && setClientsListHtml(<h3>No hay clientes para mostrar</h3>)
        // eslint-disable-next-line
    }, [dataPage, activeIds])

    return (
        <Card>
            <CardHeader className="border-0">
                <Row>
                    <Col md="4" >
                        <h2 className="mb-0">Lista de Clientes</h2>
                    </Col>
                    <Col md="8" style={{ textAlign: "right" }}>
                        <SearchFormComponent
                            setStringSearched={setStringSearched}
                            stringSearched={stringSearched}
                            setRefreshList={setRefreshList}
                            refreshList={refreshList}
                            title="Buscar un cliente"
                        />
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                {clientsListHtml}
            </CardBody>
            <CardFooter>
                <Row>
                    <Col md="6">
                        <Button
                            color="primary"
                            onClick={e => {
                                e.preventDefault();
                                setIsOperativeClient(false)
                                setCommercialClientInfo(false)
                                setIsOpenClientForm(true);
                            }}
                        >
                            Nuevo Cliente Comercial
                        </Button>
                    </Col>
                    <Col>
                        {<PaginationComp
                            page={page}
                            setPage={setPage}
                            pagesQuantity={pagesQuantity}
                        />}
                    </Col>
                </Row>
            </CardFooter>
        </Card>
    )
}

export default ClientsList