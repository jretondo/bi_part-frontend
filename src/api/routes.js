const PROJECT = "bi-part"
const LOCAL_PORT = "3021"
const API_PRODUCTION_ADDRESS = "https://api-prod.nekoadmin.com.ar"
let host = ""
let publicFiles = ""

if (process.env.NODE_ENV === "development") {
    host = `http://192.168.100.8:${LOCAL_PORT}/api`
    publicFiles = `http://192.168.100.8:${LOCAL_PORT}/static`
} else {
    host = `${API_PRODUCTION_ADDRESS}/${PROJECT}/api`
    publicFiles = `${API_PRODUCTION_ADDRESS}/${PROJECT}/static`
}

const auth = host + "/auth"
const routes = host + "/routes"
const permissions = host + "/permissions"
const users = host + "/user"
const activity = host + "/activity"
const commercialClients = host + "/commercialClients"
const operativeClients = host + "/operativeClients"
const certificates = host + "/certificates"

const authDir = {
    auth
}

const activityDir = {
    activity
}

const permissionsDir = {
    permissions,
    sub: {
        list: "/list"
    }
}

const usersDir = {
    users,
    sub: {
        details: users + "/details",
        mydata: users + "/mydata",
        permissions: users + "/permissions",
        clients: users + "/clients",
        modulesPermissions: users + "/modulesPermissions"
    }
}

const commercialClientsDir = {
    commercialClients,
    sub: {
        dataTax: commercialClients + "/dataTax",
        dataTaxProof: commercialClients + "/dataTaxProof"
    }
}

const operativeClientsDir = {
    operativeClients,
    sub: {
        dataTax: operativeClients + "/dataTax",
        dataTaxProof: operativeClients + "/dataTaxProof"
    }
}

const certificatesDir = {
    certificates,
    sub: {
        csr: certificates + "/csr",
        crtKey: certificates + "/crt-key"
    }
}

const routesDir = {
    routes,
    sub: {
        dashboard: routes + "/dashboard",
        userAdmin: routes + "/users",
        clients: routes + "/clients",
        certificates: routes + "/certificates",
        sellPoints: routes + "/sellPoints",
        products: routes + "/products",
        deals: routes + "/deals",
        selfEmployed: routes + "/selfEmployed"
    }
}

const API_ROUTES = {
    publicFiles,
    authDir,
    routesDir,
    permissionsDir,
    usersDir,
    activityDir,
    commercialClientsDir,
    certificatesDir,
    operativeClientsDir
}

export default API_ROUTES