let bussiness = localStorage.getItem('negocio');
document.getElementById('title_bussiness').innerHTML = bussiness;
import {encrypter,decrypt} from './encrypt.js'

function checkSubscription(){

  //const result = window.api.checkSubscription()
  getTime().then(result => {
    let date = ""
    if(result === null){
      date = new Date().toISOString().split('T')[0]
      
    }
    else{
      date = result.datetime.split("T")[0]
    }

    const data = window.api.checkSubscription()
    //console.log(date)
    //console.log(data[0].DateExpired)
    if(date > decrypt(data[0].DateExpired,3)){
      //true
      console.log("La subscripicion a vencido")
      window.location.replace("../html/pagarPaypal.html")
    }
    else{
      //false
      console.log("La subscripicion sigue activa")
    }
  })

}


function getTime(){
let url = "http://worldtimeapi.org/api/timezone/America/Managua"
 return fetch(url).then(response => {
  if(!response.ok){
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





  