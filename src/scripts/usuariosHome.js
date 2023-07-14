const listUsers= window.api.getUsers()
let usuariosRoot = document.getElementById('usuariosRoot')
let idUsuario = 0

console.log(listUsers)

listUsers.map((user) => {
    let rol = user.Admin === 0 ?"Empleado" : "Administrador"

    usuariosRoot.innerHTML += '<div class="d-flex align-items-center justify-content-center mb-3"> <div class="col-10 bg-body-tertiary rounded p-2"> <div class="row"> <div class="col"> <h5>'+user.Name+' '+user.Lastname+'</h5> </div> </div> <div class="row"> <div class="col-2"> <h6>Telefono: '+user.Phone+'</h6> </div> <div class="col"> <h6>Correo: '+user.Email+'</h6> </div> </div> <div class="row"> <div class="col-11"> <h6>Rol: '+rol+'</h6> </div> <div class="col"> <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal"><img src="../img/deleteIcon.svg" alt="'+user.Name+'" name="'+user.ID+'" width="32px" height="32px"></a> </div> </div> </div> </div>'
})

document.addEventListener('click', (e) => {

    if(e.target.name != undefined && e.target.id != 'deleteBtn'){
        idUsuario = parseInt(e.target.name)
    }
if(e.target.id === 'deleteBtn'){
    deleteUsuario()
}
})

function deleteUsuario(){
console.log(idUsuario)
const deleteProducts = window.api.deleteVentas(idUsuario, "Usuarios")
window.location.reload()
}