import { useCallback, useEffect, useState } from 'react';
import AlertsContext from './index';
import React from 'react';
import Alert from 'components/Alerts/Alert1';
import axios from 'axios';
import UrlNodeServer from '../../api/routes';

const AlertsProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([])

    const newAlert = useCallback((type, strong, msg) => {
        setAlerts((al) => [...al, {
            type,
            strong,
            msg
        }])
    }, [])

    const removeAlert = useCallback(() => {
        if (alerts.length > 1) {
            let alert = alerts
            alert.splice(0, 1)
            setAlerts(() => [...alert])
        } else {
            setAlerts([])
        }
    }, [alerts])

    const newActivity = async (activityDescription) => {
        const data = {
            activityDescription
        }
        await axios.post(UrlNodeServer.activityDir.activity, data, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(() => {
        }).catch(error => {
            console.error(error.message);
        })
    }

    useEffect(() => {
        if (alerts.length > 0) {
            const idTimer = setTimeout(() => {
                removeAlert()
            }, 3000);
            return () => {
                clearInterval(idTimer)
            }
        }
    }, [newAlert, alerts.length, removeAlert])

    return (
        <AlertsContext.Provider value={{
            newAlert,
            newActivity
        }}>
            {alerts.length > 0 ? alerts.map((item, key) => {
                return (
                    <Alert
                        type={item.type}
                        strong={item.strong}
                        msg={item.msg}
                        id={key}
                        key={key}
                    />
                )
            }) : null}
            {children}
        </AlertsContext.Provider>
    )
}
export default AlertsProvider