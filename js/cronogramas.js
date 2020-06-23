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
btnAgregar.setAttribute('id', 'agregarCronogramaBtn');
btnAgregar.addEventListener('click', agregarCronograma);
div.appendChild(btnAgregar);


/**
 * @Description     Inicializa los valores por defecto para los input date,
                        *implementando libreria js
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
 * @Description     Propiedad que realiza la accion de cargar el los datos ingresados en obras, 
                     * con esto cargamos los datos desde la base de datos 
                             * esto incluye la validacion de este mismo.
 * @constructor     function cargarSelectCronograma(),
 * @version        0.5                     
 * @author         Robertt Stevenson         
 * @copyright     Gestru     
 * @date 2020-06-22
 */

function cargarSelectObra() {
    const selectObra = document.querySelector("#selectObra");
    db.collection("obras").onSnapshot((querySnapshot) => {
        selectObra.innerHTML = ``;
        querySnapshot.forEach((doc) => {
            const nombre = doc.nombreObra;
            selectObra.innerHTML += `
            <option>${doc.data().nombre}</option>
            `
        })

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
    let alertdiv = document.querySelector("#alertCronograma");
    let alertUI = document.createElement("div");
    let nombre = document.querySelector("#nombreTxt").value;
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
 * @Description     Propiedad que realiza la accion de agregar un nuevo cronograma,  
                      * esto inicializa los campos observado declarandolos como constanes en base a los inputs del HTML
                         *  y guarda los datos ingresados en la base de datos               
                             * esto incluye la validacion de este mismo.
 * @constructor     function agregarActividad(),
 * @returns         {boolean} retorna un false si la funcion validarFormulario() no se cumple 
                        *despues de que la validacion sea correcta agrega los datos a la base de datos
 * @version        0.5                     
 * @author         Robertt Stevenson         
 * @copyright     Gestru     
 * @date 2020-06-22
 */

function agregarCronograma() {
    let nombre = document.querySelector('#nombreTxt').value.trim();
    let inicio = document.querySelector("#inicioTxt").value;
    let fin = document.querySelector('#finTxt').value;
    let estado = document.querySelector("#selectEstado").value;
    let obra = document.querySelector("#selectObra").value;


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
    db.collection("cronogramas").add({
        nombre: nombre,
        fechaInicio: inicio,
        fechaTermmino: fin,
        estado: estado,
        obra: obra
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            let nombreUI = document.querySelector("#nombreTxt").value;
            modalTittle.innerHTML = 'Operacion Exitosa';
            modalBody.innerHTML = `Se ha agregado la fase "${nombreUI}" correctamente`;
            nombreInput.setAttribute("class", "form-control");
            inicioInput.setAttribute("class", "form-control");
            finInput.setAttribute("class", "form-control");
            $('#modalFase').modal('show');
            document.querySelector('#nombreTxt').value = '';
            setearFechas();
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
            let nombreUI = document.querySelector("#nombreTxt").value;
            modalTittle.innerHTML = 'Operacion Con error';
            modalBody.innerHTML = `no se ha agregado la fase "${nombreUI}" correctamente`;
            $('#modalFase').modal('show');
            setearFechas();
        });
}

/**
 * @Description     Propiedad que realiza la accion de mostrar los cronogramas agregados,  
                      * con el querySelecto nos devolvera los primeros elementos
                        *    que fueron agregados a la tabla, estos datos son traidos desde la base de datos          
                          * esto incluye apartados para eliminar el cronograma y editarlo
 * @version        0.5                     
 * @author         Jannier Flores         
 * @copyright     Gestru     
 * @date 2020-06-22
 */
//leer de Cronograma
const table = document.querySelector('#tableCronogramas')
db.collection("cronogramas").onSnapshot((querySnapshot) => {
    table.innerHTML = '';
    querySnapshot.forEach((doc) => {
        const id = doc.id;
        select = document.querySelector("#selectEstado");
        table.innerHTML += `
        <tr>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().fechaInicio}</td>
        <td>${doc.data().fechaTermmino}</td>
        <td>${doc.data().estado}</td>
        <td>${doc.data().obra}</td>
        <td><button class="btn btn-danger" onclick=eliminar('${id}')>Eliminar</button></td>
        <td><button id='btnEditar' class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().fechaInicio}','${doc.data().fechaTermmino}','${doc.data().estado}','${doc.data().obra}','${select}')">Editar</button></td>
        </tr>`
    });
});


/**
 * @Description     Propiedad que realiza la accion de modificar un cronograma,  
                      * con el querySelecto nos devolvera todos los elementos ingresados al cronograma
                      * para poder editar estos datos,
                      * esto incluye de agregar para poder mandar los datos actualizados a la base de datos           
                          * esto incluye la validacion de este mismo.
 * @constructor     function editar(),
 * @returns         {boolean} retorna siempre un false hasta que se cumplan todas las condiciones de los campos
 * @version        0.5                     
 * @author         Jannier Flores         
 * @copyright     Gestru     
 * @date 2020-06-22
 */
//Editar
function editar(id, nombre, fechaInicio, fechaTermmino, estado, obra, select) {
    console.log("Entrando a funcion editar")
    document.querySelector("#nombreTxt").value = nombre;
    document.querySelector("#inicioTxt").value = fechaInicio;
    document.querySelector("#finTxt").value = fechaTermmino;
    document.querySelector("#selectEstado").value = estado;

    div.removeChild(btnAgregar);
    let btnEditar = document.createElement('button');
    btnEditar.innerHTML = 'Modificar';
    btnEditar.className += 'btn btn-warning form-control text-uppercase font-weight-bold';
    div.innerHTML = '';
    div.appendChild(btnEditar);
    btnEditar.addEventListener('click', function () {
        nombreInput.setAttribute("class", "form-control")
        let nombreUI = document.querySelector("#nombreTxt").value
        select = document.querySelector("#selectEstado");
        select.removeAttribute("disabled");
        let nombre = document.querySelector("#nombreTxt").value.trim();
        let inicio = document.querySelector("#inicioTxt").value;
        let fin = document.querySelector('#finTxt').value;
        let estado = document.querySelector("#selectEstado").value;
        let obra = document.querySelector("#selectObra").value;

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

        return db.collection("cronogramas").doc(id).update({
            nombre: nombre,
            fechaInicio: inicio,
            fechaTermmino: fin,
            estado: estado,
            obra: obra
        }).then(function () {
            console.log("Documento actualizado");
            modalTittle.innerHTML = 'Operacion Exitosa';
            modalBody.innerHTML = `Se ha actualizado la fase "${nombreUI}" correctamente`;
            nombreInput.setAttribute("class", "form-control");
            inicioInput.setAttribute("class", "form-control");
            finInput.setAttribute("class", "form-control");
            $('#modalFase').modal('show');
            document.querySelector("#nombreTxt").value = "";
            setearFechas();
            div.removeChild(btnEditar);
            div.appendChild(btnAgregar);
        }).catch(function (error) {
            console.log("no se actualizó correctamente", error);
            console.error("Error adding document: ", error);
            let nombreUI = document.querySelector("#nombreTxt").value;
            modalTittle.innerHTML = 'Operacion Con error';
            modalBody.innerHTML = `no se ha actualizado la fase "${nombreUI}" `;
            $('#modalFase').modal('show');
            document.querySelector("#nombreTxt").value = "";
            setearFechas();
            div.removeChild(btnEditar);
            div.appendChild(btnAgregar);
        })

    })


}


/**
 * @Description     Propiedad que realiza la accion de Borrar una nueva actividad,  
                      * esto elimina los datos ingresados de un cronograma y de la base de datos.                
 * @constructor     function eliminar(id),
 * @version        0.5                     
 * @author         Robertt Stevenson         
 * @copyright     Gestru     
 * @date 2020-06-22
 */

function eliminar(id) {
    db.collection("cronogramas").doc(id).delete().then(function () {
        console.log("Documento borrado Correctamente");
        const nombreUI = document.querySelector("#nombreTxt").value;
        modalTittle.innerHTML = 'Operacion Exitosa';
        modalBody.innerHTML = `Se ha borrado la fase  correctamente`;
        $('#modalFase').modal('show');

    }).catch(function (error) {
        console.error("Error elimiando el objeto :", error);
        const nombreUI = document.querySelector("#nombreTxt").value;
        modalTittle.innerHTML = 'Operacion Con error';
        modalBody.innerHTML = `no se ha eliminado la fase, ${error} `;
        $('#modalFase').modal('show');
    });
}
