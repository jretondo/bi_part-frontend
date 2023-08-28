import React, { useEffect, useState } from 'react';
import { Col, FormGroup, Input, Label, Nav, Row, TabContent } from 'reactstrap';
import NavClient from './navClient';
import TabClient from './tabClient';

const TabUserPermission = ({ permissionsList, setPermissionsList }) => {
    const [clientActive, setClientActive] = useState(0)
    const [navClients, setNavClients] = useState(<></>)
    const [tabsClients, setTabsClients] = useState(<></>)
    const [filterText, setFilterText] = useState("")
    const [filteredPermissionsList, setFilteredPermissionsList] = useState([])

    const changePermissionGrade = (grade, moduleId) => {
        setPermissionsList(modules => modules.map((module) => {
            if (module.module_id === moduleId) {
                return {
                    module_id: module.module_id,
                    module_name: module.module_name,
                    permission_grade: grade,
                    enabled: module.enabled
                }
            } else {
                return module
            }
        }))
    }

    useEffect(() => {
        let navClient = <></>
        let tabClient = <></>
        // eslint-disable-next-line
        filteredPermissionsList.map((module, key) => {
            navClient = <>
                {navClient}
                <NavClient
                    key={key}
                    id={module.module_id}
                    name={module.module_name}
                    clientActive={clientActive}
                    setClientActive={setClientActive}
                    grade={module.permission_grade}
                />
            </>
            tabClient = <>
                {tabClient}
                <TabClient
                    key={key}
                    id={module.module_id}
                    module={module}
                    changePermissionGrade={changePermissionGrade}
                /></>
        })

        setNavClients(navClient)
        setTabsClients(tabClient)
        // eslint-disable-next-line
    }, [filteredPermissionsList, clientActive])

    useEffect(() => {
        const filteredList = permissionsList.filter((permission) => permission.module_name.toLowerCase().includes(filterText.toLowerCase()))
        setFilteredPermissionsList(() => filteredList)
    }, [filterText, permissionsList])

    return (<>
        <Row>
            <Col md="12">
                <FormGroup>
                    <Label>Filtro</Label>
                    <Input value={filterText} onChange={e => setFilterText(e.target.value)} />
                </FormGroup>
            </Col>
        </Row>
        <Nav tabs>
            {navClients}
        </Nav>
        <TabContent activeTab={clientActive}>
            {tabsClients}
        </TabContent>
    </>)
}

export default TabUserPermission