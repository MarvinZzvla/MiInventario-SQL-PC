let todayDate = new Date().toLocaleDateString().split('/')
todayDate = (`${todayDate[0] < 10 ? todayDate[0] = '0' + todayDate[0] : todayDate[0]}/${todayDate[1] < 10 ? todayDate[1] = '0' + todayDate[1] : todayDate[1]}/${todayDate[2]}`).split('/')
let actualDate = `${todayDate[2]}-${todayDate[1]}-${todayDate[0]}`
let ventasList = window.api.getVentas(actualDate, actualDate)
let idVentas = 0;
console.log(ventasList)
let ventasRoot = document.getElementById('ventasRoot')

init()

function init(){
    ventasRoot.innerHTML = ''
    ventasList.map((venta) => {

        ventasRoot.innerHTML += '<div class="d-flex align-items-center justify-content-center mb-3"> <div class="col-10 bg-body-tertiary rounded p-2"> <div class="row"> <div class="col-8"> <h5>'+venta.Name+'</h5> </div> <div class="col-3  d-flex align-items-center justify-content-center"> <h6>Cantidad: '+venta.Quantity+'</h6> </div> </div> <div class="row"> <div class="col-8"> <h6>'+ventaDateOrder(venta.Date)+'</h6> </div> <div class="col-3 d-flex align-items-center justify-content-center"> <h6>Valor: '+venta.Quantity * venta.Price_Sell+'</h6> </div> <div class="col"> <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal"><img src="../img/deleteIcon.svg" alt="'+venta.ID+'" key="'+venta.Name+'" width="32px" height="32px"></a> </div> </div> </div> </div> '
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
        deleteVenta(idVentas)
    }

    if(e.target.alt !== undefined){
        idVentas = e.target.alt
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