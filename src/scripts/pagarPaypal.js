import {encrypter,decrypt} from './encrypt.js'
const payInfo = window.api.checkSubscription()
let isPrueba = false

if(payInfo[0].Pay == 0){
    isPrueba = true
    document.querySelector('#test_text').style.display = 'block'
}

document.getElementById('pagarBtn').addEventListener('click',checkToken)
let token_input = document.getElementById('token_id')

function getToken(){
    let url = "kwwsv_¿¿pduylqc2dydodcshuvrqdovlwh;jolwfk;ph¿wrnhq;mvrq"
    url = decrypt(url,3)
return fetch(url).then(response => {
    if(!response.ok){
        throw new Error('Sin conexion a internet');
    }
    return response.json()
}).then(data => {
    return data.token
}).catch(error => {
    console.log(error.message)
    return null
    
})
}

function checkToken(){

    //Check the token without internet connection if is testing
    if(isPrueba){
        if(encrypter(token_input.value,3).toLowerCase() == "suxhed"){
            renoveSubPrueba()
            alert("Tienes una prueba gratis! de 24 horas")
        }
    }
    //GET Token from internet
    getToken().then(response => {
        let token_encrypter = encrypter(token_input.value,3)
        //Si no se encuentra el token
        if(response === null){
            alert("Necesitas conexion a internet")
            return
        }
        if(isPrueba){
            if(token_encrypter.toLowerCase() == "suxhed"){
                renoveSubPrueba()
                alert("Tienes una prueba gratis! de 24 horas")
            }
        }
        if(token_encrypter == response){
            console.log("Compra exitosa")
            document.querySelector('#alertValid').style.display = "none"
            renoveSub()
        }
        else{
            console.log("No es el token correcto")
            document.querySelector('#alertValid').style.display = "block"
        }
    })
    
}

function renoveSub(){
    let dateCompra = new Date().toISOString().split('T')[0]
    let dateExpired = new Date(dateCompra)
    // Añade 30 días a la fecha
    dateExpired.setDate(dateExpired.getDate() + 30);
    dateExpired = dateExpired.toISOString().split('T')[0]

    dateCompra = encrypter(dateCompra.toString(),3)
    dateExpired = encrypter(dateExpired.toString(),3)
    
    const result = window.api.updateSubscription(dateCompra, dateExpired)
    if(result){
        window.location.replace('../html/homePage.html')
    }
}

function renoveSubPrueba(){
    let dateCompra = new Date().toISOString().split('T')[0]
    let dateExpired = new Date(dateCompra)
    // Añade 1 días a la fecha
    dateExpired.setDate(dateExpired.getDate() + 1);
    dateExpired = dateExpired.toISOString().split('T')[0]

    dateCompra = encrypter(dateCompra.toString(),3)
    dateExpired = encrypter(dateExpired.toString(),3)
    
    const result = window.api.updateSubscription(dateCompra, dateExpired)
    if(result){
        window.location.replace('../html/homePage.html')
    }

}

