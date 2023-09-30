const listUsers = window.api.getUsers();
if(listUsers.length >  0){
    let bussiness_name = listUsers[0].BussinessName
}



let name = document.getElementById('name_input')
let lastName = document.getElementById('lastname_input')
let password = document.getElementById('password_input')
let phone = document.getElementById('phone_input')
let email = document.getElementById('email_input')
let isAdmin = document.getElementById('admin_input')
let negocio = document.getElementById('negocio_input')

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let isEdit = JSON.parse(urlParams.get('isEdit'))


if(isEdit){
    document.getElementById('input_default').style.display='none';
    negocio.value = bussiness_name
}
else{
    document.getElementById('input_default_admin').style.display='none'
    isAdmin.checked = true
}

document.getElementById('formularioVenta').addEventListener('submit', (e) => {
    e.preventDefault();
    crearUsuario()
})

function crearUsuario() {
   
    const usuario = {Name: name.value, LastName: lastName.value, Password: password.value,
                    Phone: phone.value, Email: email.value, isAdmin: isAdmin.checked?1:0,Negocio: negocio.value}

        const createUsuario = window.api.createUser(usuario)
        
        isEdit?window.location.replace('usuariosHome.html'):window.location.replace('index.html')
        
}