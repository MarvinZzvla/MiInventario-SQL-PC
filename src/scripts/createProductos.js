//Variables globales
const queryString = window.location.search;
const listProducts = window.api.getProductos()
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('product')
let isEdit = false
let idProducto = 0
var productoSeleted = {}

//GET input from form
let name = document.getElementById('nombre_input')
let costo = document.getElementById('precio_input')
let barcode = document.getElementById('barcode_input')
let price = document.getElementById('precioPublico_input')
let cantidad = document.getElementById('cantidad_input')


document.addEventListener('DOMContentLoaded', () => {
    //If product URL variable is not empty
    if (product != null || product != undefined) {
        //isEdit it's a variable to check if the product is being editable
        isEdit = true
        //find the product of the listProducts and fill the fields with its properties
        productoSeleted = listProducts.find((producto) => producto.ID == product)
        idProducto = productoSeleted.ID
        document.getElementById('productoName').innerHTML = productoSeleted.Name
        document.getElementById('addBtn').innerHTML = "Editar"
        //Call the function showInfoProducto to display the info founded
        showInfoProducto(productoSeleted)
    }

    document.getElementById('addBtn').addEventListener('click', () => {
        isEdit ? editProducto() : addProducto()
    })

})
/***************************************************
 * Show Info Producto
 * Display de the information and properties founded 
 * Replace the inputs fields with the information
 *****************************************************/
function showInfoProducto(producto) {
    console.log(producto)
    name.value = producto.Name
    costo.value = producto.Price
    barcode.value = producto.BarCode
    price.value = producto.Price_Sell
    cantidad.value = producto.Available
}

/*****************************************************
 * Edit Producto
 * Create a Object with the product that has been edited
 * Call the database and send the product edited to the database
 *****************************************************************/
function editProducto() {

    //Create a object with the product that has been edited
    const editProducto = [{ ID: idProducto, Name: name.value, Price: costo.value, BarCode: barcode.value, Price_Sell: price.value, Cantidad: cantidad.value }]
    //console.log(editProducto)
    //GET if the information was saved correctly in the database
    const updateAllProducto = window.api.updateAllProducto(editProducto)
    //If all ok go back to producto Home
    if (updateAllProducto) {
        window.location.replace("productosHome.html")
    }
}
/*********************************************************************************
 * Add Producto
 * Create a new product Object with information that user enter into the input
 * Call the database to save the new product
 ********************************************************************************/
function addProducto() {
    //Create  a new product Object
    if(!checkFields()){
        console.log("No se puede guardar un producto vacio")
        return
    }
    const newProducto = [{
        Name: name.value, Price: parseInt(costo.value), BarCode: parseInt(barcode.value)?9999999:parseInt(barcode.value)
        , Price_Sell: parseInt(price.value), Cantidad: parseInt(cantidad.value)
    }]
    //Call the database and wait for the answer 
    const createProducto = window.api.createProducto(newProducto)
    //console.log(createProducto)
    //If all ok, go back to the product home
    if (createProducto) {
        window.location.replace("productosHome.html")
    }
}

function checkFields(){
    return name.value !== '' && costo.value !== '' && price.value !== '' && cantidad.value !== ''
}
