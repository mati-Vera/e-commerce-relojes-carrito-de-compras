//Productos
const productos = [
    //Hombre
    {
        id: "reloj-01",
        producto: "Reloj 01",
        imagen: "../assets/img/Relojes/Relojeria-hombre/reloj_1.jpg",
        categoria: {
            nombre: "HOMBRE",
            id: "hombre"
        },
        precio: 1000
    },
    {
        id: "reloj-02",
        producto: "Reloj 02",
        imagen: "../assets/img/Relojes/Relojeria-hombre/reloj_2.jpg",
        categoria: {
            nombre: "HOMBRE",
            id: "hombre"
        },
        precio: 1000
    },
    {
        id: "reloj-03",
        producto: "Reloj 03",
        imagen: "../assets/img/Relojes/Relojeria-hombre/reloj_3.jpg",
        categoria: {
            nombre: "HOMBRE",
            id: "hombre"
        },
        precio: 1000
    },
    {
        id: "reloj-04",
        producto: "Reloj 04",
        imagen: "../assets/img/Relojes/Relojeria-hombre/reloj_4.jpg",
        categoria: {
            nombre: "HOMBRE",
            id: "hombre"
        },
        precio: 1000
    },
    //Ironman sport
    {
        id: "reloj-05",
        producto: "Reloj 05",
        imagen: "../assets/img/Relojes/Relojeria-ironman/reloj_5.jpg",
        categoria: {
            nombre: "IRONMAN SPORT",
            id: "ironman"
        },
        precio: 3000
    },
    //Mujer
    {
        id: "reloj-06",
        producto: "Reloj 06",
        imagen: "../assets/img/Relojes/Relojeria-mujer/reloj_6.jpg",
        categoria: {
            nombre: "MUJER",
            id: "mujer"
        },
        precio: 2000
    },
    {
        id: "reloj-07",
        producto: "Reloj 07",
        imagen: "../assets/img/Relojes/Relojeria-mujer/reloj_7.jpg",
        categoria: {
            nombre: "MUJER",
            id: "mujer"
        },
        precio: 2000
    },
    {
        id: "reloj-08",
        producto: "Reloj 08",
        imagen: "../assets/img/Relojes/Relojeria-mujer/reloj_8.jpg",
        categoria: {
            nombre: "MUJER",
            id: "mujer"
        },
        precio: 2000
    },
    {
        id: "reloj-09",
        producto: "Reloj 09",
        imagen: "../assets/img/Relojes/Relojeria-mujer/reloj_9.jpg",
        categoria: {
            nombre: "MUJER",
            id: "mujer"
        },
        precio: 2000
    },
    //Smart
    {
        id: "reloj-10",
        producto: "Reloj 10",
        imagen: "../assets/img/Relojes/Relojeria-smart/reloj_10.jpg",
        categoria: {
            nombre: "SMARTWATCH",
            id: "smart"
        },
        precio: 5000
    },
    //Vestir
    {
        id: "reloj-11",
        producto: "Reloj 11",
        imagen: "../assets/img/Relojes/Relojeria-vestir/reloj_11.jpg",
        categoria: {
            nombre: "VESTIR",
            id: "vestir"
        },
        precio: 4000,
        cantidad: 1
    }
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria"); 
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-info--agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const article = document.createElement("article"); /*div de cada elemento (reemplazar por articule)*/
        article.classList.add("producto-info-container"); /* producto-info-container `` */
        article.innerHTML = `
            <div class="producto-info-top">
                <img class="producto-info--img" src="${producto.imagen}" alt="${producto.producto}">
            </div>
            <div class="producto-info-bottom">
                <p class="producto-info--categoria">${producto.categoria.nombre}</p>
                <p class="producto-info--nombre">${producto.producto}</p>
                <p class="producto-info--precio">$ ${producto.precio}</p>
                <button class="producto-info--agregar" id="${producto.id}">AGREGAR</button>
            </div>
        ` 
        contenedorProductos.append(article);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todo"){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);

            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        }else{
            tituloPrincipal.innerText = "TODOS LOS PRODUCTOS";
            cargarProductos(productos);
        }
        
    })
});

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-info--agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
}else{
    productosEnCarrito = [];
}

function agregarAlCarrito(e){

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
};

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
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