const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('product')
console.log(product)

document.addEventListener('DOMContentLoaded',() => {
document.getElementById('productoName').innerHTML = product
})
