//Variables globales
const listProducts = window.api.getProductos()
let productosRoot = document.getElementById('productosRoot')
let productosDropdown = document.getElementById('productosDropdown')
let nameProducto = document.getElementById('nombre_input')
let precioVenta = document.getElementById('precio_input')
let cantidadVenta = document.getElementById('cantidad_input')
let productoPosition = 0
let actualProductoPosition = 0
let productoActual;
let findProduct = false
const productosCart = [{'Total': 0}]
cantidadVenta.value = 1
console.log(listProducts)


//Detectar cambios en el input 
nameProducto.addEventListener('input', buscarProducto)

//Obtener lista de  productos y desplegar en un dropdown
listProducts.map((producto) => {
    productosDropdown.innerHTML += '<li><a class="dropdown-item" href="#">'+producto.Name+'</a></li>' 
})

//Obtener el codigo de barra del producto y buscar en la lista de productos
var btnSearch = document.getElementById("btnBuscarProducto")
btnSearch.addEventListener("click", buscarProducto)

//Agregar los productos a una lista de objetos para mostrar el resultado de la venta
var btnAdd = document.getElementById("addBtn")
btnAdd.addEventListener("click", agregarProducto)


// Obtener el elemento del menú desplegable
var dropdownMenu = document.querySelector('.dropdown-menu');

// Agregar un evento click al menú desplegable
dropdownMenu.addEventListener('click', function (event) {
  // Verificar si el elemento clickeado es una opción del dropdown
  if (event.target.classList.contains('dropdown-item')) {
    // Obtener el texto de la opción seleccionada
    var textoSeleccionado = event.target.textContent;

    //Colocar la opción seleccionada en el campo nombre    
    productoActual = document.getElementById('nombre_input')
    productoActual.value = textoSeleccionado
    //Se hace un bucle para obtener buscar la posicion del producto en un array de objetos para obtener
    //la información del producto com su precio de venta
    let indice = 0
    listProducts.map((producto) => {
        indice++
        if(producto.Name === textoSeleccionado){
            productoPosition = indice
        }
    })
    //Si el producto coincide se llama la funcion buscar producto
    buscarProducto()
    precioVenta.value = listProducts[productoPosition-1].Price_Sell
  }
});

/*********************************************************************************
 * Buscar Producto
 * Es una funcion para leer en tiempo real el producto que esta siendo buscado
 * en la base de datos, buscando por el nombre y el codigo de barra
 * si encuentra el producto muestra sus datos en pantalla
 *********************************************************************************/
function buscarProducto(){
  //Variables locales
  let indice = 0
  actualProductoPosition = 0
  findProduct = false

  //Se lee los productos para encontrar el producto por el nombre o codigo de barras
  listProducts.map((producto) => {
      indice++
      if(producto.BarCode.toString() === nameProducto.value || producto.Name.toString() === nameProducto.value) {
        findProduct = true
        actualProductoPosition = indice
      }
      
  })
  //Si el producto se encuentra entonces desplegar en pantalla su precio y su nombre
  if(findProduct){
    precioVenta.value = listProducts[actualProductoPosition-1].Price_Sell
    nameProducto.value = listProducts[actualProductoPosition-1].Name
  
    }

}
/****************************************************************
 * Agregar Producto
 * Es una funcion que se activa al presionar el boton de añadir
 * Esta funcion coloca el producto encontrado en un lista de objetos
 * para ser mostrados en el resumen de la venta
 * Caso contrario se resetea el formulario y se vuelve a comenzar
 ******************************************************************/
function agregarProducto(){
  //Obtener el control del formulario de la venta
  var formularioVenta = document.getElementById('formularioVenta')
  //Si se encontro un producto añadirlo a la lista de objetos y reset el formulario
  if(findProduct && checkVenta()){
    productosCart[0].Total += listProducts[actualProductoPosition - 1].Price_Sell *  parseInt(cantidadVenta.value)
    productosCart.push(listProducts[actualProductoPosition - 1])
    formularioVenta.reset()
    cantidadVenta.value=1
    }
    //Caso contrario solo reset el formulario
    else{
      
      formularioVenta.reset()
      cantidadVenta.value=1
    }

    findProduct = false
     console.log(productosCart)
}

/*********************************************
 * Check venta 
 * Es una pequeña funcion para saber si el formulario es valido
 ******************************************/
function checkVenta(){
  if(nameProducto.value=="" || precioVenta.value=="" || precioVenta.value=="0"||cantidadVenta.value=="" || cantidadVenta.value=="0"){
    return false
  }
  return true
}
