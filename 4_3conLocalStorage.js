const agregarItem = document.getElementById("agregar-item")
const nombreItem = document.getElementById("escribir-item")
const listaItems = document.getElementById("lista-items")
const listaKg = document.getElementById("listaKg")
const crearTicket = document.getElementById("crearTicket")
const compruebaKg = document.getElementById("compruebaKg")
const SeccionProductos = document.getElementById("h4Productos")
const SeccionVerduleria = document.getElementById("h4Verduleria")
const cambiarTipo = document.getElementById("cambiarTipo")

let esUnidad = true

// -------- LOCALSTORAGE --------
function guardarLista() {
    localStorage.setItem("listaItemsHTML", listaItems.innerHTML);
    localStorage.setItem("listaKgHTML", listaKg.innerHTML);
}

function asignarEventos() {
    // Para listaItems
    listaItems.querySelectorAll("li").forEach(li => {
        const btnRestar = li.querySelector(".restar");
        const btnSumar = li.querySelector(".sumar");
        const cantItems = li.querySelector(".cant-items");
        const precioItem = li.querySelector(".precioItem");
        const cantDesc = li.querySelector(".cant-desc");

        if (btnRestar) {
            btnRestar.onclick = () => {
                if (Number(cantItems.textContent) > 1) {
                    cantItems.textContent = Number(cantItems.textContent) - 1;
                } else {
                    li.remove();
                }
                guardarLista();
                calcularTotal();
                revisarSeccion();
            };
        }

        if (btnSumar) {
            btnSumar.onclick = () => {
                cantItems.textContent = Number(cantItems.textContent) + 1;
                guardarLista();
                calcularTotal();
            };
        }

        [precioItem, cantDesc].forEach(input => {
            if (input) {
                input.oninput = () => {
                    guardarLista();
                    calcularTotal();
                };
            }
        });
    });

    // Para listaKg
    listaKg.querySelectorAll("li").forEach(li => {
        const btnRestar = li.querySelector(".restar");
        const cantKg = li.querySelector(".cantKg");
        const precioItem2 = li.querySelector(".precioItem2");
        const cantDesc2 = li.querySelector(".cant-desc2");

        if (btnRestar) {
            btnRestar.onclick = () => {
                li.remove();
                guardarLista();
                calcularTotal();
                revisarSeccion();
            };
        }

        [cantKg, precioItem2, cantDesc2].forEach(input => {
            if (input) {
                input.oninput = () => {
                    guardarLista();
                    calcularTotal();
                };
            }
        });
    });
}

function restaurarLista() {
    if (localStorage.getItem("listaItemsHTML")) {
        listaItems.innerHTML = localStorage.getItem("listaItemsHTML");
    }
    if (localStorage.getItem("listaKgHTML")) {
        listaKg.innerHTML = localStorage.getItem("listaKgHTML");
    }
    asignarEventos();
    calcularTotal();
    revisarSeccion();
}

function revisarSeccion() {
    SeccionProductos.style.display = listaItems.children.length > 0 ? "block" : "none";
    SeccionVerduleria.style.display = listaKg.children.length > 0 ? "block" : "none";
}

restaurarLista();

// -------- CAMBIAR TIPO --------
cambiarTipo.addEventListener("click",()=>{
    if (cambiarTipo.textContent === "Unidad"){
       cambiarTipo.textContent = "Por Peso" 
       esUnidad = false
    }
    else{
        cambiarTipo.textContent = "Unidad"
        esUnidad = true
    }
})

// -------- FORMAR LI --------
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
        guardarLista();
        calcularTotal();
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

    const simboloPrecio = document.createElement("span")
    simboloPrecio.classList.add("simboloPrecio")

    const simboloDescuento = document.createElement("span")
    simboloDescuento.classList.add("simboloDescuento")

    const simboloPeso = document.createElement("span")
    simboloPeso.classList.add("simboloPeso")

    // -------- AGREGAR SEGÚN TIPO --------
    li.appendChild(btnRestar)
    if (esUnidad === false){
        li.classList.add("liVerduleria")
        btnRestar.addEventListener("click",()=>{
            listaKg.removeChild(li)
            guardarLista();
            calcularTotal();
            revisarSeccion();
        })
        li.appendChild(cantKg)
        precioItem.placeholder= "🗶 Kg"
        precioItem.classList.add("precioItem2")
        cantDesc.classList.add("cant-desc2")
        item.classList.add("pruebaTexto2")

        // Eventos para actualizar y guardar cuando cambian inputs
        cantKg.addEventListener("input", () => {
            calcularTotal();
            guardarLista();
        });
        precioItem.addEventListener("input", () => {
            calcularTotal();
            guardarLista();
        });
        cantDesc.addEventListener("input", () => {
            calcularTotal();
            guardarLista();
        });

        listaKg.appendChild(li)
        SeccionVerduleria.style.display="block"
    }

    else{
        li.classList.add("itemsdeli")
        btnRestar.addEventListener("click",()=>{
            if (Number(cantItems.textContent) > 1){
                cantItems.textContent = Number(cantItems.textContent) - 1
            }
            if (cantItems.textContent == 0){
                listaItems.removeChild(li)
            }
            guardarLista();
            calcularTotal();
            revisarSeccion();
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

    guardarLista();
    calcularTotal();
    revisarSeccion();
}

// -------- CALCULAR TOTAL --------
function calcularTotal (){
    const total = document.getElementById("total")
    let totalLista = 0

    const lis = document.querySelectorAll(".itemsdeli")
    const allCantItems = document.querySelectorAll(".cant-items")
    const allPrecios = document.querySelectorAll(".precioItem")
    const allDescuentos = document.querySelectorAll(".cant-desc")
    total.textContent = "0"
    for(let i=0; i<lis.length; i++){
        const CantItemNumerico = Number(allCantItems[i].textContent)
        const PrecioNumerico = Number(allPrecios[i].value)
        const cantPorPrecio = CantItemNumerico * PrecioNumerico
        const DescuentoNumerico = Number(allDescuentos[i].value)

        const preSubtotal = cantPorPrecio * (DescuentoNumerico / 100)
        const subtotal = cantPorPrecio - preSubtotal

        totalLista += subtotal
    }
    if (lis.length < 1){
        SeccionProductos.style.display="none"
    }

    const lis2 = document.querySelectorAll(".liVerduleria")
    const inpKg = document.querySelectorAll(".cantKg")
    const allPrecios2 = document.querySelectorAll(".precioItem2")
    const allDescuentos2 = document.querySelectorAll(".cant-desc2")
    for (let i=0; i<lis2.length; i++){
        const inpKgnumerico = Number(inpKg[i].value)
        const PrecioNumerico2 = Number(allPrecios2[i].value)
        const DescuentoNumerico2 = Number(allDescuentos2[i].value)

        const ReglaDe3 = (inpKgnumerico * PrecioNumerico2) / 1000
        const preSubtotal2 = ReglaDe3 * (DescuentoNumerico2 / 100)
        const subtotal2 = ReglaDe3 - preSubtotal2

        totalLista += subtotal2
    }
    if (lis2.length < 1){
        SeccionVerduleria.style.display="none"
    }

    if (lis.length < 1 && lis2.length < 1){
    }    

    let mostrarTotal = Number(total.textContent) + totalLista
    totalLista = 0
    
    total.textContent = "TOTAL: $" + mostrarTotal.toFixed(2)
}

// -------- EVENTOS --------
nombreItem.addEventListener("keydown",(teclaPresionada)=>{
    if (teclaPresionada.key === "Enter" && nombreItem.value != ""){
        formarLi()
    }
})

agregarItem.addEventListener("click",()=>{
    if (nombreItem.value != ""){
        formarLi()
    }
})

// -------- CREAR TICKET --------
crearTicket.addEventListener("click",()=>{
    const lis = document.querySelectorAll(".itemsdeli")
    const allCantItems = document.querySelectorAll(".cant-items")
    const allPrecios = document.querySelectorAll(".precioItem")
    const allDescuentos = document.querySelectorAll(".cant-desc")
    const nombreDeItems = document.querySelectorAll(".pruebaTexto")
    for(let i=0; i<lis.length; i++){
        const CantItemNumerico = Number(allCantItems[i].textContent)
        const PrecioNumerico = Number(allPrecios[i].value)
        const cantPorPrecio = CantItemNumerico * PrecioNumerico
        const DescuentoNumerico = Number(allDescuentos[i].value)

        const preSubtotal = cantPorPrecio * (DescuentoNumerico / 100)
        
        tickeTXT.textContent += 
        'producto: "' + nombreDeItems[i].textContent + '"(' + allCantItems[i].textContent + ')' + "\n" +
        "precio: $" + cantPorPrecio + "\n"

        if(DescuentoNumerico == 0){   
            tickeTXT.textContent += "------------------------------" + "\n"
        }
        else{
            tickeTXT.textContent +=    
            "descuento: $" + preSubtotal.toFixed(2) + "\n" +
            "------------------------------" + "\n"
        }
    }

    const lis2 = document.querySelectorAll(".liVerduleria")
    const inpKg = document.querySelectorAll(".cantKg")
    const allPrecios2 = document.querySelectorAll(".precioItem2")
    const allDescuentos2 = document.querySelectorAll(".cant-desc2")
    const nombreDeItems2 = document.querySelectorAll(".pruebaTexto2")
    for (let i=0; i<lis2.length; i++){
        const inpKgnumerico = Number(inpKg[i].value)
        const PrecioNumerico2 = Number(allPrecios2[i].value)
        const DescuentoNumerico2 = Number(allDescuentos2[i].value)

        const ReglaDe3 = (inpKgnumerico * PrecioNumerico2) / 1000
        const preSubtotal2 = ReglaDe3 * (DescuentoNumerico2 / 100)

        tickeTXT.textContent += 
        'producto: "' + nombreDeItems2[i].textContent + '"(' + inpKg[i].value + 'kg)' + "\n" +
        "precio: $" + ReglaDe3 + "\n"

        if(DescuentoNumerico2 == 0){   
            tickeTXT.textContent += "------------------------------" + "\n"
        }
        else{
            tickeTXT.textContent +=    
            "descuento: $" + preSubtotal2.toFixed(2) + "\n" +
            "------------------------------" + "\n"
        }
    }

    if (tickeTXT.textContent != ""){
        popupTicket.style="visibility: visible"
        popupCalculadoraDef.style="visibility: hidden"                
    }
})
