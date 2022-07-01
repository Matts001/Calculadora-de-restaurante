const btnGuadar = document.querySelector('#guardar-cliente');

let cliente = {
    mesa: '',
    hora: '',
    pedido :[],
}

const categorias = {
    1: 'Comida',
    2: 'Bebidas',
    3: 'Postres'
}

addEventListener();
function addEventListener(){
    btnGuadar.addEventListener('click',validar);
}


function validar() {
    const mesa = document.querySelector('#mesa').value;
    const hora = document.querySelector('#hora').value;

    if(mesa == ''|| hora == ''){
        alert('ambos campos son obligatorios')
        return;
    }else{
        var modalFormulario = document.querySelector('#formulario');
        var modal = bootstrap.Modal.getInstance(modalFormulario);
        modal.hide();

        mostrarOculto();
        mostarPlatillos();
    }
}

function mostrarOculto(){
    const ocultos  = document.querySelectorAll('.d-none');
    ocultos.forEach(oculto => oculto.classList.remove('d-none'));
}
function mostarPlatillos(){

    const url = 'http://localhost:4000/platillos';
    fetch(url)
    .then(response => response.json())
    .then(resultado => mostrarPlatillos(resultado))
}

function mostrarPlatillos(platillos) {
    const contenido = document.querySelector('#platillos .contenido');

    platillos.forEach(platillo => {
        const row = document.createElement('DIV');
        row.classList.add('row', 'border-top' );

    
        const nombre = document.createElement('DIV');
        nombre.classList.add('col-md-4', 'py-3');
        nombre.textContent = platillo.nombre;

        const precio = document.createElement('DIV');
        precio.classList.add('col-md-3', 'py-3', 'fw-bold');
        precio.textContent = `$${platillo.precio}`;

        const categoria = document.createElement('DIV');
        categoria.classList.add('col-md-3', 'py-3');
        categoria.textContent = categorias[platillo.categoria];

        const inputCantidad = document.createElement('INPUT');
        inputCantidad.type = 'number';
        inputCantidad.min = 0;
        inputCantidad.value = 0;
        inputCantidad.id = `producto-${platillo.id}`;
        inputCantidad.classList.add('form-control');
        inputCantidad.onchange = function() {
            const cantidad = parseInt( inputCantidad.value );
           agregarPlatillo({...platillo, cantidad});
        }

        const agregar = document.createElement('DIV');
        agregar.classList.add('col-md-2', 'py-3');
        agregar.appendChild(inputCantidad);

        row.appendChild(nombre);
        row.appendChild(precio);
        row.appendChild(categoria);
        row.appendChild(agregar);

        contenido.appendChild(row);
    })

    
}
