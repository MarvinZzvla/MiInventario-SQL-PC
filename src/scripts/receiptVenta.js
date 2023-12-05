const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const ventaID = urlParams.get('venta')

const ventaInfo = window.api.getVentasByReceipt(ventaID)


console.log(ventaInfo)


document.addEventListener('DOMContentLoaded',() =>{
    //Obtener todos los elementos que son cambiante en la generación de una factura
   let factura_number = document.getElementById('factura_number') 
   let number_factura = document.getElementById('number_factura') 
   let bussiness_name = document.getElementById('bussiness_name')
   let date_factura = document.getElementById('date_factura') 
   let items_factura = document.getElementById('items_factura')
   let total_price = document.getElementById('total_price')

   //Asignar el valor correspondiente a cada campo de la Factura
   factura_number.innerHTML = 'Factura #'+ventaID
   number_factura.innerHTML = 'Factura #'+ventaID
   bussiness_name.innerHTML = localStorage.getItem('negocio')
   date_factura.innerHTML =  'Fecha: '+ventaInfo[0].Date.split('-').reverse().join('/')
    //Por cada producto de la factura añadir una nueva linea
   ventaInfo.map((item) => {
    items_factura.innerHTML += '<div class="row"> <div class="col"> <p>'+item.Name+'</p> </div> <div class="col"> <p>'+item.Quantity+'</p> </div> <div class="col"> <p>'+item.Price+'</p> </div> </div>'
   })
   //Llamar a la funcion sumTotal para que sume todos los productos 
   total_price.innerHTML = sumTotal()
});

/*******************************************************************
 * Sum Total
 * Obtiene todos los productos de la lista y lee cada uno de ellos para
 * ir sumando el valor total de la factura
 *********************************************************************/
function sumTotal(){
    let total = 0
    ventaInfo.map((venta) => {
        total += venta.Price
    })
    return total
}

//Cuando el boton de imprimir es presionado
document.querySelector('#btnPrint').addEventListener('click',() => {
    document.querySelector('#header-factura').style.display = 'none'
    document.querySelector('#footer').style.display = 'none'
    window.print()
    document.querySelector('#header-factura').style.display = 'block'
    document.querySelector('#footer').style.display = 'block'
});

