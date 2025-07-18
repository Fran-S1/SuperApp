// FONDO //
document.body.classList.remove("fondo-super")
document.body.classList.remove("fondo-monocromatico")

// VARIABLES //
const popupProductos = document.getElementById("popup-productos")
const popupVerduleria = document.getElementById("popup-verduleria")
const popupTicket = document.getElementById("popup-ticket")
const popupCalculadoraDef = document.getElementById("popup-calculadoraDef")
let descuento_total = 0
const overlay = document.getElementById("overlay")
const elegir_fondo = document.getElementById("elegir-fondo")
const tickeTXT = document.getElementById("ticket")
const errores = document.querySelectorAll(".error")

// OPCIONES INICIO //
const boton_productos = document.getElementById("productos")
boton_productos.addEventListener("click", function() {
    popupProductos.style="visibility: visible;";
    overlay.style="visibility: visible"
})
const boton_productosXkg = document.getElementById("productosXkg")
boton_productosXkg.addEventListener("click", function() {
    popupVerduleria.style="visibility: visible;";
    overlay.style="visibility: visible"
})
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
        popupProductos.style="visibility: hidden";
        popupVerduleria.style="visibility: hidden;";
        popupCalculadoraDef.style="visibility: hidden"
        overlay.style="visibility: hidden";
        
            errores.forEach(function(erroress){
                erroress.style.visibility="hidden"
            })    
        })
})

// CLICK IN OVERLAY //
overlay.addEventListener("click",()=>{
    overlay.style="visibility: hidden"
    popupProductos.style="visibility: hidden"
    popupVerduleria.style="visibility: hidden"
    popupTicket.style="visibility: hidden"
    tickeTXT.textContent = ""
    popupCalculadoraDef.style="visibility: hidden"
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

// Copilot: elimina cualquier e ingresada en un input numerico //
document.querySelectorAll('input[type="number"]').forEach(input0 => {
    input0.addEventListener("input", function(event) {
        this.value = this.value.replace(/e|E/g, ""); 
    });
});