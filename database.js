const sqlite3 = require('better-sqlite3');
const path = require('path');

// Crear una instancia de la base de datos SQLite
const db = new sqlite3(path.join(__dirname,"mysqlite.db"));

/*****************
 * CRUD VENTAS
 *********************/
exports.getVentas = (dateStart, dateEnd) => {
    //console.log("Esto es la fecha " + dateStart)
    let stringQuery = "SELECT v.ID,v.Date, v.Quantity, v.Price, p.Price_Sell, p.Price Precio_Produccion, p.Name,p.Available  FROM VENTAS v INNER JOIN Productos p ON v.FK_Product = p.ID WHERE Date >= '"+dateStart+"' and Date <= '"+dateEnd+"'" 
    let query = db.prepare(stringQuery);
    const row = query.all();
    return row
}

exports.deleteVentas = (id,table) => {
    let query = db.prepare("DELETE FROM " +table+" WHERE ID = ?");
    let result = query.run(id)

    return result.changes > 0
}

exports.getProductos =() => {
    let query = db.prepare("SELECT * FROM PRODUCTOS");
    const row = query.all();
    return row
}

/**********************
 * CRUD USERS
 **********************/
exports.getUsers = () => {
    let query = db.prepare("SELECT * FROM Usuarios");
    const row = query.all();
    return row
}

exports.insertInfo = () => {
    const query = db.prepare("INSERT INTO Info (Name) VALUES(?)")
    const result = query.run("Marvin")
    return result.lastInsertRowid
}

/***********************
 * CRUD FINANZAS
 ************************/
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

exports.getFinanzasByRange = (dateStart, dateEnd) => {
    
    let stringQuery = "SELECT SUM(Total) Total, SUM(Total_Ganancias) Total_Ganancias  FROM Finanzas WHERE Date >= '"+dateStart+"' and Date <= '"+dateEnd+"'" 
    let query = db.prepare(stringQuery);
    const row = query.all();
    return row
}