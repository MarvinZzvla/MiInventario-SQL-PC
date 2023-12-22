//Variables globales
const listProducts = window.api.getProductos()
const listVentas = window.api.getVentas()
let productosRoot = document.getElementById('productosRoot')
let productosDropdown = document.getElementById('productosDropdown')
let nameProducto = document.getElementById('nombre_input')
let infoCantidad = document.getElementById('infoCantidad')
let precioVenta = document.getElementById('precio_input')
let cantidadVenta = document.getElementById('cantidad_input')
let boxTotalVenta = document.getElementById('totalVenta')
let productosListaBox = document.getElementById('productosLista')
let productoPosition = 0
let actualProductoPosition = 0
let productoActual;
let findProduct = false
let idVenta = 1
let cantidad_disponible = 0
const productosCart = []
let totalVenta = 0
cantidadVenta.value = 1
//console.log(listProducts)

const lastProduct = window.api.getLastVentas()
if (lastProduct != "") {
  idVenta = parseInt(lastProduct[0].ID_Factura) + 1
  console.log(idVenta)
}




//Detectar los clicks en la pantalla
document.addEventListener('click', (e) => {
  //Si el click se hace el boton de borrar producto llamar funcion borrar
  if (e.target.id == 'btnDeleteProducto') {
    deleteVentasCart(e.target)
  }
  //Si el click se hace en el boton de pagar llamar la funcion crear venta
  if (e.target.id == 'pagarBtn') {
    crearVentas()
  }
})

//Detectar cambios en el input 
nameProducto.addEventListener('input', buscarProducto)

//Obtener lista de  productos y desplegar en un dropdown
listProducts.map((producto) => {
  productosDropdown.innerHTML += '<li><a class="dropdown-item" href="#">' + producto.Name + '</a></li>'
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
      if (producto.Name === textoSeleccionado) {
        productoPosition = indice
      }
    })
    //Si el producto coincide se llama la funcion buscar producto
    buscarProducto()
    precioVenta.value = listProducts[productoPosition - 1].Price_Sell
  }
});

/*********************************************************************************
 * Buscar Producto
 * Es una funcion para leer en tiempo real el producto que esta siendo buscado
 * en la base de datos, buscando por el nombre y el codigo de barra
 * si encuentra el producto muestra sus datos en pantalla
 *********************************************************************************/
function buscarProducto() {
  //Variables locales
  let indice = 0
  actualProductoPosition = 0
  findProduct = false


  //Se lee los productos para encontrar el producto por el nombre o codigo de barras
  listProducts.map((producto) => {
    indice++

    producto.BarCode ? producto.BarCode = producto.BarCode : producto.BarCode = 9999996455346343
    if (producto.BarCode.toString().toLowerCase() === nameProducto.value || producto.Name.toString().toLowerCase() === nameProducto.value.toLowerCase()) {
      findProduct = true
      actualProductoPosition = indice
    }

  })
  //Si el producto se encuentra entonces desplegar en pantalla su precio y su nombre
  if (findProduct) {
    precioVenta.value = listProducts[actualProductoPosition - 1].Price_Sell
    nameProducto.value = listProducts[actualProductoPosition - 1].Name
    infoCantidad.style.display = 'block'
    cantidad_disponible = listProducts[actualProductoPosition - 1].Available
    infoCantidad.innerHTML = `Tienes ${listProducts[actualProductoPosition - 1].Available} disponibles!`
  }

}
/****************************************************************
 * Agregar Producto
 * Es una funcion que se activa al presionar el boton de añadir
 * Esta funcion coloca el producto encontrado en un lista de objetos
 * para ser mostrados en el resumen de la venta
 * Caso contrario se resetea el formulario y se vuelve a comenzar
 ******************************************************************/
function agregarProducto() {
  //Verificar que todos los campos sean validos y llenados correctamente
  if (!checkVenta() || !findProduct) {
    document.querySelector("#alertValid").style.display = "block";
    return
  }
  //Checkear si hay la cantidad disponible para vender
  if(cantidadVenta.value <= 1){
    cantidadVenta.value = 1
  }
  if (cantidad_disponible < cantidadVenta.value) {
    return
  }
  //Desplegar la seccion para visualizar el resumen de la venta
  boxTotalVenta.style.display = 'block';

  //Obtener el control del formulario de la venta
  var formularioVenta = document.getElementById('formularioVenta')
  let producto = listProducts[actualProductoPosition - 1]

  //Si se encontro un producto añadirlo a la lista de objetos y reset el formulario
  if (findProduct && checkVenta()) {
    //productosCart[0].Total += producto.Price_Sell *  parseInt(cantidadVenta.value)
    //Sumar al total el precio del producto vendido por la cantidad vendida
    totalVenta += precioVenta.value * parseInt(cantidadVenta.value)

    //Se agrega al informacion del producto la cantidad vendida y el total vendido
    producto.Cantidad = parseInt(cantidadVenta.value)
    producto.Total = precioVenta.value * parseInt(cantidadVenta.value)
    producto.Total_Ganancias = (precioVenta.value - producto.Price) * producto.Cantidad
    producto.ID_Factura = idVenta
    //Guardar todos los datos en una variable nueva para que no se actualizen los datos de los objetos antiguos
    var newProducto = {
      Available: producto.Available, BarCode: producto.BarCode, ID: producto.ID, Price: producto.Price,
      Name: producto.Name, Price_Sell: precioVenta.value,
      Total: producto.Total, Cantidad: producto.Cantidad, Total_Ganancias: producto.Total_Ganancias,
      ID_Factura: producto.ID_Factura
    }


    //Se guarda todo la informacion del producto en una lista de productos
    productosCart.push(newProducto)
    //Se muestra en pantalla los productos en el carrito
    showVentas()
    //Se resetea el formulario y se deja por defecto cantidad: 1
    formularioVenta.reset()
    infoCantidad.innerHTML = ''
    cantidadVenta.value = 1
  }
  //Caso contrario solo reset el formulario
  else {

    formularioVenta.reset()
    cantidadVenta.value = 1
  }

  findProduct = false
  // console.log(productosCart)
}


/*********************************************
 * Check venta 
 * Es una pequeña funcion para saber si el formulario es valido
 ******************************************/
function checkVenta() {
  if (nameProducto.value == "" || precioVenta.value == "" || precioVenta.value == "0" || cantidadVenta.value == "" || cantidadVenta.value == "0") {
    return false
  }
  return true
}

/**********************************************************
 * Show ventas
 * Esta es una funcion que sirve para mostrar en pantalla
 * lo que se encuentra en el carrito, se rehace todo para
 * actualizar el carrito
 ********************************************************/
function showVentas() {
  //Actualizar el total de la venta 
  document.getElementById('total_venta').innerHTML = totalVenta + '$'
  let counter = 0;
  productosListaBox.innerHTML = ''
  //Por cada producto en el carrito de compra dibujar en el HTML un nuevo item con su nombre, precio y cantidad con su boton de eliminar
  productosCart.map((producto) => {
    productosListaBox.innerHTML += '<div class="row mt-1 p-1" style="border: 1px solid #000;"> <div class="col-4 mt-2"><h6>' + producto.Name + '</h6></div> <div class="col-2 mt-2"><h6>' + producto.Price_Sell + '$</h6></div> <div class="col-4 mt-2"><h6>' + producto.Cantidad + '</h6></div> <div class="col-1"><button class="btn btn-danger" id="btnDeleteProducto" value="' + counter + '">Eliminar</button></div> </div>'
    counter++
  })
}

/**********************************************************
 * Delete ventas Cart
 * Esta funcion elimina del carrito el producto
 * Resta el precio del producto multiplicado por la cantidad 
 * Al total del resumen de la venta 
 ***********************************************************/
function deleteVentasCart(elemento) {
  let precio = productosCart[elemento.value].Total
  totalVenta -= precio

  //Boorar el producto seleccionado del carrito de compra
  productosCart.splice(elemento.value, 1)

  //Si no hay nada en el carrito de compras, se oculta resumen de ventas y no puedes comprar
  if (productosCart.length < 1) {
    boxTotalVenta.style.display = 'none';
  }

  //Pintar en pantalla el nuevo resumen de la venta actualizado
  showVentas()

}

function crearVentas() {

  productosCart.map((producto) => {
    const createProducto = window.api.createVentas(producto)
    updateProducto(producto)
    updateFinanzas(createProducto, producto)

  })

  window.location.replace("ventasHome.html")

}

function updateFinanzas(id, producto) {
  const updateFinanzas = window.api.createFinanzas(id, producto)
}

function updateProducto(producto) {
  const updateProducto = window.api.updateProducto(producto)
}




