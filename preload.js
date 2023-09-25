const database = require('./database')
const{contextBridge} = require('electron')

/****************************
 * CRUD VENTAS
 **************************/
const getVentas = (dateStart,dateEnd) =>{
    return database.getVentas(dateStart,dateEnd)
}

const createVentas = (producto) =>{
    return database.createVentas(producto)
}

const deleteVentas = (id, table) =>{
    return database.deleteVentas(id,table)
}


/*****************************
 * CRUD PRODUCTOS
 *****************************/

const getProductos = () =>{
    return database.getProductos()
}

/***************************
 * CRUD USER
 ****************************/
const getUsers = () =>{
return database.getUsers()
}

const insertInfo = () =>{
    return database.insertInfo()
}

/***************************
 * CRUD FINANZAS
 **************************/
const getFinanzas = () =>{
    return database.getFinanzas()
}
const createFinanzas = (id,producto) =>{
    return database.createFinanzas(id,producto)
}

const getFinanzasByRange = (dateStart,dateEnd) =>{
    return database.getFinanzasByRange(dateStart,dateEnd)
}


contextBridge.exposeInMainWorld("api",{
    getVentas: getVentas,
    createVentas: createVentas,
    deleteVentas: deleteVentas,
    getProductos: getProductos,
    getUsers: getUsers,
    insertInfo: insertInfo,
    getFinanzas: getFinanzas,
    createFinanzas: createFinanzas,
    getFinanzasByRange: getFinanzasByRange
})