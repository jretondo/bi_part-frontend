import axios from 'axios';
import { useState } from 'react';
import ActionsBackend from './index';
import React from 'react';
import { processQueries } from 'function/processQueries';
import FileSaver from 'file-saver'

const ActionsBackendProvider = ({ children }) => {
    const [loadingActions, setLoadingActions] = useState(false)

    const axiosPost = async (url, data) => {
        setLoadingActions(true)
        return await axios.post(url, data, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            if (res.data.status === 201 || res.data.status === 200) {
                return {
                    error: false,
                    data: res.data.body,
                    errorMsg: ""
                }
            } else {
                return {
                    error: true,
                    data: "",
                    errorMsg: "Error desconocido!"
                }
            }
        }).catch(error => {
            if (error.response) {
                return {
                    error: true,
                    data: "",
                    errorMsg: error.response.data.body
                }
            } else {
                return {
                    error: true,
                    data: "",
                    errorMsg: error.message
                }
            }
        }).finally(() => {
            setLoadingActions(false)
        })
    }

    const axiosPut = async (url, data) => {
        setLoadingActions(true)
        return await axios.put(url, data, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            if (res.data.status === 201 || res.data.status === 200) {
                return {
                    error: false,
                    data: res.data.body,
                    errorMsg: ""
                }
            } else {
                return {
                    error: true,
                    data: "",
                    errorMsg: "Error desconocido!"
                }
            }
        }).catch(error => {
            if (error.response) {
                return {
                    error: true,
                    data: "",
                    errorMsg: error.response.data.body
                }
            } else {
                return {
                    error: true,
                    data: "",
                    errorMsg: error.message
                }
            }
        }).finally(() => {
            setLoadingActions(false)
        })
    }

    const axiosDelete = async (url, id) => {
        setLoadingActions(true)
        return await axios.delete(url + "/" + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            if (res.data.status === 200) {
                return {
                    error: false,
                    data: res.data.body,
                    errorMsg: ""
                }
            } else {
                return {
                    error: true,
                    data: "",
                    errorMsg: "Error desconocido!"
                }
            }
        }).catch(error => {
            if (error.response) {
                return {
                    error: true,
                    data: "",
                    errorMsg: error.response.data.body
                }
            } else {
                return {
                    error: true,
                    data: "",
                    errorMsg: error.message
                }
            }
        }).finally(() => {
            setLoadingActions(false)
        })
    }

    const axiosGet = async (url, id) => {
        setLoadingActions(true)
        return await axios.get(url + "/" + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            if (res.data.status === 200) {
                return {
                    error: false,
                    data: res.data.body,
                    errorMsg: ""
                }
            } else {
                return {
                    error: true,
                    data: "",
                    errorMsg: "Error desconocido!"
                }
            }
        }).catch(error => {
            if (error.response) {
                return {
                    error: true,
                    data: "",
                    errorMsg: error.response.data.body
                }
            } else {
                return {
                    error: true,
                    data: "",
                    errorMsg: error.message
                }
            }
        }).finally(() => {
            setLoadingActions(false)
        })
    }

    const axiosGetQuery = async (url, querys) => {
        setLoadingActions(true)
        let query = ""
        if (querys.length > 0) {
            query = await processQueries(querys)
        }
        return await axios.get(url + query, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            if (res.data.status === 200) {
                return {
                    error: false,
                    data: res.data.body,
                    errorMsg: ""
                }
            } else {
                return {
                    error: true,
                    data: "",
                    errorMsg: "Error desconocido!"
                }
            }
        }).catch(error => {
            if (error.response) {
                return {
                    error: true,
                    data: "",
                    errorMsg: error.response.data.body
                }
            } else {
                return {
                    error: true,
                    data: "",
                    errorMsg: error.message
                }
            }
        }).finally(() => {
            setLoadingActions(false)
        })
    }

    const axiosPostFile = async (url, data, fileType) => {
        setLoadingActions(true)
        return await axios.post(url, data, {
            responseType: 'arraybuffer',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
                Accept: fileType,
            },
        }).then(res => {
            if (res.status === 201 || res.status === 200) {
                let headerLine = res.headers['content-disposition'];
                const largo = parseInt(headerLine.length)
                let filename = headerLine.substring(21, largo);
                var blob = new Blob([res.data], { type: fileType });
                FileSaver.saveAs(blob, filename);

                return {
                    error: false,
                    data: res.data.body,
                    errorMsg: ""
                }
            } else {
                return {
                    error: true,
                    data: "",
                    errorMsg: "Error desconocido!"
                }
            }
        }).catch(error => {
            if (error.response) {
                return {
                    error: true,
                    data: "",
                    errorMsg: error.response.data.body
                }
            } else {
                return {
                    error: true,
                    data: "",
                    errorMsg: error.message
                }
            }
        }).finally(() => {
            setLoadingActions(false)
        })
    }

    const axiosGetFile = async (url, id, fileType) => {
        setLoadingActions(true)
        return await axios.get(url + "/" + id, {
            responseType: 'arraybuffer',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
                Accept: fileType,
            },
        }).then(res => {
            if (res.status === 200) {
                let headerLine = res.headers['content-disposition'];
                const largo = parseInt(headerLine.length)
                let filename = headerLine.substring(21, largo);
                var blob = new Blob([res.data], { type: fileType });
                FileSaver.saveAs(blob, filename);
                return {
                    error: false,
                    data: res.data.body,
                    errorMsg: ""
                }
            } else {
                return {
                    error: true,
                    data: "",
                    errorMsg: "Error desconocido!"
                }
            }
        }).catch(error => {
            if (error.response) {
                return {
                    error: true,
                    data: "",
                    errorMsg: error.response.data.body
                }
            } else {
                return {
                    error: true,
                    data: "",
                    errorMsg: error.message
                }
            }
        }).finally(() => {
            setLoadingActions(false)
        })
    }

    const axiosQueryFile = async (url, queries, fileType) => {
        setLoadingActions(true)
        let query = ""
        if (queries.length > 0) {
            query = await processQueries(queries)
        }
        return await axios.get(url + query, {
            responseType: 'arraybuffer',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
                Accept: fileType,
            },
        }).then(res => {
            if (res.status === 200) {
                let headerLine = res.headers['content-disposition'];
                const largo = parseInt(headerLine.length)
                let filename = headerLine.substring(21, largo);
                var blob = new Blob([res.data], { type: fileType });
                FileSaver.saveAs(blob, filename);
                return {
                    error: false,
                    data: res.data.body,
                    errorMsg: ""
                }
            } else {
                return {
                    error: true,
                    data: "",
                    errorMsg: "Error desconocido!"
                }
            }
        }).catch(error => {
            if (error.response) {
                return {
                    error: true,
                    data: "",
                    errorMsg: error.response.data.body
                }
            } else {
                return {
                    error: true,
                    data: "",
                    errorMsg: error.message
                }
            }
        }).finally(() => {
            setLoadingActions(false)
        })
    }

    const fetchPostFormData = async (url, data) => {
        return await fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        })
            .then(response => response.json())
            .then(res => {
                if (res.status === 201 || res.status === 200) {
                    return {
                        error: false,
                        data: res.body,
                        errorMsg: ""
                    }
                } else {
                    return {
                        error: true,
                        data: "",
                        errorMsg: "Error desconocido!"
                    }
                }
            }).catch(error => {
                if (error.response) {
                    return {
                        error: true,
                        data: "",
                        errorMsg: error.response.data.body
                    }
                } else {
                    return {
                        error: true,
                        data: "",
                        errorMsg: error.message
                    }
                }
            }).finally(() => {
                setLoadingActions(false)
            })
    }

    return (
        <ActionsBackend.Provider value={{
            loadingActions,
            axiosPost,
            axiosDelete,
            axiosGet,
            axiosPut,
            axiosGetQuery,
            axiosPostFile,
            axiosGetFile,
            axiosQueryFile,
            fetchPostFormData
        }}>
            {children}
        </ActionsBackend.Provider>
    )
}

export default ActionsBackendProvider