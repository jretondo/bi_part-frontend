import React from 'react'
import {
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup,
    Row,
} from "reactstrap"
import Col from 'reactstrap/lib/Col'

export const SearchFormComponent = ({
    setStringSearched,
    stringSearched,
    setRefreshList,
    refreshList,
    title
}) => {

    const searchWord = () => {
        setRefreshList(!refreshList)
    }

    const changeText = (e) => {
        if (e.target.value.length === 0) {
            setRefreshList(!refreshList)
        }
        setStringSearched(e.target.value)
    }

    return (
        <Form
            className="navbar-search navbar-search-dark form-inline mr-3 d-md-flex ml-lg-auto"
            style={{ textAlign: "right" }}
            onSubmit={e => {
                e.preventDefault()
                searchWord()
            }}
        >
            <FormGroup className="mb-0" style={{ marginLeft: "auto" }}>
                <Row>
                    <Col style={{ textAlign: "center", paddingTop: "16px", paddingRight: 0 }} >
                        <span>{title}</span>
                    </Col>
                    <Col md="6" >
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fas fa-search" style={{ color: "black" }} />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                placeholder="Buscar"
                                type="text"
                                style={{ color: "black" }}
                                value={stringSearched}
                                onChange={e => changeText(e)}
                                id="inp-search"
                            />
                        </InputGroup>
                    </Col>
                </Row>
            </FormGroup>
        </Form>
    )
}