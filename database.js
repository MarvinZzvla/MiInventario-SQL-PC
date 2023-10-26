const{ipcRenderer} = require('electron');

ipcRenderer.send('userData');
ipcRenderer.on('db-path',(event,data) => {
    const sqlite3 = require('better-sqlite3');
    const db = new sqlite3(data);
    
    
/****************************************************************************************************************************************
 * CRUD VENTAS
 ******************************************************************************************************************************************/
exports.getVentas = (dateStart, dateEnd) => {
    //console.log("Esto es la fecha " + dateStart)
    let stringQuery = "SELECT v.ID,v.Date, v.Quantity, v.Price, p.Price_Sell,v.FK_Product idProducto, p.Price Precio_Produccion, p.Name,p.Available  FROM VENTAS v INNER JOIN Productos p ON v.FK_Product = p.ID WHERE Date >= '"+dateStart+"' and Date <= '"+dateEnd+"'" 
    let query = db.prepare(stringQuery);
    const row = query.all();
    return row
}

/******************************************************************************************
 * Create Ventas
 * Crea una nueva venta y retorna el ID asignado
 ********************************************************************************************/
exports.createVentas = (producto) => {
let date = new Date();
date = date.toISOString().split('T')[0]
let stringQuery = 'INSERT INTO Ventas (FK_Product,Date,Quantity,Price) VALUES(?,?,?,?)'
const query = db.prepare(stringQuery)
const result = query.run(producto.ID,date.toString(),producto.Cantidad,producto.Total)
return result.lastInsertRowid
}

exports.deleteVentas = (id,table) => {
    let query = db.prepare("DELETE FROM " +table+" WHERE ID = ?");
    let result = query.run(id)

    return result.changes > 0
}
/************************************************************************************************************************
 * CRUD PRODUCTOS
 **************************************************************************************************************************/

/**********************************************************
 * Get Productos
 * Obtiene toda la lista de productos disponibles
 ****************************************************/
exports.getProductos =() => {
    let query = db.prepare("SELECT * FROM PRODUCTOS");
    const row = query.all();
    return row
}

/************************************************************
 * Get Productos ID
 * Obtiene un producto con su ID
 **********************************************************/
exports.getProductosId =(idProducto) => {
    let query = db.prepare("SELECT * FROM PRODUCTOS WHERE ID ="+idProducto);
    const row = query.all()
    return row
}
/********************************************************
 * Create Producto
 * Crea un nuevo producto y lo inserta en la table de productos
 * con todas sus propiedades
 *********************************************************/
exports.createProducto = (thisProducto) => {
    let producto = thisProducto[0]
    let stringQuery = "INSERT INTO Productos (Name,Available,Price,Price_Sell,BarCode) VALUES (?,?,?,?,?)"
    let query = db.prepare(stringQuery)
    let result = query.run(producto.Name,producto.Cantidad, producto.Price, producto.Price_Sell, producto.BarCode)
    return result.lastInsertRowid
}
/**********************************************************
 * Update Producto
 * Actualiza la cantidad de un solo producto
 ************************************************************/
exports.updateProducto =(producto) => {
let cantidad = producto.Available - producto.Cantidad
let stringQuery = "UPDATE Productos SET Available = ? WHERE id = ?"
let query = db.prepare(stringQuery)
let result = query.run(cantidad,producto.ID)
return result.changes > 0
}

/************************************************************
 * INCREMENT PRODUCTO
 * Al eliminar una venta devolver la cantidad 
 **************************************************************/
exports.incrementProducto = (idProducto, cantidad) =>{
    let stringQuery = "UPDATE Productos SET Available = ? WHERE id = ?"
    let query = db.prepare(stringQuery)
    let result = query.run(cantidad, idProducto)
    return result.changes > 0
}

/***********************************************************
 * Update ALL Producto
 * Actualiza todas las propiedades de un producto
 **************************************************************/
exports.updateAllProducto = (thisProducto) => {
    let producto = thisProducto[0]
    let stringQuery = "UPDATE Productos SET Name = ?,Available = ?, Price = ?, Price_Sell=?,BarCode=? WHERE id = ?"
    let query = db.prepare(stringQuery)
    let result = query.run(producto.Name,producto.Cantidad, producto.Price, producto.Price_Sell, producto.BarCode, producto.ID)
    return result.changes > 0
}

/********************************************************************************
 * CRUD USERS
 ************************************************************************************/
exports.getUsers = () => {
    let query = db.prepare("SELECT * FROM Usuarios");
    const row = query.all();
    return row
}


exports.createUser = (user) => {
    //let stringQuery = 'INSERT INTO Ventas (FK_Product,Date,Quantity,Price) VALUES(?,?,?,?)'
    let stringQuery = 'INSERT INTO Usuarios (Name,Lastname, BussinessName,Password,Admin,Phone,Email) VALUES (?,?,?,?,?,?,?)'
    let query = db.prepare(stringQuery)
    let result = query.run(user.Name,user.LastName,user.Negocio,user.Password,user.isAdmin,user.Phone,user.Email)
    return result.lastInsertRowid
    
}

exports.insertInfo = () => {
    const query = db.prepare("INSERT INTO Info (Name) VALUES(?)")
    const result = query.run("Marvin")
    return result.lastInsertRowid
}

/****************************************************************************************
 * CRUD FINANZAS
 *****************************************************************************************/
exports.getFinanzas = () => {

    /******** READ TODAY **********/
    let todayDate = new Date().toLocaleDateString().split('/')
    todayDate = `${todayDate[2]}/${todayDate[1] < 10 ? todayDate[1] = '0'+ todayDate[1] :todayDate[1]}/${todayDate[0] < 10 ? todayDate[0] = '0'+ todayDate[0] :todayDate[0]}`
    const queryDay = db.prepare("SELECT SUM(Total) Total, SUM(Total_Ganancias) Total_Ganancias  FROM Finanzas WHERE Date  = '"+todayDate+"';")
    const rowDay = queryDay.all()


    /******* READ MONTH ***********/
    let dateSplit = todayDate.split('/')
    let monthDate = `${dateSplit[0]}/${dateSplit[1]}`
    const queryMonth = db.prepare("SELECT SUM(Total) Total, SUM(Total_Ganancias) Total_Ganancias  FROM Finanzas WHERE Date >= '"+monthDate+"/01' and Date <= '"+monthDate+"/31'")
    const rowMonth = queryMonth.all()

    /******* READ YEAR *********** */
    let yearDate = dateSplit[0]
    const queryYear = db.prepare("SELECT SUM(Total) Total, SUM(Total_Ganancias) Total_Ganancias  FROM Finanzas WHERE Date >= '"+yearDate+"/01/01' and Date <= '"+yearDate+"/12/31'")
    const rowYear = queryYear.all()

    const FinanzasDefaults = {
        finanzasDay: rowDay,
        finanzasMonth: rowMonth,
        finanzasYear: rowYear
    }

   return FinanzasDefaults
}

/**********************************************************************************************
 * Create Finanzas
 * Crea una nueva finanza despues de una venta
 *********************************************************************************************/
exports.createFinanzas = (id,producto) => {
var mydate = new Date().toISOString();
mydate = mydate.split("T")[0].split("-").join("/")
let stringQuery = 'INSERT INTO Finanzas (Date,Total,Total_Ganancias,FK_VENTA) VALUES(?,?,?,?)'
let query = db.prepare(stringQuery)
const result = query.run(mydate,producto.Total,producto.Total_Ganancias,id)

// const query = db.prepare(stringQuery)
// const result = query.run(producto.ID,date.toString(),producto.Cantidad,producto.Total)
 return result.lastInsertRowid
}


/******************************************************************************
 * Get Finanzas by Range
 * Busca las finanzas dentro de un rango de fecha seleccionado
 ******************************************************************************/
exports.getFinanzasByRange = (dateStart, dateEnd) => {
    
    let stringQuery = "SELECT SUM(Total) Total, SUM(Total_Ganancias) Total_Ganancias  FROM Finanzas WHERE Date >= '"+dateStart+"' and Date <= '"+dateEnd+"'" 
    let query = db.prepare(stringQuery);
    const row = query.all();
    return row
}


/*********************************************************************************
 * GET DATA FROM DATA
 * Para Registrar los pagos o subscripciones
 *********************************************************************************/
exports.checkSubscription = () => {
    let stringQuery = "SELECT * FROM DATA"
    let query = db.prepare(stringQuery);
    const row = query.all();
    return row
}
/*********************************************************************************
 * UPDATE SUBSCRIPTION
 **********************************************************************************/
exports.updateSubscription = (DateCompra,DateExpired) => {
    let stringQuery = "UPDATE Data SET Pay = ?,DateCompra = ?, DateExpired = ? WHERE ID = ?"
    let query = db.prepare(stringQuery)
    let result = query.run(1,DateCompra,DateExpired,1)
    return result.changes > 0
}
})
