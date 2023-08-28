import React from 'react';
import { Button, Col, Row, TabPane } from 'reactstrap';
import ModuleItem from './moduleItem';

const TabClient = ({ id, enabled, toggleEnabled, modules, changePermissionGrade }) => {

    return (
        <TabPane tabId={id} className="p-5" style={{ background: "#073863" }}>
            <Row className="pt-4">
                <Col md="12">
                    <Button
                        style={{ width: "100%" }}
                        color={enabled ? "success" : "danger"}
                        onClick={e => {
                            e.preventDefault()
                            toggleEnabled(enabled, id)
                        }}
                    >
                        {enabled ? "Habilitado" : "Deshabilitado"}
                    </Button>
                </Col>
            </Row>
            {
                enabled && <>
                    <h3 className='pt-4 text-light'>Permisos:</h3>
                    <Row className="pt-2">
                        {modules.map((module, key) => {
                            return (<ModuleItem
                                key={key}
                                module={module}
                                changePermission={changePermissionGrade}
                                clientId={id}
                            />)
                        })}
                    </Row>
                </>
            }
        </TabPane>
    )
}

export default TabClient