const listProducts = window.api.getProductos()

let productosRoot = document.getElementById('productosRoot')
let productosDropdown = document.getElementById('productosDropdown')
let productoPosition = 0
console.log(listProducts)

listProducts.map((producto) => {
    productosDropdown.innerHTML += '<li><a class="dropdown-item" href="#">'+producto.Name+'</a></li>' 
})

// Obtener el elemento del menú desplegable
var dropdownMenu = document.querySelector('.dropdown-menu');

// Agregar un evento click al menú desplegable
dropdownMenu.addEventListener('click', function (event) {
  // Verificar si el elemento clickeado es una opción del dropdown
  if (event.target.classList.contains('dropdown-item')) {
    // Obtener el texto de la opción seleccionada
    var textoSeleccionado = event.target.textContent;

    //console.log('Texto seleccionado:', textoSeleccionado);
    document.getElementById('nombre_input').value = textoSeleccionado
    let indice = 0
    listProducts.map((producto) => {
        indice++
        if(producto.Name === textoSeleccionado){
            productoPosition = indice
        }
    })
    document.getElementById('precio_input').value = listProducts[productoPosition-1].Price_Sell


    
  }
});
