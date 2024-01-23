document.addEventListener('DOMContentLoaded', function() {
var swiper = new Swiper(".myswiper",{
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    loopFillGroupwithBlank: none,
    pagination: {
        el:".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints:{
        0: {
            slidesPerView: 1
        },
        520:{
            slidesPerView: 2
        },
        950 :{
            slidesPerView: 3
        }
    }

});
});
//carrito

const carrito = document.getElementById("carrito");
const elementos = document.getElementById("lista");
const elementos2 = document.getElementById("lista-2");
const lista = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

cargarEventListeners();

function cargarEventListeners(){
    elementos.addEventListener("click", comprarElemento);

    elementos2.addEventListener("click", comprarElemento);

    carrito.addEventListener("click", eliminarElemento);

    vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

    document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

function comprarElemento(e) {
    e.preventDefault();
    if(e.target.classList.contains("agregar-carrito")) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector("img").src,
        titulo: elemento.querySelector("h3").textContent,
        precio: elemento.querySelector(".precio").textContent,
        id: elemento.querySelector("a").getAttribute("data-id")
    }

    insertarcarrito(infoElemento);
}

function insertarcarrito(elemento) {

    const row = document.createElement("tr");
    row.innerHTML =`
        <td>
            <img src="${elemento.imagen}" width="100"
        </td>
        <td>
            ${elemento.titulo}
        </td>
        <td>
            ${elemento.precio}
        </td
        <td>
            <a href="#" class="borrar" data-id="${elemento.id}">X</a>
        </td
    
    `;


    lista.appendChild(row);
    guardarElementoLocalStorage(elemento); 
}

function eliminarElemento(e){
    e.preventDefault();

    let elemento, 
        elementoId;
    
    if (e.target.classList.contains("borrar")) {

        const elemento = e.target.parentElement.parentElement;
        const elementoId = e.target.getAttribute("data-id");

        console.log("Elemento ID to remove:", elementoId);
        console.log("Before removal - elementosLS:", obtenerElementosLocalStorage());

        elemento.remove();

        console.log("After removal - elementosLS:", obtenerElementosLocalStorage());

        eliminarElementoLocalStorage(elementoId);

    }
}

function vaciarCarrito() {
    while(lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    vaciarLocalStorage();
    return false;
}

function guardarElementoLocalStorage(elemento) {
    let elementos;
    elementos = obtenerElementosLocalStorage();
    elementos = elementos || [];  // Verificación
    elementos.push(elemento);
    localStorage.setItem("elementos",JSON.stringify(elementos));
}

function obtenerElementosLocalStorage() {
    let elementosLS;

    if(localStorage.getItem("elementos")===null){
        elementosls = [];
    }else{
        elementosLS = JSON.parse(localStorage.getItem("elementos"));
    }
    return elementosLS;
}

function leerLocalStorage(){
    let elementosLS;
    elementosLS = obtenerElementosLocalStorage();
    elementosLS.forEach(function(elemento){
        const row = document.createElement("tr");
        row.innerHTML =`
            <td>
               <img src="${elemento.imagen}" width="100">
            </td>
            <td>
                ${elemento.titulo}
            </td>
            <td>
               ${elemento.precio}
            </td
            <td>
               <a href="#" class="borrar" data-id="${elemento.id}">X</a>
            </td
    
        `;
        lista.appendChild(row);


    }) ;


}

function eliminarElementoLocalStorage(elementoId) {
    console.log("Trying to remove Elemento with ID:", elementoId);
    let elementosLS = obtenerElementosLocalStorage();
    elementosLS = elementosLS.filter(elementoLS => elementoLS.id !== elementoId);

    localStorage.setItem("elementos", JSON.stringify(elementosLS));
    
    console.log("Elemento removed. New elementos:", elementosLS);

        


}

function vaciarLocalStorage(){
    localStorage.clear();
}


