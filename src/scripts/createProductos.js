const queryString = window.location.search;
const listProducts = window.api.getProductos()
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('product')
let isEdit = false
let idProducto = 0
var productoSeleted = {}

let name = document.getElementById('nombre_input')
let costo = document.getElementById('precio_input')
let barcode = document.getElementById('barcode_input')
let price = document.getElementById('precioPublico_input')
let cantidad = document.getElementById('cantidad_input')


document.addEventListener('DOMContentLoaded', () => {

    if (product != null || product != undefined) {
        isEdit = true
        productoSeleted = listProducts.find((producto) => producto.ID == product)
        idProducto = productoSeleted.ID
        document.getElementById('productoName').innerHTML = productoSeleted.Name
        document.getElementById('addBtn').innerHTML = "Editar"
        showInfoProducto(productoSeleted)
    }

    document.getElementById('addBtn').addEventListener('click', () => {
        isEdit? editProducto() : addProducto()
        })

})

function showInfoProducto(producto) {
    name.value = producto.Name
    costo.value = producto.Price
    barcode.value = producto.BarCode
    price.value = producto.Price
    cantidad.value = producto.Available
}

function editProducto(){
   
const editProducto = [{ID: idProducto,Name: name.value, Price: costo.value, BarCode : barcode.value,Price_Sell: price.value, Cantidad: cantidad.value}]
//console.log(editProducto)
const updateAllProducto = window.api.updateAllProducto(editProducto)
if(updateAllProducto){
    window.location.replace("productosHome.html")
}

}

function addProducto(){
    
const newProducto = [{Name: name.value, Price: parseInt(costo.value), BarCode : parseInt(barcode.value)
    ,Price_Sell: parseInt(price.value), Cantidad: parseInt(cantidad.value)}]
const createProducto = window.api.createProducto(newProducto)
console.log(createProducto)
if(createProducto){
    window.location.replace("productosHome.html")
}
}
