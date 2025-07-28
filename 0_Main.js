// FONDO //
document.body.classList.remove("fondo-super")
document.body.classList.remove("fondo-monocromatico")

// VARIABLES //
const popupCalculadoraDef = document.getElementById("popup-calculadoraDef")
const popupTicket = document.getElementById("popup-ticket")
const tickeTXT = document.getElementById("ticket")
// const errores = document.querySelectorAll(".error")

const overlay = document.getElementById("overlay")
const elegir_fondo = document.getElementById("elegir-fondo")
let descuento_total = 0

// OPCIONES INICIO //
const boton_calculadoraDef = document.getElementById("calculadoraDef")
boton_calculadoraDef.addEventListener("click",()=>{
    popupCalculadoraDef.style="visibility: visible"
    overlay.style="visibility: visible"
})

// BOTONES //
const boton_inicio = document.getElementById("boton-inicio")
boton_inicio.addEventListener ("click", ()=>{
    popupTicket.style.display="none"
    overlay.style="visibility: hidden"
    tickeTXT.textContent = ""
})
document.querySelectorAll(".atras").forEach(boton => {
    boton.addEventListener("click", ()=> {
        popupCalculadoraDef.style="visibility: hidden"
        overlay.style="visibility: hidden";
        
            /*errores.forEach(function(erroress){
                erroress.style.visibility="hidden"
            })*/ 
        })
})

// CLICK IN OVERLAY //
overlay.addEventListener("click",()=>{
    popupCalculadoraDef.style="visibility: hidden"
    popupTicket.style="visibility: hidden"
    overlay.style="visibility: hidden"
})

// ERROR //
function mostrarError (inputs,error){
    if (inputs == ""){
        error.style.visibility="visible"
    }
    else {
        error.style.visibility="hidden"
    }
}

// Copilot: elimina cualquier e ingresada en un input numerico  AGREGAR DESPUES DE AGREGAR LOS INPUTS//
document.querySelectorAll('input[type="number"]').forEach(input0 => {
    input0.addEventListener("input", function(event) {
        this.value = this.value.replace(/e|E/g, ""); 
    });
});