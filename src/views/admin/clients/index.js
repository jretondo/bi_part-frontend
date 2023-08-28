import React, { useContext, useEffect, useState } from 'react';
import secureContext from 'context/secureRoutes';
import apiRoutes from '../../../api/routes';
import { Container } from 'reactstrap';
import Header from 'components/Headers/Header';
import loadingContext from 'context/loading';
import ClientsForm from './form';
import ClientsList from './list';

const ClientsModule = () => {
    const [isOpenClientForm, setIsOpenClientForm] = useState(false)
    const [clientInfo, setClientInfo] = useState(false)

    const { setUrlRoute } = useContext(secureContext)
    const { setIsLoading } = useContext(loadingContext)

    useEffect(() => {
        setUrlRoute(apiRoutes.routesDir.sub.clients)
    }, [setUrlRoute])

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                {
                    isOpenClientForm ?
                        <ClientsForm
                            clientInfo={clientInfo}
                            setIsOpenClientForm={setIsOpenClientForm}
                            setIsLoading={setIsLoading}
                        /> :
                        <ClientsList
                            setClientInfo={setClientInfo}
                            setIsOpenClientForm={setIsOpenClientForm}
                            setIsLoading={setIsLoading}
                        />
                }
            </Container>
        </>
    )
}

export default ClientsModule