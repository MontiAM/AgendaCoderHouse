export class AgendaStorage {

    getContactosStorage() {
        let listaContactos = [];
        if (localStorage.getItem('listaContactos') !== null) {
            listaContactos = JSON.parse(localStorage.getItem('listaContactos'));
        }
        return listaContactos;
    }

    setContactosStorage(agenda) {
        let listaContactos = JSON.parse(localStorage.getItem('listaContactos'));
        listaContactos = agenda.listaContactos;
        localStorage.setItem('listaContactos', JSON.stringify(listaContactos));
    }

    addContactoStorage(agenda, contacto) {
        if (localStorage.getItem('listaContactos') === null) {
            localStorage.setItem('listaContactos', JSON.stringify(agenda.listaContactos));
        } else {
            let listaContactos = JSON.parse(localStorage.getItem('listaContactos'));
            listaContactos.push(contacto);
            localStorage.setItem('listaContactos', JSON.stringify(listaContactos));
        }
    }
}