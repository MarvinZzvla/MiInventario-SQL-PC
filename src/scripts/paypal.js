// Configurar la API de PayPal
paypal
.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '20.00',
                    currency_code:"USD", // Monto en USD
                },
                description:"Subscripcion mensual",
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('Pago completado por ' + details.payer.name.given_name);
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