const boton_fondoMonocromatico = document.getElementById("boton-monocromatico")
const boton_fondoSuper = document.getElementById("boton-super")
const boton_fondoGradient = document.getElementById("boton-gradient")

boton_fondoMonocromatico.addEventListener("click",()=>{
    document.body.classList.add("fondo-monocromatico")
    document.body.classList.remove("fondo-gradient")
    document.body.classList.remove("fondo-super")
})
boton_fondoSuper.addEventListener("click",()=>{
    document.body.classList.add("fondo-super")
    document.body.classList.remove("fondo-monocromatico")
    document.body.classList.remove("fondo-gradient")
})
boton_fondoGradient.addEventListener("click",()=>{
    document.body.classList.add("fondo-gradient")
    document.body.classList.remove("fondo-monocromatico")
    document.body.classList.remove("fondo-super")
})