export class UI { 
    constructor () {
        this.api = new APIinteraccion();
        this.fotos = this.api.obtenerFotos();
    }

    addContacto(agenda) {
        const listaContactos = document.getElementById('contact-list');
        listaContactos.innerHTML = '';  
        const elemento = document.createElement('div');
        for (let i = 0; i < agenda.listaContactos.length; i++) {
            let name = agenda.listaContactos[i].name;
            let tel = agenda.listaContactos[i].tel;
            let mail = agenda.listaContactos[i].mail;
            let img = agenda.listaContactos[i].img;
            let idContacto = agenda.listaContactos[i].id
            elemento.innerHTML += `
            <div class ="card cardContact mb4">
                <img class="img-contacto" src="${img}"></img>
                <div id="${idContacto}">
                    <div name="card-contact"><strong>Nombre Contacto</strong>: ${name}</div>
                    <div><strong>Telefono</strong>: ${tel}</div>
                    <div><strong>E-Mail</strong>: ${mail}</div>
                    <a class="btn btn-primary" name="edit">Editar</a>
                    <a class="btn btn-danger" name="delete">Borrar</a>
                </div>
            </div>
            `;
    
            $(listaContactos).append(elemento);
        }
        this.resetForm();
    }

    resetForm (){
        document.getElementById('agenda-form').reset();
    }

    deleteContact(element) {
        $(element.parentElement).slideDown("slow", () => element.parentElement.parentElement.remove());
        this.showMessage('Contacto Eliminado', 'info')
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass}`
        div.appendChild(document.createTextNode(message));
        const body = document.querySelector('body');
        const nav = document.querySelector('.nav');

        body.insertBefore(div, nav);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2000);
    }

    editContact(contacto){
        let nombre = contacto.name;
        let tel = contacto.tel;
        let mail = contacto.mail;
        let img = contacto.img;

        let edit = document.createElement('div');
        edit.className = 'editContacto';
        edit.innerHTML = `
        <div class="p-2">
            <h1 class="card-header h-10">Contacto</h1>
            <form id="contactoEdit" class="card-body">
                <div class="form-group flex-line">
                    <label for="name" class="fw-bold text-center p-4 w-25">Nombre</label>
                    <input type="text" id="${nombre}" placeholder="${nombre}" name="aValidar" class="form-control name">
                </div>
                <div class="form-group flex-line">
                    <label for="tel" class="fw-bold text-center p-4 w-25">Telefono</label>
                    <input type="number" id="${tel}" placeholder="${tel}" name="aValidar" class="form-control tel">
                </div>
                <div class="form-group flex-line">
                    <label for="email" class="fw-bold text-center p-4 w-25">Email</label>
                    <input type="email" id="${mail}" placeholder="${mail}" name="aValidar" class="form-control mail">
                </div>
                <div class="form-group mt-3 d-flex justify-content-center">
                    <img id="fotoPerfilEdit" class="w-10" src="${img}"></img>
                    <div class="d-flex align-items-center"">
                        <button id="btnEditarFoto" class="text-center ms-5 btn btn-primary">Editar Foto</button>
                    </div> 
                </div>
                <input type="submit" value="Guardar", class="mt-3 btn btn-primary w-100">
            </form>
        </div>
        `;

        const body = document.querySelector('body');
        const contenedor = document.querySelector('.contenedor');
        edit.style.display = "none";
        body.insertBefore(edit, contenedor);
        $(edit).slideDown("slow");
    };

    showPhotoOptions() {
        let contenedorFotos = document.createElement('div');
        contenedorFotos.className = 'editContacto fotosContainer';
        contenedorFotos.id = 'editPhoto'
        contenedorFotos.style.display = 'none'
        contenedorFotos.innerHTML = `
            <div class="container mt-4">
                <h1 class="card-header">Seleccionar imagen</h1>
                <div id="fotosContenedor" class="d-flex flex-wrap text-center">
                </div>
            </div>`;
        $('.nav').after(contenedorFotos);
        $(contenedorFotos).slideDown("slow");
        this.fotos.map((foto) => {
            $('#fotosContenedor').append(`<img name="picture" src="${foto}" class="img-fluid img-thumbnail d-block">
            `);
        });


    }

}

