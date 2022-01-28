const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ 
}

const validarEntradas = (e) => {
    switch (e.target.classList[1]) {
        case "name": 
            if (expresiones.nombre.test(e.target.value)) {
                console.log(expresiones.nombre.test(e.target.value));
            } else {
                console.log(expresiones.nombre.test(e.target.value))
            }
            break
        case "tel":
            if (expresiones.telefono.test(e.target.value)) {
                console.log(expresiones.telefono.test(e.target.value));
            } else {
                console.log(expresiones.telefono.test(e.target.value));
            }
            break
        case "mail":
            if (expresiones.correo.test(e.target.value)) {
                console.log(expresiones.correo.test(e.target.value));
            } else {
                console.log(expresiones.correo.test(e.target.value));
            }
            break
        case "buscar":
            if (expresiones.nombre.test(e.target.value)) {
                console.log(expresiones.nombre.test(e.target.value));
            } else {
                console.log(expresiones.nombre.test(e.target.value))
            }
            break
    }
}


export const eventoValidarEntradas = () => {
    let inputs = document.getElementsByName('aValidar');
    inputs.forEach( (input) => {
    input.addEventListener('keyup', validarEntradas);
    input.addEventListener('blur', validarEntradas);
    })
}
