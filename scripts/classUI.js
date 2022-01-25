export class UI {
    
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
            listaContactos.appendChild(elemento);
        }
        this.resetForm();
    }

    resetForm (){
        document.getElementById('agenda-form').reset();
    }

    deleteContact(element) {
        if (element.name === 'delete') {
            element.parentElement.parentElement.remove();
            this.showMessage('Contacto Eliminado', 'info')
        }
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

}

