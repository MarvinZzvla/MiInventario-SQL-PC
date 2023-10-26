let todayDate = new Date().toLocaleDateString().split('/')
todayDate = (`${todayDate[0] < 10 ? todayDate[0] = '0' + todayDate[0] : todayDate[0]}/${todayDate[1] < 10 ? todayDate[1] = '0' + todayDate[1] : todayDate[1]}/${todayDate[2]}`).split('/')
let actualDate = `${todayDate[2]}-${todayDate[1]}-${todayDate[0]}`
let ventasList = window.api.getVentas(actualDate, actualDate)
let idVentas = 0;
let idProducto = 0;
//console.log(ventasList)
let ventasRoot = document.getElementById('ventasRoot')

init()

function init(){
    ventasRoot.innerHTML = ''
    ventasList.map((venta) => {
     

        ventasRoot.innerHTML += '<div class="d-flex align-items-center justify-content-center mb-3"> <div class="col-10 bg-body-tertiary rounded p-2"> <div class="row"> <div class="col-8"> <h5>'+venta.Name+'</h5> </div> <div class="col-3  d-flex align-items-center justify-content-center"> <h6>Cantidad: '+venta.Quantity+'</h6> </div> </div> <div class="row"> <div class="col-8"> <h6>'+ventaDateOrder(venta.Date)+'</h6> </div> <div class="col-3 d-flex align-items-center justify-content-center"> <h6>Valor: '+venta.Price+'</h6> </div> <div class="col"> <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal"><img src="../img/deleteIcon.svg" alt="'+venta.ID+'" name="'+venta.idProducto+','+venta.Quantity+'" key="'+venta.Name+'" width="32px" height="32px"></a> </div> </div> </div> </div> '
    })

}



document.addEventListener("click", (e) => {

if(e.target.id === "createVentaBtn"){
    window.location.replace("./createVentas.html")
}
    if(e.target.id === "submitBtn"){
    searchByRange()
}

    if(e.target.id === "deleteBtn"){
        incrementarProducto(idProducto)
        deleteVenta(idVentas)
    }

    if(e.target.alt !== undefined){
        idVentas = e.target.alt
        idProducto = e.target.name
    }
})


function searchByRange(){
let dateStart = document.getElementById('dateStart').value
let dateEnd = document.getElementById('dateEnd').value

if (dateStart === '' && dateEnd === '') {
    alert('Selecciona ambas fechas')
 }
if(dateStart > dateEnd){
    alert('La fecha inicial no puede ser mas que la fecha final')
}


ventasList = window.api.getVentas(dateStart, dateEnd)
init()
}

function ventaDateOrder(ventaDate){
    let arrayDate = ventaDate.toString().split('-')
    let thisDate  = `${arrayDate[2]}/${arrayDate[1]}/${arrayDate[0]}`
    
    return thisDate
}

function deleteVenta(ventaId) {
    const deleteVenta = window.api.deleteVentas(ventaId, "VENTAS")
    window.location.reload()
}
/************************************************************************
 * INCREMENTAR PRODUCTO
 * Esta funciona devuelve la cantidad de productos de la venta borrada
 ****************************************************************************/
function incrementarProducto(idProducto){
    //variables locales
    let producto = idProducto.split(",")
    let idProduct = parseInt(producto[0])
    let cantidadProducto = parseInt(producto[1])

    //Buscar el producto especifico por ID
    const productoBase = window.api.getProductosId(idProduct)
    //Obtener la cantidad actual del producto
    let cantidadActual = productoBase[0].Available
    //Sumarle la cantidad de la venta a la cantidad actual
    let cantidad = cantidadActual + cantidadProducto
    
    //Incrementar la cantidad del producto, mandando a la base de datos
    //El id del producto + la cantidad actualizada
    let result = window.api.incrementProducto(idProduct, cantidad)
}