import React, { useCallback, useContext, useEffect, useState } from 'react';
import SecureRoutesContext from './index';
import { Redirect } from "react-router-dom";
import LoadingContext from 'context/loading';
import AlertsContext from 'context/alerts';

const SecureRoutesProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(true)
    const [urlRoute, setUrlRoute] = useState("")
    const { setIsLoading } = useContext(LoadingContext)
    const { newAlert } = useContext(AlertsContext)

    const fetchSecureRoute = useCallback(async () => {
        try {
            let res = await fetch(urlRoute, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('user-token')
                },
            })
            let data = await res.json()
            const status = parseInt(data.status)
            if (status === 200) {
                setIsLogin(true)
            } else {
                setIsLogin(false)
            }
        } catch (error) {

            setIsLogin(false)
        }
        setIsLogin(true)
        setUrlRoute("")
    }, [urlRoute])

    useEffect(() => {
        if (urlRoute !== "") {
            fetchSecureRoute()
        }
    }, [urlRoute, fetchSecureRoute])

    useEffect(() => {
        !isLogin && newAlert("danger", "Hubo un error!", "No tiene los permisos para ingresar al modulo!")
    }, [isLogin, newAlert])

    if (isLogin) {
        return (
            <SecureRoutesContext.Provider value={{
                setUrlRoute
            }}>
                {children}
            </SecureRoutesContext.Provider>
        )
    } else {
        setIsLoading(false)
        return (
            <Redirect
                className="text-light"
                to={process.env.PUBLIC_URL + "/auth/login"}
            />
        )
    }
}

export default SecureRoutesProvider