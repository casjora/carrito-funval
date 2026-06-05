import carritoDb from '../data.json'

let carritoJson= carritoDb

//Variables que se comunican con el DOM

const contenedorTarjetas=document.getElementById("card-container")
const contenedorCarrito = document.getElementById("cart-container")
const listaC = document.getElementById("dessert-price")
const searchBar = document.getElementById("search-bar")

function crearTarjetas(listaProductos = carritoJson){
    contenedorTarjetas.innerHTML =""
    listaProductos.forEach(producto=>{
        
        const tarjeta = document.createElement("article");//contenedor de cada tarjeta
        const foto = document.createElement("img");//imagen de cada producto
        const addToCart = document.createElement("button"); //buton de añadir al carrito
        const detalles = document.createElement("div") //contenedor de los detalles del producto, tipo, nombre y precio

        foto.src=producto.image.mobile //direccion de la imagen en json, esta es para mobiles
        foto.alt=`fotografia de ${producto.name}`

        //estilos en tailwind
        addToCart.innerHTML=`<img src="../assets/images/icon-add-to-cart.svg" alt="icono de carrito" class="w-5"></><p class="text-md font-semibold">Add to Cart</p> `
        addToCart.className="flex gap-2 absolute left-25 bottom-20  border rounded-full bg-white py-2 px-6" 
        foto.className = "aspect-3/2 object-fill"
        tarjeta.className = " relative cursor-pointer  max-w-90 md:max-w-150 bg-[#FCF9F7] rounded-md overflow-hidden gap-10 mb-5 shadow";

        const contenidoHtml = `
        <span class="mt-7 text-[#87635A]">${producto.category}</span>
        <p class="font-bold">${producto.name}</p>
        <em class="text-amber-600 font-bold">$${producto.price.toFixed(2)}</em>`

        detalles.innerHTML=contenidoHtml;
        detalles.className="flex flex-col"

        //evento para agregar cantidades al carrito
        tarjeta.addEventListener("click",()=>{
            console.log("Añadir al carrito")
        })

        tarjeta.appendChild(foto)
        tarjeta.appendChild(addToCart)
        tarjeta.appendChild(detalles)

        contenedorTarjetas.appendChild(tarjeta)



    })

            contenedorCarrito.innerHTML=`
            <div class="w-100 max-w-90 md:max-w-150 bg-white rounded-md overflow-hidden gap-4 mb-5 shadow flex flex-col justify-center items-center">
                <h2 class="text-amber-700 self-start pl-5 text-xl font-bold">Your Cart (0)</h2>
                <img src="../assets/images/illustration-empty-cart.svg">
                <p class="text-[#87635A] font-semibold">Your added items will appear here</p>
            </div>
        
        `
}

function aplicarFiltros(){
    const rSeleccionada = listaC.value;
    const busqueda = searchBar.value.toLowerCase();

    let postresFiltrados = carritoJson;

    if(rSeleccionada !=="" && rSeleccionada !== "default"){
        postresFiltrados = postresFiltrados.filter(producto => producto.price.toFixed(2) ===rSeleccionada);
    }

    if (busqueda!==""){
        postresFiltrados = postresFiltrados.filter(producto=>producto.name.toLowerCase().includes(busqueda))

    }
    crearTarjetas(postresFiltrados);

}

function inicializarEscuchadoresFiltros(){
    listaC.addEventListener("change",aplicarFiltros)
    searchBar.addEventListener("input",aplicarFiltros)
}

function listaPrecios(){
    const preciosUnicos = [...new Set(carritoJson.map(producto=>producto.price.toFixed(2)))];
    preciosUnicos.forEach(precio=>{
        if (!precio) return;
        let elemento =document.createElement("option");
        elemento.textContent = precio;
        elemento.value = precio
        listaC.appendChild(elemento);
    })
}

export{listaPrecios,crearTarjetas,inicializarEscuchadoresFiltros}