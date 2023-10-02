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

const getProductosId = (idProduct) =>{
    return database.getProductosId(idProduct)
}

//Crea un nuevo prodcuto
const createProducto = (producto) => {
    return database.createProducto(producto)
}

//Solo actualiza la cantidad de un producto
const updateProducto = (producto) =>{
    return database.updateProducto(producto)
}

//Actualiza la cantidad de una venta eliminada
const incrementProducto = (idProducto,cantidad) =>{
    return database.incrementProducto(idProducto,cantidad)
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

const createUser = (user) => {
    return database.createUser(user)
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
    getProductosId: getProductosId,
    createProducto,createProducto,
    updateProducto: updateProducto,
    updateAllProducto: updateAllProducto,
    incrementProducto:incrementProducto,
    //CRUD USERS
    getUsers: getUsers,
    createUser: createUser,
    insertInfo: insertInfo,
    //CRUD FINANZAS
    getFinanzas: getFinanzas,
    createFinanzas: createFinanzas,
    getFinanzasByRange: getFinanzasByRange
})