

const users = window.api.getUsers();
const alertLogin = document.getElementById('alertValid');
document.addEventListener('DOMContentLoaded', () => {
    alertLogin.style.display = 'none';

    if (localStorage.getItem('isLogged') == 'true') {
        window.location.replace("./homePage.html");
    }
})

document.addEventListener("submit", (event) => {
    event.preventDefault();
    let email = document.getElementById("inputEmail").value;
    let password = document.getElementById("inputPassword").value;

    if (verifyCredentials(email, password)) {
        console.log("Login successful")
        window.location.replace("./homePage.html");
    }
    else {
        console.log("Login failed")
        alertLogin.style.display = "grid"
    }
})

function verifyCredentials(email, password) {
    let emailDatabase, passwordDatabase
    users.map((user) => {
        if (user.Email === email && user.Password === password) {
            emailDatabase = user.Email
            passwordDatabase = user.Password
            saveSession(user)
        }
    })

    return emailDatabase === email && passwordDatabase === password
}

function saveSession(user) {
    console.log(user)
    localStorage.setItem('email', user.Email)
    localStorage.setItem('negocio', user.BussinessName)
    localStorage.setItem('Name', user.Name + ' ' + user.Lastname)
    localStorage.setItem('Phone', user.Phone)
    localStorage.setItem('isLogged', true)
    localStorage.setItem('firstTime',true)
}