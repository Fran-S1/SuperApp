const agregarItem = document.getElementById("agregar-item")
const nombreItem = document.getElementById("escribir-item")
const listaItems = document.getElementById("lista-items")

nombreItem.addEventListener("keydown",(teclaPresionada)=>{
    if (teclaPresionada.key === "Enter"){
        const li = document.createElement("li")
        const item = document.createTextNode(nombreItem.value)

        const cantItems = document.createElement("span")
        cantItems.textContent = "1"
        cantItems.classList.add("cant-items")

        const btnSumar = document.createElement("button")
        btnSumar.classList.add("sumar", "actualizarTotalResum")
        btnSumar.addEventListener("click",()=>{
            cantItems.textContent = Number(cantItems.textContent) + 1
        })
        const btnRestar = document.createElement("button")
        btnRestar.classList.add("restar","actualizarTotalResum")
        btnRestar.addEventListener("click",()=>{
            if (cantItems.textContent >= 1){
                cantItems.textContent = Number(cantItems.textContent) - 1
            }
            if (cantItems.textContent == 0){
                const ul = document.querySelector("ul")
                ul.removeChild(li)
            }
        })
        
        const precioItem = document.createElement("input")
        precioItem.type="number"
        precioItem.classList.add("precioItem", "inputsCalculadora", "actualizarTotalInp")

        const cantDesc = document.createElement("input")
        cantDesc.type="number"
        cantDesc.classList.add("cant-desc", "inputsCalculadora", "actualizarTotalInp")

        // SIGNOS //
        const signoPrecio = document.createElement("span")
        signoPrecio.classList.add("signoPrecio")

        const signoDescuento = document.createElement("span")
        signoDescuento.classList.add("signoDescuento")

        //  AGREGAR ITEM Y COMPLEMENTOS //
        li.appendChild(btnRestar)
        li.appendChild(cantItems)
        li.appendChild(btnSumar)
        li.appendChild(item)

        li.appendChild(signoPrecio)
        li.appendChild(precioItem)
        li.appendChild(signoDescuento)
        li.appendChild(cantDesc)

        listaItems.appendChild(li)
        nombreItem.value = ""

        ////
        const actualizarLista = document.getElementById("actualizarLista")
        const total = document.getElementById("total")
        let totalLista = 0

        document.querySelectorAll(".actualizarTotalResum").forEach(boton =>{
            boton.addEventListener("click",()=>{
                const lis = document.querySelectorAll("li")
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
                let mostrarTotal = Number(total.textContent) + totalLista
                totalLista = 0
                total.textContent = "TOTAL: $" + mostrarTotal
            
            })
        })
        document.querySelectorAll(".actualizarTotalInp").forEach(input =>{
            input.addEventListener("input",()=>{
                const lis = document.querySelectorAll("li")
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
                let mostrarTotal = Number(total.textContent) + totalLista
                totalLista = 0
                total.textContent = "TOTAL: $" + mostrarTotal
            
            })
        })
    }

})


