import {encrypter,decrypt} from './encrypt.js'
// Configurar la API de PayPal
paypal
.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '21.75',
                    currency_code:"USD", // Monto en USD
                },
                description:"Subscripcion mensual",
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('Pago completado por ' + details.payer.name.given_name);
            renoveSub(details)
            console.log(details)
            // Aquí puedes realizar acciones adicionales después del pago.
        });
    },
    onError: function(err) {
        console.error(err);
    },
    locale: 'es-ES'
})
.render('#paypal-button-container'); // Renderizar el botón en el contenedor

function renoveSub(details){
    let dateCompra = details.update_time.split('T')[0]
    let dateExpired = new Date(dateCompra)
    // Añade 5 días a la fecha
    dateExpired.setDate(dateExpired.getDate() + 30);
    dateExpired = dateExpired.toISOString().split('T')[0]

    dateCompra = encrypter(dateCompra.toString(),3)
    dateExpired = encrypter(dateExpired.toString(),3)
    
    const result = window.api.updateSubscription(dateCompra, dateExpired)
    if(result){
        window.location.replace('../html/homePage.html')
    }
}