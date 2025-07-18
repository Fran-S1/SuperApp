// INPUTS //
const nombre_verfrutas = document.getElementById("nombre-verfrutas")
const precio_kg = document.getElementById("precio-kg")
const kg_llevados = document.getElementById("kg-llevados")
const porcentaje_descuento2 = document.getElementById("porcentaje-descuento2")

// ERRORES //
const error_nombre2 = document.getElementById("error-nombre2")
const error_precioKg = document.getElementById("error-precioKg")
const error_KgLlevados = document.getElementById("error-KgLlevados")
const error_porcentaje2 = document.getElementById("error-porcentaje2")

// BOTONES //
const boton_agregar2 = document.getElementById("agregar-verfruta")
boton_agregar2.addEventListener("click", ()=>{

    const NomVF = nombre_verfrutas.value
    const PreKg = Number(precio_kg.value)
    let KgLlev = Number(kg_llevados.value)
    const PorDes2 = Number(porcentaje_descuento2.value)

    if (KgLlev <= 10){
        KgLlev *= 1000
    }
    let precioDeLoLlevado = (KgLlev * PreKg) / 1000
    let descuento2 = (PorDes2 * precioDeLoLlevado) / 100
    descuento_total += descuento2

    mostrarError(NomVF,error_nombre2)
    mostrarError(PreKg,error_precioKg)
    mostrarError(KgLlev,error_KgLlevados)
    
    if (PorDes2 == "" || PorDes2 > 100){
        error_porcentaje2.style.visibility="visible"
    }
    else{
        error_porcentaje2.style.visibility="hidden"
    }
    
    if (NomVF != "" && PreKg != "" && KgLlev != "" && PorDes2 != "" && PorDes2 < 100){
        ticket.textContent +=
        "Producto: " + '"' + NomVF + '"' + "\n" + 
        "Descuento: $" + descuento2 + "\n" +
        "------------------------------" + "\n"
    }
    else if (NomVF != "" && PreKg != "" && KgLlev != "" && PorDes2 != "" && PorDes2 == 100){
        ticket.textContent +=
        "Producto: " + '"' + NomVF + '"' + "\n" + 
        "GRATIS" + "\n" +
        "------------------------------" + "\n"
    }

    nombre_verfrutas.value = ""
    precio_kg.value = ""
    kg_llevados.value = ""
    porcentaje_descuento2.value = ""

})

const boton_finalizar2 = document.getElementById("finalizar2")
boton_finalizar2.addEventListener("click", ()=>{

    popupVerduleria.style="visibility: hidden;"
    popupTicket.style="visibility: visible"
    tickeTXT.textContent += "\n" + "DESCUENTO TOTAL: $" + descuento_total
    descuento_total = 0

    errores.forEach(function(erroress){
    erroress.style.visibility="hidden"
    }) 
})