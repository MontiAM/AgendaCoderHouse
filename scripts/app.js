import { Agenda } from "./classAgenda.js";
import { Contacto } from "./classContacto.js";
import { UI } from "./classUI.js";
import { AgendaStorage } from "./classLocalStorage.js";
import { validarEntradas } from "./Validacion.js"

let agenda = new Agenda();

// Evento CARGA DE PAGINA:
window.onload = () => {
    const ui = new UI();
    let agendaStorage = new AgendaStorage();
    agenda.listaContactos = agendaStorage.getContactosStorage();
    ui.addContacto(agenda);
}


// Evento del FORMULARIO: 
document.getElementById('agenda-form').addEventListener('submit', (e) =>{
    
    const name = document.getElementById('name').value;
    const tel = document.getElementById('tel').value;
    const mail = document.getElementById('mail').value;

    const ui = new UI();
    let agendaStorage = new AgendaStorage();
    agenda.listaContactos = agendaStorage.getContactosStorage();
    
    
    if (name === '' || tel ==='' || mail === '') {
        ui.showMessage('Faltan completar datos', 'danger')
    } else {
        const contacto = new Contacto(name, tel, mail);
        agenda.addContacto(contacto);

        ui.addContacto(agenda);
        ui.showMessage('Contacto Agregado', 'success')
        agendaStorage.addContactoStorage(agenda, contacto);
    }
    
    e.preventDefault();
});


// Evento de ORDENAR ALFABETICAMENTE
document.getElementById('ordenar').addEventListener('click', () => {

    const ui = new UI();
    let agendaStorage = new AgendaStorage();
    agenda.listaContactos = agendaStorage.getContactosStorage();

    agenda.listaContactos.sort( (a,b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
        else return 0
    })
    ui.addContacto(agenda);
    agendaStorage.setContactosStorage(agenda);
})


// Evento de BUSCAR CONTACTO
document.getElementById('btn-buscar').addEventListener('click', () => {
    let encontrado = new Agenda()
    const buscado = document.getElementById('buscar').value;
    const ui = new UI();
    let agendaStorage = new AgendaStorage();
    agenda.listaContactos = agendaStorage.getContactosStorage();

    for (let i = 0; i < agenda.listaContactos.length; i++) {
        if (agenda.listaContactos[i].name.toLowerCase() == buscado.toLowerCase()) {
            encontrado.addContacto(agenda.listaContactos[i]);
        }
    }

    if (encontrado.listaContactos.length !== 0) {
        ui.addContacto(encontrado)
    } else {
        ui.showMessage('Contacto inexistente', 'danger')
    }
})


// Evento BORRAR CONTACTO
document.getElementById('contact-list').addEventListener('click', (e) => {
    if (e.target.name === 'delete'){
        const ui = new UI();
        let agendaStorage = new AgendaStorage();
        agenda.listaContactos = agendaStorage.getContactosStorage();

        let ubicacion = '';
        agenda.listaContactos.map( (contacto, index) => {
            let id = contacto.name + contacto.tel;
            if (id == e.target.parentElement.id) {
                ubicacion = index;
            }
        })
        let confirmacion = confirm(`Seguro desea eliminar a ${agenda.listaContactos[ubicacion].name} de sus contactos?`);
        if (confirmacion) {
            agenda.listaContactos.splice(ubicacion, 1);
            agendaStorage.setContactosStorage(agenda);
            ui.deleteContact(e.target);
        }
    }
})


// Evento EDITAR CONTACTO
document.getElementById('contact-list').addEventListener('click', (e) => {
    if (e.target.name === 'edit') {

        const ui = new UI();
        let agendaStorage = new AgendaStorage();
        agenda.listaContactos = agendaStorage.getContactosStorage();

        let ubicacion = '';
        agenda.listaContactos.map( (contacto, index) => {
            let id = contacto.name + contacto.tel;
            if (id == e.target.parentElement.id) {
                ubicacion = index;
            }
        })

        ui.editContact(agenda.listaContactos[ubicacion]);

        const contenedorEdit = document.getElementById('contactoEdit');
        contenedorEdit.addEventListener('submit', (e) => {

            let editName = document.getElementById(agenda.listaContactos[ubicacion].name).value;
            let editTel = document.getElementById(agenda.listaContactos[ubicacion].tel).value;
            let editMail = document.getElementById(agenda.listaContactos[ubicacion].mail).value;
            let editContact = new Contacto(editName, editTel, editMail);

            for (let propiedad in editContact) {
                if (editContact[propiedad] !== '' && propiedad !== 'id') {
                    agenda.listaContactos[ubicacion][propiedad] = editContact[propiedad];
                }    
            }
            agenda.listaContactos[ubicacion].id = agenda.listaContactos[ubicacion].name + agenda.listaContactos[ubicacion].tel; 

            ui.addContacto(agenda);
            agendaStorage.setContactosStorage(agenda);

            e.preventDefault();
            contenedorEdit.parentElement.parentElement.remove();
        })
    }
})


// Eventos de validacion a formulario (a completar.)
let inputs = document.getElementsByName('aValidar');
inputs.forEach( (input) => {
    input.addEventListener('keyup', validarEntradas);
    input.addEventListener('blur', validarEntradas);
})
