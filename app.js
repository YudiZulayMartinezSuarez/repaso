import "./components/div-productos.js"
import "./components/div-usuarios.js"
import "./api/render.js"



var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('click',  ()=> {
  myInput.focus()
})
