const listProducts = window.api.getProductos()

let productosRoot = document.getElementById('productosRoot')
let idProducto = 0
console.log(listProducts)

listProducts.map((producto) => {
    productosRoot.innerHTML += '<div class="d-flex align-items-center justify-content-center mb-3"> <div class="col-10 bg-body-tertiary rounded p-2"> <div class="row"> <div class="col-12"> <h5>'+producto.Name+'</h5> </div> </div> <div class="row"> <div class="col-2"> <h6>Cantidad: '+producto.Available+'</h6> </div> <div class="col-6"> <a href="./createProductos.html?product='+producto.ID+'"><img src="../img/edit.png" alt="edit" height="32px" width="32px" style="margin-left:-25px"></a> </div> <div class="col-3 d-flex align-items-center justify-content-center"> <h6>Precio: '+producto.Price_Sell+'</h6> </div> <div class="col"> <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal"><img src="../img/deleteIcon.svg" alt="'+producto.Name+'" name="'+producto.ID+'" width="32px" height="32px"></a> </div> </div> </div> </div>'
})

document.addEventListener('click', (e) => {

    if(e.target.name != undefined && e.target.id != 'deleteBtn'){
        idProducto = parseInt(e.target.name)
    }
if(e.target.id === 'deleteBtn'){
    deleteProducto()
}
})

function deleteProducto(){
console.log(idProducto)
const deleteProducts = window.api.deleteVentas(idProducto, "Productos")
window.location.reload()
}