let bussiness = localStorage.getItem('negocio');
document.getElementById('title_bussiness').innerHTML = bussiness;
import { encrypter, decrypt } from './encrypt.js'

function checkSubscription() {

  //const result = window.api.checkSubscription()
  getTime().then(result => {
    let date = ""
    if (result === null) {
      date = new Date().toISOString().split('T')[0]
    }
    else {
      date = result.datetime.split("T")[0]
    }
    //Obtener la subscripción de la base de datos
    const data = window.api.checkSubscription()
    //Descriptar la fecha de la base de datoss
    const dateExpired = decrypt(data[0].DateExpired, 3)

    /************************************************************ */
    //Obtener la diferencia de dias entre la fecha actual y la fecha de expiración del programa
    const date1 = new Date(date);
    const date2 = new Date(dateExpired);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const swapDate = dateExpired.split('-').reverse().join('/');
    /**************************************************************** */
    document.querySelector('#sub_active').innerHTML = "Suscripción activa hasta " + swapDate + "<br/>" + "<strong> Quedan " + diffDays + " dias! </strong>"

    if (date > dateExpired) {
      //true
      console.log("La subscripicion a vencido")
      window.location.replace("../html/pagarPaypal.html")
    }
    else {
      //false
      //console.log("La subscripicion sigue activa")
    }
  })

}

/**********************************************************************
 * GET TIME
 * Call an api to get the current time 
 ***********************************************************************/
function getTime() {
  let url = "http://worldtimeapi.org/api/timezone/America/Managua"
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error('La solicitud no fue exitosa');
    }
    return response.json()
  }).then(data => {
    return data
  }).catch(error => {
    return null

  })
}
checkSubscription()





