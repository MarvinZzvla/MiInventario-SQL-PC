const listProducts = window.api.getProductos()
let productosRoot = document.getElementById('productosRoot')
let input = document.getElementById("search_input");
let idProducto = 0
let findProduct = false
var lista = []

console.log(listProducts)

ordenarProductos()
showProductos()
loadSearchBar()


input.addEventListener("keydown",searchProducto)
input.addEventListener('input', () =>{
    if(input.value == ''){
        showProductos()
      }
})

function showProductos() {
    lista = []
        listProducts.map((producto) => {
        lista.push(producto.Name)
        productosRoot.innerHTML += '<div class="d-flex align-items-center justify-content-center mb-3"> <div class="col-10 bg-body-tertiary rounded p-2"> <div class="row"> <div class="col-12"> <h5>' + producto.Name + '</h5> </div> </div> <div class="row"> <div class="col-2"> <h6>Cantidad: ' + producto.Available + '</h6> </div> <div class="col-6"> <a href="./createProductos.html?product=' + producto.ID + '"><img src="../img/edit.png" alt="edit" height="32px" width="32px" style="margin-left:-25px"></a> </div> <div class="col-3 d-flex align-items-center justify-content-center"> <h6>Precio: ' + producto.Price_Sell + '</h6> </div> <div class="col"> <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal"><img src="../img/deleteIcon.svg" alt="' + producto.Name + '" name="' + producto.ID + '" width="32px" height="32px"></a> </div> </div> </div> </div>'
    })
}

function showBySearchProductos(list_productos) {
        list_productos.map((producto) => {
        productosRoot.innerHTML = '<div class="d-flex align-items-center justify-content-center mb-3"> <div class="col-10 bg-body-tertiary rounded p-2"> <div class="row"> <div class="col-12"> <h5>' + producto.Name + '</h5> </div> </div> <div class="row"> <div class="col-2"> <h6>Cantidad: ' + producto.Available + '</h6> </div> <div class="col-6"> <a href="./createProductos.html?product=' + producto.ID + '"><img src="../img/edit.png" alt="edit" height="32px" width="32px" style="margin-left:-25px"></a> </div> <div class="col-3 d-flex align-items-center justify-content-center"> <h6>Precio: ' + producto.Price_Sell + '</h6> </div> <div class="col"> <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal"><img src="../img/deleteIcon.svg" alt="' + producto.Name + '" name="' + producto.ID + '" width="32px" height="32px"></a> </div> </div> </div> </div>'
    })
}

function loadSearchBar(){
    new Awesomplete(input, {
        list: lista
    });
}


document.addEventListener('click', (e) => {

    if (e.target.name != undefined && e.target.id != 'deleteBtn') {
        idProducto = parseInt(e.target.name)
    }
    if (e.target.id === 'deleteBtn') {
        deleteProducto()
    }
})

function deleteProducto() {
    console.log(idProducto)
    const deleteProducts = window.api.deleteVentas(idProducto, "Productos")
    window.location.reload()
}


function searchProducto(){
   //Variables locales
  let indice = 0
  findProduct = false
  var list_productos = []
  
  //Se lee los productos para encontrar el producto por el nombre o codigo de barras
  listProducts.map((producto) => {
      indice++
      if(producto.Name.toString() === input.value) {
        findProduct = true
        list_productos.push(producto)
      }
  })

  showBySearchProductos(list_productos)


}


function ordenarProductos() {
    listProducts.sort((a, b) => {
        // Utiliza la función de comparación para ordenar por el campo "nombre"
        const nombreA = a.Name.toLowerCase(); // Convierte a minúsculas para ordenar sin distinción de mayúsculas/minúsculas
        const nombreB = b.Name.toLowerCase();

        if (nombreA < nombreB) {
            return -1; // a debe venir antes que b
        }
        if (nombreA > nombreB) {
            return 1; // b debe venir antes que a
        }
        return 0; // a y b son iguales
    });
}