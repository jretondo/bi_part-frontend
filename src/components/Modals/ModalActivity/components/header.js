import UrlNodeServer from '../../../../api/routes';
import React from 'react';
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import { useAxiosGetList } from '../../../../hooks/useAxiosGetList';

const Header = ({
    userSearch,
    setUserSearch,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    modal,
    setPage,
    toggleRefresh
}) => {

    const {
        dataPage,
        errorList,
    } = useAxiosGetList(
        UrlNodeServer.usersDir.users,
        0,
        modal,
        [{ query: "" }]
    )

    return (
        <Row>
            <Col md="4">
                <FormGroup>
                    <Label>
                        Usuario
                    </Label>
                    <Input type="select" value={userSearch} onChange={e => setUserSearch(e.target.value)}>
                        <option value={""}>Todos los usuarios</option>
                        {errorList ? <></> :
                            (dataPage.length > 0) ?
                                // eslint-disable-next-line
                                dataPage.map((item, key) => {
                                    return (
                                        <option key={key} value={item.id} >{`${item.name} ${item.lastname} (usuario: ${item.user})`}</option>
                                    )
                                }) : <></>}
                    </Input>
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                    <Label>
                        Fecha Desde
                    </Label>
                    <Input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                    <Label>
                        Fecha Hasta
                    </Label>
                    <Input type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
                </FormGroup>
            </Col>
            <Col md="2">
                <Button color="primary" onClick={() => {
                    setPage(1)
                    toggleRefresh()
                }} style={{ marginTop: "31px" }} >
                    Listar
                </Button>
            </Col>
        </Row>
    )
}

export default Header