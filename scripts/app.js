import { Agenda } from "./classAgenda.js";
import { Contacto } from "./classContacto.js";
import { UI } from "./classUI.js";
import { AgendaStorage } from "./classLocalStorage.js";
import { validarEntradas } from "./Validacion.js"

let agenda = new Agenda();


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
    let encontrado = '';
    const buscado = document.getElementById('buscar').value;
    const ui = new UI();
    let agendaStorage = new AgendaStorage();
    agenda.listaContactos = agendaStorage.getContactosStorage();

    for (let i = 0; i < agenda.listaContactos.length; i++) {
        if (agenda.listaContactos[i].name.toLowerCase() == buscado.toLowerCase()) {
            encontrado = agenda.listaContactos[i];
            break
        }
    }

    if (encontrado === '') {
        ui.showMessage('Contacto inexistente', 'danger')
    } else {
        ui.showContacto(encontrado)
    }
})


// Eventos de validacion a formulario (a completar.)

let inputs = document.getElementsByName('aValidar');
inputs.forEach( (input) => {
    input.addEventListener('keyup', validarEntradas);
    input.addEventListener('blur', validarEntradas);
})
