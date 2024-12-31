let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

function cargarProductosCarrito(){
    if(productosEnCarrito && productosEnCarrito.length > 0){

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
            const article = document.createElement("article");
            article.classList.add("carrito-info-container");
            article.innerHTML = `
            <div class="carrito-img-container">
                <img class="img-carrito" src="${producto.imagen}" alt="${producto.producto}">
            </div>
            <div class="carrito-info--nombre">
                <small>PRODUCTO</small>
                <p>${producto.producto}</p>
            </div>
            <div class="carrito-info--cantidad">
                <small>CANTIDAD</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carrito-info--precio">
                <small>PRECIO</small>
                <p>$ ${producto.precio}</p>
            </div>
            <div class="carrito-info--subtotal">
                <small>SUBTOTAL</small>
                <p>$ ${producto.precio * producto.cantidad}</p>
            </div>
            <div class="carrito-info--button-eliminar">
                <button class="eliminar" id=${producto.id}><span></span></button>
            </div>
            `;
    
            contenedorCarritoProductos.append(article);
    
        })
        
        actualizarBotonesEliminar();
        actualizarTotal();
    
    }else{
    
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
        
    }
    // actualizarBotonesEliminar();
}

cargarProductosCarrito();

function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e){
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();

}

function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$ ${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}

async function obtenerValorDolar(){
    const response = await fetch('https://dolar-api-argentina.vercel.app/v1/dolares/blue');
    const valorDolar = await response.json();
    console.log(valorDolar)
    let text = document.querySelector(".valor-dolar-hoy");
    text.innerText=valorDolar.venta;

    let textFecha = document.querySelector(".fecha-valor-dolar");
    const fecha = new Date(valorDolar.fechaActualizacion);
    let fechaFormateada = fecha.getDay() + " / " + fecha.getMonth() + " / " + fecha.getFullYear();
    console.log(fechaFormateada);
    textFecha.innerText=fechaFormateada;
}
obtenerValorDolar()

/*
*/