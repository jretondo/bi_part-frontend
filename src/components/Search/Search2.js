import React from 'react'
import {
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup,
    Label,
    Button,
} from "reactstrap"

export const SearchFormButtonAddon = ({
    setStringSearched,
    stringSearched,
    refreshToggle,
    title,
    titleFn,
    fnButton
}) => {

    const changeText = (e) => {
        if (e.target.value.length === 0) {
            refreshToggle()
        }
        setStringSearched(e.target.value)
    }

    return (
        <Form
            style={{ textAlign: "left" }}
            onSubmit={e => {
                e.preventDefault()
                refreshToggle()
            }}
        >
            <FormGroup>
                <Label>{title}</Label>
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
                    <InputGroupAddon addonType="prepend">
                        <Button color="danger"
                            style={{ marginTop: "auto" }}
                            onClick={e => {
                                e.preventDefault()
                                fnButton()
                            }}>
                            {titleFn}
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </FormGroup>
        </Form>
    )
}