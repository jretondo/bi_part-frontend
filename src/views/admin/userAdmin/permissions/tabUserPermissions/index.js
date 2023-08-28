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

    const toggleClientEnabled = (enabled, id) => {
        setPermissionsList(permissions => permissions.map((permission) => {
            if (permission.client_id === id) {
                return ({
                    client_id: permission.client_id,
                    business_name: permission.business_name,
                    enabled: !enabled,
                    modules: permission.modules
                })
            } else {
                return (permission)
            }
        }))
    }

    const changePermissionGrade = (grade, clientId, module) => {
        const newModule = {
            module_id: module.module_id,
            module_name: module.module_name,
            permission_grade: grade
        }

        setPermissionsList(permissions => permissions.map((permission) => {
            if (permission.client_id === clientId) {
                const modules = permission.modules.map((moduleItem) => {
                    if (moduleItem.module_id === module.module_id) {
                        return newModule
                    } else {
                        return moduleItem
                    }
                })
                return ({
                    client_id: permission.client_id,
                    business_name: permission.business_name,
                    enabled: permission.enabled,
                    modules: modules
                })
            } else {
                return (permission)
            }
        }))
    }

    useEffect(() => {
        let navClient = <></>
        let tabClient = <></>
        // eslint-disable-next-line
        filteredPermissionsList.map((client, key) => {
            navClient = <>
                {navClient}
                <NavClient
                    key={key}
                    id={client.client_id}
                    name={client.business_name}
                    clientActive={clientActive}
                    setClientActive={setClientActive}
                    enabled={client.enabled}
                />
            </>
            tabClient = <>
                {tabClient}
                <TabClient
                    key={key}
                    id={client.client_id}
                    toggleEnabled={toggleClientEnabled}
                    enabled={client.enabled}
                    modules={client.modules}
                    changePermissionGrade={changePermissionGrade}
                /></>
        })

        setNavClients(navClient)
        setTabsClients(tabClient)
        // eslint-disable-next-line
    }, [filteredPermissionsList, clientActive])

    useEffect(() => {
        const filteredList = permissionsList.filter((permission) => permission.business_name.toLowerCase().includes(filterText.toLowerCase()))
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