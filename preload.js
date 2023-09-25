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

//Crea un nuevo prodcuto
const createProducto = (producto) => {
    return database.createProducto(producto)
}

//Solo actualiza la cantidad de un producto
const updateProducto = (producto) =>{
    return database.updateProducto(producto)
}
//Actualiza todos los campos de un producto
const updateAllProducto = (producto) =>{
    return database.updateAllProducto(producto)
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
    //CRUD VENTAS
    getVentas: getVentas,
    createVentas: createVentas,
    deleteVentas: deleteVentas,
    //CRUD PRODUCTOS
    getProductos: getProductos,
    createProducto,createProducto,
    updateProducto: updateProducto,
    updateAllProducto: updateAllProducto,
    //CRUD USERS
    getUsers: getUsers,
    insertInfo: insertInfo,
    //CRUD FINANZAS
    getFinanzas: getFinanzas,
    createFinanzas: createFinanzas,
    getFinanzasByRange: getFinanzasByRange
})