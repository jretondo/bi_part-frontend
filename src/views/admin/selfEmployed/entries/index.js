import API_ROUTES from 'api/routes';
import Header from 'components/Headers/Header';
import SecureRoutesContext from 'context/secureRoutes';
import React, { useContext, useEffect } from 'react';
import { Container } from 'reactstrap';

const SelfEmployedEntries = () => {
    const { setUrlRoute } = useContext(SecureRoutesContext)

    useEffect(() => {
        setUrlRoute(API_ROUTES.routesDir.sub.selfEmployed)
    }, [setUrlRoute])

    return (<>
        <Header />
        <Container className="mt--7" fluid>

        </Container>
    </>)
}

export default SelfEmployedEntries