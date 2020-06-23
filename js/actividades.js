const firebaseConfig = {
    apiKey: "AIzaSyD7K8sNo_tvMWipOgtY7QUxNzAz_cFaWFo",
    authDomain: "gestru-5943e.firebaseapp.com",
    databaseURL: "https://gestru-5943e.firebaseio.com",
    projectId: "gestru-5943e",
    storageBucket: "gestru-5943e.appspot.com",
    messagingSenderId: "930084029473",
    appId: "1:930084029473:web:7dfb090e6b93ca100d4f60"
};


/**
 * @Description Variables de inicializacion de firebase y sus servicios
 * @version        0.5                     
 * @author         Jannier Flores         
 * @copyright     Gestru  
 * @date 2020-06-22   
 *
        */
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

/**
 * @Description Cerrar sesion mediante el servicio de autenticacion de firebase
 * @version        0.5                     
 * @author         Jannier Flores         
 * @copyright     Gestru    
 * @date 2020-06-22 
 *
        */
function cerrarSesion() {
    auth.signOut().then(() => {
        console.log("Sesión Cerrada")
    })
}

/**
 * @Description Variables para la interfaz de usuario, especificamente se usa
                    * querySelector para mas adelante cambiar los mensajes que
                        *se le muestra al usuario
 * @version        0.5                     
 * @author         Jannier Flores         
 * @copyright     Gestru   
 * @date 2020-06-22  
 *
        */

let modalBody = document.querySelector("#modalBody");
let modalTittle = document.querySelector("#modalTittle");
let nombreInput = document.querySelector("#nombreTxt");
let inicioInput = document.querySelector("#inicioTxt");
let finInput = document.querySelector("#finTxt");
/**
 * @Description Crea un boton de agregar al renderizar, añade atributos y funcion agregar
 * @version        0.5                     
 * @author         Jannier Flores         
 * @copyright     Gestru   
 * @date 2020-06-22  
 *
        */


let div = document.querySelector('#divBtnAgregar');
let btnAgregar = document.createElement('button');
btnAgregar.innerHTML = 'Agregar';
btnAgregar.className += 'btn btn-warning form-control text-uppercase font-weight-bold';
btnAgregar.setAttribute('id', 'agregaActividadBtn');
btnAgregar.addEventListener('click', agregarActividad);
div.appendChild(btnAgregar);



/**
 * @Description Inicializa los valores por defecto para los input date,
 *                  *implementando libreria js
 * @version        0.5                     
 * @author         Jannier Flores         
 * @copyright     Gestru  
 * @date 2020-06-22   
 *
        */


function setearFechas() {
    let inicio = document.querySelector('#inicioTxt');
    let fin = document.querySelector('#finTxt');
    let hoy = moment().format('YYYY-MM-DD');
    inicio.min = hoy;
    inicio.value = hoy;
    fin.value = hoy;
    fin.min = hoy;

    inicio.addEventListener('change', () => {
        fin.min = inicio.value;
        fin.value = inicio.value;
    })
}

/**
 * @Description     Propiedad que realiza la accion de cargar el cronograma, con el querySelector
 *                     * nos devolvera el primero elemento en este caso del ("SelectCronograma"),
 *                          * esto incluye la validacion de este mismo.
 * @constructor     function cargarSelectCronograma(),
 * @returns         {boolean} retorna un false en caso de que no se cumplan las condiciones
                      *para que no se pueda continuar si no se cumple la condicion
 * @version        0.5                     
 * @author         Robertt Stevenson         
 * @copyright     Gestru     
 * @date 2020-06-22
 */
function cargarSelectCronograma() {

    let selectCronograma = document.querySelector("#selectCronograma");
    db.collection("cronogramas").onSnapshot((querySnapshot) => {
        selectCronograma.innerHTML = ``;
        querySnapshot.forEach((doc) => {
            selectCronograma.innerHTML += `
            <option>${doc.data().nombre}</option>
            `
        })
        if (selectCronograma.value == "") {
            let alertdiv = document.querySelector("#alertActividad");
            let alertUI = document.createElement("div");
            alertUI.setAttribute("class", "alert alert-danger ml-auto");
            alertUI.setAttribute("role", "start");
            alertUI.setAttribute("id", "alertUI");
            alertUI.innerHTML = 'No existen Cronogramas, Agrege un Cronograma antes de agregar una Actividad '
            alertdiv.appendChild(alertUI);
            return false;
        };

    })
}

/**
 * @Description     Propiedad que realiza la accion de cargar la lista de trabajadores,  
                      * con el querySelecto nos devolvera el primero elemento en este caso del ("SelectTrabajador"),                       
                          * esto incluye la validacion de este mismo.
 * @constructor     function cargarSelectTrabajadores(),
 *@returns         {boolean} retorna un false en caso de que no se cumplan las condiciones
                      *para que no se pueda continuar si no se cumple la condicion
 * @version        0.5                     
 * @author         Jannier Flores         
 * @copyright     Gestru     
 * @date 2020-06-22
 */

function cargarSelectTrabajadores() {
    let selectTrabajador = document.querySelector("#selectTrabajador");
    db.collection("usuarios").onSnapshot((querySnapshot) => {
        selectTrabajador.innerHTML = ``;
        querySnapshot.forEach((doc) => {
            selectTrabajador.innerHTML += `
            <option>${doc.data().nombre}</option>
            `
        })
        if (selectCronograma.value == "") {
            let alertdiv = document.querySelector("#alertActividad");
            let alertUI = document.createElement("div");
            alertUI.setAttribute("class", "alert alert-danger ml-auto");
            alertUI.setAttribute("role", "start");
            alertUI.setAttribute("id", "alertUI");
            alertUI.innerHTML = 'No existen Trabajadores, Agrege un Trabajador antes de agregar una Actividad '
            alertdiv.appendChild(alertUI);
            return false;
        };

    })
}
/**
 * @Description     Propiedad que realiza la accion de validar que el formulario este completo , 
                    * inicializando los campos que se muestran,               
                          * esto incluye la validacion de este mismo.
 * @constructor     function validarFormulario(),
 * @returns         {boolean} retorna un false en caso de que no se cumplan las condiciones
                      *para que no se pueda continuar si no se cumple la condicion
 * @version        0.5                     
 * @author         Jannier Flores         
 * @copyright     Gestru     
 * @date 2020-06-22
 * 
 */

function validarFormulario() {
    let alertdiv = document.querySelector("#alertActividad");
    let alertUI = document.createElement("div");
    let nombre = document.querySelector("#nombreTxt").value;
    let nombreInput = document.querySelector("#nombreTxt");
    alertUI.setAttribute("class", "alert alert-danger ml-auto");
    alertUI.setAttribute("role", "start");
    alertUI.setAttribute("id", "alertUI");
    alertUI.innerHTML = 'Verifique Datos'
    $("#alertUI").remove();

    if (nombre.length == 0) {
        alertdiv.appendChild(alertUI);
        nombreInput.setAttribute("class", "form-control is-invalid")
        return false;
    } else {
        if (nombre.length > 30) {
            alertUI.innerHTML = "Nombre Excede de 30 Caracteres";
            alertdiv.appendChild(alertUI);
            nombreInput.setAttribute("class", "form-control is-invalid")
            return false;
        }
    }
    return true;
}


/**
 * @Description     Propiedad que realiza la accion de agregar una nueva actividad,  
                      * esto inicializa los campos observados declarandolos como constanes en base a los inputs del HTML
                        * y guarda los datos ingresados en la base de datos              
                          * esto incluye la validacion de este mismo.
 * @constructor     function agregarActividad(),
 * @returns         {boolean} retorna un false si la funcion validarFormulario no se cumple 
 * @version        0.5                     
 * @author         Robertt Stevenson         
 * @copyright     Gestru     
 * @date 2020-06-22
 */

function agregarActividad() {
    let nombre = document.querySelector('#nombreTxt').value;
    let inicio = document.querySelector('#inicioTxt').value;
    let fin = document.querySelector('#finTxt').value;

    let hoy = moment().format('YYYY-MM-DD');

    if (moment(inicio).isBefore(hoy) || moment(fin).isBefore(inicio)) {
        if (moment(inicio).isBefore(hoy)) {
            inicioInput.setAttribute("class", "form-control is-invalid")
        };

        if (moment(fin).isBefore(inicio)) {
            finInput.setAttribute("class", "form-control is-invalid")
        }

        return false;
    }

    if (validarFormulario() != true) {
        return false;
    } else {
        nombreInput.setAttribute("class", "form-control")
    }

    db.collection("actividades").add({
        nombre: nombre,
        fechaInicio: inicio,
        fechaTermmino: fin,
        cronograma: cronograma,
        trabajador: trabajador
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            let nombreUI = document.querySelector("#nombreTxt").value;
            modalTittle.innerHTML = 'Operacion Exitosa';
            modalBody.innerHTML = `Se ha agregado la actividad "${nombreUI}" correctamente`;
            $('#modalActividad ').modal('show');
            document.querySelector('#nombreTxt').value = '';
            setearFechas();

        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
            let nombreUI = document.querySelector("#nombreTxt").value;
            modalTittle.innerHTML = 'Operacion Con error';
            modalBody.innerHTML = `No se ha agregado la actividad "${nombreUI}" correctamente`;
            $('#modalActividad ').modal('show');

        });
}


/**
 * @Description     Propiedad que realiza la accion de mostrar las actividades agregadas,  
                      * con el querySelecto nos devolvera los primeros elementos
                        *    que fueron agregados a la tabla, estos datos son traidos desde la base de datos          
                          * esto incluye apartados para eliminar la actividad y editarla
 * @version        0.5                     
 * @author         Jannier Flores         
 * @copyright     Gestru     
 * @date 2020-06-22
 */
//Mostrar de Actividades
const table = document.querySelector('#tableActividades');
db.collection("actividades").onSnapshot((querySnapshot) => {
    table.innerHTML = '';
    querySnapshot.forEach((doc) => {
        const id = doc.id;
        table.innerHTML += `
        <tr>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().fechaInicio}</td>
        <td>${doc.data().fechaTermmino}</td>
        <td>${doc.data().cronograma}</td>
        <td>${doc.data().trabajador}</td>
        <td><button class="btn btn-danger" onclick=eliminar('${id}')>Eliminar</button></td>
        <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().fechaInicio}','${doc.data().fechaTermmino}','${doc.data().cronograma}','${doc.data().trabajador}')" > Editar</button></td>
        </tr>`
    });
});


/**
 * @Description     Propiedad que realiza la accion de modificar una actividad,  
                      * con el querySelecto nos devolvera todos los elementos ingresados de la actividad 
                      * para poder editar los datos           
                          * esto incluye la validacion de este mismo.
 * @constructor     function editar(),
 * @returns         {boolean} retorna siempre un false hasta que se cumplan todas las condiciones de los campos
 * @version        0.5                     
 * @author         Jannier Flores         
 * @copyright     Gestru     
 * @date 2020-06-22
 */

function editar(id, nombre, fechaInicio, fechaTermmino, cronograma, trabajador) {
    console.log("Entrando a funcion editar act")
    document.querySelector("#nombreTxt").value = nombre;
    document.querySelector("#inicioTxt").value = fechaInicio;
    document.querySelector("#finTxt").value = fechaTermmino;
    document.querySelector("#selectCronograma").value = cronograma;
    document.querySelector("#selectTrabajador").value = trabajador;
    boton = document.querySelector("#agregarActividadBtn");
    boton.innerHTML = 'Guardar';
    boton.onclick = function () {
        console.log("Entrando a funcion Guardar act")
        let actividadEdit = db.collection("actividades").doc(id);
        let nombre = document.querySelector("#nombreTxt").value.trim();
        if (nombre == "") {
            alert('Debe ingresar un nombre');
            return false;
        }
        let inicio = document.querySelector("#inicioTxt").value;
        if (inicio == "") {
            alert("debe ingresar un inicio");
            return false
        }

        let fin = document.querySelector('#finTxt').value;
        if (fin == "") {
            alert("debe ingresar un fin");
            return false
        }
        let cronograma = document.querySelector("#selectCronograma").value;
        let trabajador = document.querySelector("#selectTrabajador").value;

        return actividadEdit.update({
            nombre: nombre,
            fechaInicio: inicio,
            fechaTermmino: fin,
            cronograma: cronograma,
            trabajador: trabajador
        }).then(function () {
            console.log("Documento actualizado");
            const nombreUI = document.querySelector("#nombreTxt").value;
            modalTittle.innerHTML = 'Operacion Exitosa';
            modalBody.innerHTML = `Se ha modificado la actividad "${nombreUI}" correctamente`;
            $('#modalActividad ').modal('show');
            boton.innerHTML = 'Agregar';
            document.querySelector("#nombreTxt").value = "";
            document.querySelector("#inicioTxt").value = "";
            document.querySelector("#finTxt").value = "";
            return false;
        }).catch(function (error) {
            console.log("no se actualizó correctamente", error);
            const nombreUI = document.querySelector("#nombreTxt").value;
            modalTittle.innerHTML = 'Operacion con error';
            modalBody.innerHTML = `No se ha agregado la actividad "${nombreUI}" `;
            $('#modalActividad ').modal('show');
        })

    }


}
/**
 * @Description     Propiedad que realiza la accion de Borrar una nueva actividad,  
                      * esto elimina los datos ingresados de una actividad y de la base de datos.                
 * @constructor     function eliminar(id),
 * @version        0.5                     
 * @author         Robertt Stevenson         
 * @copyright     Gestru     
 * @date 2020-06-22
 */
//Borrar Acitivdad
function eliminar(id) {
    db.collection("actividades").doc(id).delete().then(function () {
        console.log("Documento borrado Correctamente(actividad)");
        const nombreUI = document.querySelector("#nombreTxt").value;
        modalTittle.innerHTML = 'Operacion Exitosa';
        modalBody.innerHTML = ` se ha borrado la actividad  `;
        $('#modalActividad ').modal('show');
    }).catch(function (error) {
        console.error("Error elimiando el objeto :", error);
        const nombreUI = document.querySelector("#nombreTxt").value;
        modalTittle.innerHTML = 'Operacion con error';
        modalBody.innerHTML = `No se ha borrado la actividad, ${error} `;
        $('#modalActividad ').modal('show');
    });
}
