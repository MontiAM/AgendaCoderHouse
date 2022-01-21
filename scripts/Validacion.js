const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ 
}

export const validarEntradas = (e) => {
    switch (e.target.id) {
        case "name": 
            if (expresiones.nombre.test(e.target.value)) {
                
            } else {

            }
            break
        case "tel":
            if (expresiones.telefono.test(e.target.value)) {

            } else {
                
            }
            break
        case "mail":
            if (expresiones.correo.test(e.target.value)) {

            } else {
                
            }
            break
        case "buscar":
            break
    }
}