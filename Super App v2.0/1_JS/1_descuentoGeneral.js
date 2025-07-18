// INPUTS //
const nombre_producto = document.getElementById("nombre-producto")
const precio_producto = document.getElementById("precio-producto")
const porcentaje_descuento = document.getElementById("porcentaje-descuento")

// ERRORES //
const error_nombre = document.getElementById("error-nombre")
const error_precio = document.getElementById("error-precio")
const error_porcentaje = document.getElementById("error-porcentaje")

// BOTONES //
const boton_agregar = document.getElementById("agregar-producto")
boton_agregar.addEventListener("click", () => {
    const NomPro = nombre_producto.value
    const PrePro = Number(precio_producto.value)
    const PorDes = Number(porcentaje_descuento.value)

    let descuento = (PorDes * PrePro) / 100
    descuento_total += descuento

    mostrarError (NomPro,error_nombre)
    mostrarError (PrePro,error_precio)
    
    if (PorDes == "" || PorDes > 100){
        error_porcentaje.style.visibility="visible"
    }
    else{
        error_porcentaje.style.visibility="hidden"
    }

    if (NomPro != "" && PrePro != "" && PorDes != "" && PorDes < 100){
        ticket.textContent +=
        "Producto: " + '"' + NomPro + '"' + "\n" + 
        "Descuento: $" + descuento + "\n" +
        "------------------------------" + "\n"
    }
    else if (NomPro != "" && PrePro != "" && PorDes != "" && PorDes == 100){
        ticket.textContent +=
        "Producto: " + '"' + NomPro + '"' + "\n" + 
        "GRATIS" + "\n" +
        "------------------------------" + "\n"
    }

    nombre_producto.value = ""
    precio_producto.value = ""
    porcentaje_descuento.value = ""
})

const boton_finalizar = document.getElementById("finalizar")
boton_finalizar.addEventListener("click", ()=>{

    popupProductos.style="visibility: hidden;"
    popupTicket.style="visibility: visible"
    tickeTXT.textContent += "\n" + "DESCUENTO TOTAL: $" + descuento_total
    descuento_total = 0

    errores.forEach(function(erroress){
    erroress.style.visibility="hidden"
    }) 
})