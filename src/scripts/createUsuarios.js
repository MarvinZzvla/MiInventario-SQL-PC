let name = document.getElementById('name_input')
let lastName = document.getElementById('lastname_input')
let password = document.getElementById('password_input')
let phone = document.getElementById('phone_input')
let email = document.getElementById('email_input')
let isAdmin = document.getElementById('admin_input')
let negocio = document.getElementById('negocio_input')

document.getElementById('formularioVenta').addEventListener('submit', (e) => {
    e.preventDefault();
    crearUsuario()
})

function crearUsuario() {
    const usuario = {Name: name.value, LastName: lastName.value, Password: password.value,
                    Phone: phone.value, Email: email.value, isAdmin: isAdmin.checked?1:0,Negocio: negocio.value}

        const createUsuario = window.api.createUser(usuario)
        window.location.replace('index.html')
}