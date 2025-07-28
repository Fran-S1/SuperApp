const agregarItem = document.getElementById("agregar-item")
const nombreItem = document.getElementById("escribir-item")
const listaItems = document.getElementById("lista-items")
const listaKg = document.getElementById("listaKg")
const crearTicket = document.getElementById("crearTicket")
const compruebaKg = document.getElementById("compruebaKg")
const SeccionProductos = document.getElementById("h4Productos")
const SeccionVerduleria = document.getElementById("h4Verduleria")

// FUNCIONES //
function formarLi (){
    const li = document.createElement("li")

    const item = document.createElement("span")
    item.textContent = nombreItem.value
    

    const cantItems = document.createElement("span")
    cantItems.textContent = "1"
    cantItems.classList.add("cant-items")

    const btnSumar = document.createElement("button")
    btnSumar.classList.add("sumar", "actualizarTotalReSum")
    btnSumar.addEventListener("click",()=>{
        cantItems.textContent = Number(cantItems.textContent) + 1
    })
    const btnRestar = document.createElement("button")
    btnRestar.classList.add("restar","actualizarTotalReSum")

    const precioItem = document.createElement("input")
    precioItem.type="number"
    precioItem.classList.add("inputsCalculadora", "actualizarTotalInp")

    const cantDesc = document.createElement("input")
    cantDesc.type="number"
    cantDesc.classList.add("inputsCalculadora", "actualizarTotalInp")

    const cantKg = document.createElement("input")
    cantKg.type="number"
    cantKg.placeholder= "Lleva"
    cantKg.classList.add("cantKg", "actualizarTotalInp")

    // SIMBOLOS //
    const simboloPrecio = document.createElement("span")
    simboloPrecio.classList.add("simboloPrecio")

    const simboloDescuento = document.createElement("span")
    simboloDescuento.classList.add("simboloDescuento")

    const simboloPeso = document.createElement("span")
    simboloPeso.classList.add("simboloPeso")

    //  CREAR LI //

    li.appendChild(btnRestar)
    if (compruebaKg.checked){
        li.classList.add("liVerduleria")
        btnRestar.addEventListener("click",()=>{
            listaKg.removeChild(li)
        })
        // li.appendChild(simboloPeso)
        li.appendChild(cantKg)
        precioItem.placeholder= "🗶 Kg"
        precioItem.classList.add("precioItem2")
        cantDesc.classList.add("cant-desc2")
        item.classList.add("pruebaTexto2")
        listaKg.appendChild(li)
        SeccionVerduleria.style.display="block"
    }
    else{
        li.classList.add("itemsdeli")
        btnRestar.addEventListener("click",()=>{
            if (cantItems.textContent >= 1){
                cantItems.textContent = Number(cantItems.textContent) - 1
            }
            if (cantItems.textContent == 0){
                const ul = document.querySelector("ul")
                ul.removeChild(li)
            }
        })
        precioItem.classList.add("precioItem")
        cantDesc.classList.add("cant-desc")
        item.classList.add("pruebaTexto")
        li.appendChild(cantItems)
        li.appendChild(btnSumar)
        
        listaItems.appendChild(li)
        SeccionProductos.style.display="block" 
    }

    
    li.appendChild(item)
    li.appendChild(simboloPrecio)
    li.appendChild(precioItem)

    li.appendChild(simboloDescuento)
    li.appendChild(cantDesc)


    
    nombreItem.value = ""
}
function calcularTotal (){
    const total = document.getElementById("total")
    let totalLista = 0

    const lis = document.querySelectorAll(".itemsdeli")
    const allCantItems = document.querySelectorAll(".cant-items")
    const allPrecios = document.querySelectorAll(".precioItem")
    const allDescuentos = document.querySelectorAll(".cant-desc")
    total.textContent = "0"
    for(i=0; i<lis.length; i++){
        const CantItemNumerico = Number(allCantItems[i].textContent)
        const PrecioNumerico = Number(allPrecios[i].value)
        const cantPorPrecio = CantItemNumerico * PrecioNumerico
        const DescuentoNumerico = Number(allDescuentos[i].value)

        const preSubtotal = cantPorPrecio * (DescuentoNumerico / 100)
        const subtotal = cantPorPrecio - preSubtotal

        totalLista += subtotal
    }

    const lis2 = document.querySelectorAll(".liVerduleria")
    const inpKg = document.querySelectorAll(".cantKg")
    const allPrecios2 = document.querySelectorAll(".precioItem2")
    const allDescuentos2 = document.querySelectorAll(".cant-desc2")
    for (i=0; i<lis2.length; i++){
        const inpKgnumerico = Number(inpKg[i].value)
        const PrecioNumerico2 = Number(allPrecios2[i].value)
        const DescuentoNumerico2 = Number(allDescuentos2[i].value)

        const ReglaDe3 = (inpKgnumerico * PrecioNumerico2) / 1000 // 1kg
        const preSubtotal2 = ReglaDe3 * (DescuentoNumerico2 / 100)
        const subtotal2 = ReglaDe3 - preSubtotal2

        totalLista += subtotal2
    }

    let mostrarTotal = Number(total.textContent) + totalLista
    totalLista = 0
    
    total.textContent = "TOTAL: $" + mostrarTotal.toFixed(2)
}

nombreItem.addEventListener("keydown",(teclaPresionada)=>{
    if (teclaPresionada.key === "Enter" && nombreItem.value != ""){

        formarLi()

        document.querySelectorAll(".actualizarTotalReSum").forEach(boton =>{
            boton.addEventListener("click",()=>{
                calcularTotal()
            })
        })
        document.querySelectorAll(".actualizarTotalInp").forEach(input =>{
            input.addEventListener("input",()=>{
                calcularTotal()
            })
        })
    }
})
agregarItem.addEventListener("click",()=>{
    if (nombreItem.value != ""){
        formarLi()

        document.querySelectorAll(".actualizarTotalReSum").forEach(boton =>{
            boton.addEventListener("click",()=>{
                calcularTotal()
            })
        })
        document.querySelectorAll(".actualizarTotalInp").forEach(input =>{
            input.addEventListener("input",()=>{
                calcularTotal()
            })
        })
    }
})

crearTicket.addEventListener("click",()=>{
    const lis = document.querySelectorAll(".itemsdeli")
    const allCantItems = document.querySelectorAll(".cant-items")
    const allPrecios = document.querySelectorAll(".precioItem")
    const allDescuentos = document.querySelectorAll(".cant-desc")
    const nombreDeItems = document.querySelectorAll(".pruebaTexto")
    for(i=0; i<lis.length; i++){
        const CantItemNumerico = Number(allCantItems[i].textContent)
        const PrecioNumerico = Number(allPrecios[i].value)
        const cantPorPrecio = CantItemNumerico * PrecioNumerico
        const DescuentoNumerico = Number(allDescuentos[i].value)

        const preSubtotal = cantPorPrecio * (DescuentoNumerico / 100)
        
        tickeTXT.textContent += 
        'producto: "' + nombreDeItems[i].textContent + '"(' + allCantItems[i].textContent + ')' + "\n" +
        "precio: $" + cantPorPrecio + "\n" +
        "descuento: $" + preSubtotal.toFixed(2) + "\n" +
        "------------------------------" + "\n"
    }

    const lis2 = document.querySelectorAll(".liVerduleria")
    const inpKg = document.querySelectorAll(".cantKg")
    const allPrecios2 = document.querySelectorAll(".precioItem2")
    const allDescuentos2 = document.querySelectorAll(".cant-desc2")
    const nombreDeItems2 = document.querySelectorAll(".pruebaTexto2")
    for (i=0; i<lis2.length; i++){
        const inpKgnumerico = Number(inpKg[i].value)
        const PrecioNumerico2 = Number(allPrecios2[i].value)
        const DescuentoNumerico2 = Number(allDescuentos2[i].value)

        const ReglaDe3 = (inpKgnumerico * PrecioNumerico2) / 1000 // 1kg
        const preSubtotal2 = ReglaDe3 * (DescuentoNumerico2 / 100)

        tickeTXT.textContent += 
        'producto: "' + nombreDeItems2[i].textContent + '"(' + inpKg[i].value + 'kg)' + "\n" +
        "precio: $" + ReglaDe3 + "\n" +
        "descuento: $" + preSubtotal2.toFixed(2) + "\n" +
        "------------------------------" + "\n"
    }

    popupTicket.style="visibility: visible"
    popupCalculadoraDef.style="visibility: hidden"
})

