import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import Header from "components/Headers/Header.js";
import UserList from './list'
import UserForm from './form'
import UserPermissions from './permissions'
import secureContext from 'context/secureRoutes';
import apiRoutes from '../../../api/routes';
import loadingContext from 'context/loading';
import UserModulePermissions from './modulePermissions';

const UserAdmin = () => {
    const [newForm, setNewForm] = useState(false)
    const [detBool, setDetBool] = useState(false)
    const [idDetail, setIdDetail] = useState(0)
    const [permissionsBool, setPermissionsBool] = useState(false)
    const [modulePermissionsBool, setModulePermissionsBool] = useState(false)
    const [idUser, setIdUser] = useState(0)
    const [userName, setUserName] = useState("")

    const { setUrlRoute } = useContext(secureContext)
    const { setIsLoading } = useContext(loadingContext)

    useEffect(() => {
        if (detBool || permissionsBool || modulePermissionsBool) {
            setNewForm(true)
        }
    }, [detBool, permissionsBool, modulePermissionsBool])

    useEffect(() => {
        if (!newForm) {
            setDetBool(false)
            setPermissionsBool(false)
            setModulePermissionsBool(false)
        }
    }, [newForm])

    useEffect(() => {
        setUrlRoute(apiRoutes.routesDir.sub.userAdmin)
    }, [setUrlRoute])

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                {
                    !newForm ?
                        <UserList
                            setNewForm={setNewForm}
                            setDetBool={setDetBool}
                            setIdDetail={setIdDetail}
                            setPermissionsBool={setPermissionsBool}
                            setModulePermissionsBool={setModulePermissionsBool}
                            setIdUser={setIdUser}
                            setUserName={setUserName}
                            setIsLoading={setIsLoading}
                        /> :
                        permissionsBool ?
                            <UserPermissions
                                setNewForm={setNewForm}
                                idUser={idUser}
                                userName={userName}
                                setIsLoading={setIsLoading}
                            />
                            :
                            modulePermissionsBool ?
                                <UserModulePermissions
                                    setNewForm={setNewForm}
                                    idUser={idUser}
                                    userName={userName}
                                    setIsLoading={setIsLoading}
                                /> :
                                <UserForm
                                    setNewForm={setNewForm}
                                    idDetail={idDetail}
                                    detBool={detBool}
                                    setIsLoading={setIsLoading}
                                />
                }
            </Container>
        </>
    )
}

export default UserAdmin