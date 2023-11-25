import apiRoutes from '../../../../api/routes'
import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap'
import UserRow from './row'
import { SearchFormComponent } from 'components/Search/Search1'
import Pagination from 'components/Pagination/Pages'
import { TableList } from '../../../../components/Lists/TableList'
import { useAxiosGetList } from '../../../../hooks/useAxiosGetList';

const titlesArray = ["Nombre", "Usuario", "Email", "Telefóno", ""]

const UserList = ({
    setNewForm,
    setDetBool,
    setIdDetail,
    setPermissionsBool,
    setIdUser,
    setUserName,
    setIsLoading,
    setModulePermissionsBool
}) => {
    const [list, setList] = useState(<></>)
    const [page, setPage] = useState(1)
    const [refreshList, setRefreshList] = useState(false)
    const [stringSearched, setStringSearched] = useState("")

    const {
        pagesQuantity,
        dataPage,
        errorList,
        loadingList
    } = useAxiosGetList(
        apiRoutes.usersDir.users,
        page, refreshList, [{ query: stringSearched }]
    )

    useEffect(() => {
        setIsLoading(loadingList)
    }, [loadingList, setIsLoading])

    useEffect(() => {
        if (errorList) {
            setList(
                <tr style={{ textAlign: "center", width: "100%" }}>
                    <td> <span style={{ textAlign: "center", marginRight: "auto", marginLeft: "auto" }}> No hay usuarios cargados</span></td>
                </tr>
            )
        } else {
            setList(
                dataPage.map((item, key) => {
                    let first
                    if (key === 0) {
                        first = true
                    } else {
                        first = false
                    }
                    return (
                        <UserRow
                            id={key}
                            key={key}
                            item={item}
                            refreshToggle={() => setRefreshList(!refreshList)}
                            setDetBool={setDetBool}
                            setIdDetail={setIdDetail}
                            first={first}
                            page={page}
                            setPage={setPage}
                            setPermissionsBool={setPermissionsBool}
                            setModulePermissionsBool={setModulePermissionsBool}
                            setIdUser={setIdUser}
                            setUserName={setUserName}
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
                        <h2 className="mb-0">Lista de Usuarios</h2>
                    </Col>
                    <Col md="8" style={{ textAlign: "right" }}>
                        <SearchFormComponent
                            setStringSearched={setStringSearched}
                            stringSearched={stringSearched}
                            setRefreshList={setRefreshList}
                            refreshList={refreshList}
                            title="Buscar un Usuario"
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
                                setNewForm(true);
                            }}
                        >
                            Nuevo Usuario
                        </Button>
                    </Col>
                    <Col>
                        {!pagesQuantity ? null : <Pagination
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

export default UserList