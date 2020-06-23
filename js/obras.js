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
let modalTittle = document.querySelector("#modalTittle")
let nombreInput = document.querySelector('#nombreTxt');
let inicioInput = document.querySelector('#inicioTxt');
let finInput = document.querySelector('#finTxt');

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
btnAgregar.setAttribute('id', 'agregarObraBtn');
btnAgregar.addEventListener('click', agregarObra);
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
    let alertdiv = document.querySelector("#alertObra");
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
 * @Description     Propiedad que realiza la accion de agregar una nueva obra,  
                      * esto inicializa los campos observado declarandolos como constanes
                        * en base a los inputs del HTML y guarda los datos ingresados en la base de datos               
                           * esto incluye la validacion de este mismo.
 * @constructor     function agregarObra(),
 * @returns         {boolean} retorna un false si la funcion validarFormulario() no se cumple 
                         *despues de que la validacion sea correcta agrega los datos a la base de datos
 * @version        0.5                     
 * @author         Robertt Stevenson         
 * @copyright     Gestru     
 * @date 2020-06-22
 */
function agregarObra() {

    const nombre = document.querySelector('#nombreTxt').value.trim();
    const inicio = document.querySelector('#inicioTxt').value;
    const fin = document.querySelector('#finTxt').value;

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

    db.collection("obras").add({
        nombre: nombre,
        fechaInicio: inicio,
        fechaTermmino: fin,
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            let nombreUI = document.querySelector("#nombreTxt").value;
            modalTittle.innerHTML = 'Operacion Exitosa';
            modalBody.innerHTML = `Se ha agregado la obra "${nombreUI}" correctamente`;
            nombreInput.setAttribute("class", "form-control");
            inicioInput.setAttribute("class", "form-control");
            finInput.setAttribute("class", "form-control");
            $('#modalObra ').modal('show');
            document.querySelector('#nombreTxt').value = '';
            setearFechas();

        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
            const nombreUI = document.querySelector("#nombreTxt").value;
            modalTittle.innerHTML = 'Error en la operación';
            modalBody.innerHTML = `No se ha podido agregar la obra`;
            $('#modalObra ').modal('show');
            setearFechas();
        });
}
/**
 * @Description     Propiedad que realiza la accion de mostrar las obras agregados,  
                      * con el querySelecto nos devolvera los primeros elementos
                            *    que fueron agregados a la tabla, estos datos son traidos desde la base de datos          
                             * esto incluye apartados para eliminar el cronograma y editarlo
 * @version        0.5                     
 * @author         Jannier Flores         
 * @copyright     Gestru     
 * @date 2020-06-22
 */
//Mostrar Obras
const table = document.querySelector('#tableObras');
db.collection("obras").onSnapshot((querySnapshot) => {
    table.innerHTML = ``;
    querySnapshot.forEach((doc) => {
        table.innerHTML += `
        <tr>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().fechaInicio}</td>
        <td>${doc.data().fechaTermmino}</td>
        <td><button class="btn btn-danger" onclick=eliminar('${doc.id}')>Eliminar</button></td>
        <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().fechaInicio}','${doc.data().fechaTermmino}')" > Editar</button></td>
        </tr>`

    })

});

/**
 * @Description     Propiedad que realiza la accion de modificar un cronograma,  
                      * con el querySelecto nos devolvera todos los elementos ingresados a la obra, 
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
function editar(id, nombre, fechaInicio, fechaTermmino) {
    console.log("Entrando a funcion editar")
    document.querySelector("#nombreTxt").value = nombre;
    document.querySelector("#inicioTxt").value = fechaInicio;
    document.querySelector("#finTxt").value = fechaTermmino;
    boton = document.querySelector("#agregarObraBtn");
    boton.innerHTML = 'Guardar';
    console.log(boton.value);
    boton.value = 'editar';
    if (boton.value == 'editar') {
        boton.value = 'agregar';
        boton.onclick = function () {
            console.log("Entrando a funcion update");
            let obraEdit = db.collection("obras").doc(id);
            let nombre = document.querySelector('#nombreTxt').value;
            if (nombre.length == 0) {
                alert('Debe ingresar un nombre a la obra');
                return false;
            }
            let inicio = document.querySelector('#inicioTxt').value;
            if (inicio == "") {
                alert("Debe ingresar un inicio");
                return false;
            }
            let fin = document.querySelector('#finTxt').value;

            if (fin == "") {
                alert("Debe ingresar un fin");
                return false;
            };

            obraEdit.update({
                nombre: nombre,
                fechaInicio: inicio,
                fechaTermmino: fin
            }).then(function () {
                console.log("Documento actualizado");
                boton.innerHTML = 'Agregar';
                const nombreUI = document.querySelector("#nombreTxt").value;
                modalTittle.innerHTML = 'Operacion Exitosa';
                modalBody.innerHTML = `Se ha actualizado la obra a "${nombreUI}" correctamente`;
                $('#modalObra').modal('show');
                document.querySelector("#nombreTxt").value = "";
                document.querySelector("#inicioTxt").value = "";
                document.querySelector("#finTxt").value = "";
            }).catch(function (error) {
                const nombreUI = document.querySelector("#nombreTxt").value;
                modalTittle.innerHTML = 'Error en la operación';
                modalBody.innerHTML = `No se ha podido agregar la obra "${nombreUI}" correctamente <br> ${error}`;
                $('#modalObra ').modal('show');
                console.log("no se actualizó correctamente", error);

            })


            console.log("Nuevamente Guardar (153)", boton);
            return true;
        }
    } else {
        boton.onclick = agregarObra();
    }


    /* Fin Editar() */
    console.log("Saliendo de editar mayor");
}




/*  boton.onclick = */


/**
 * @Description     Propiedad que realiza la accion de Borrar una nueva actividad,  
                      * esto elimina los datos ingresados de un cronograma y de la misma base de datos.                
 * @constructor     function eliminar(id),
 * @version        0.5                     
 * @author         Robertt Stevenson         
 * @copyright     Gestru     
 * @date 2020-06-22
 */
function eliminar(id) {
    db.collection("obras").doc(id).delete().then(function () {
        modalTittle.innerHTML = 'Operacion Exitosa';
        modalBody.innerHTML = `Se ha Eliminado la la obra correctamente`;
        $('#modalObra ').modal('show');
        console.log("Documento borrado Correctamente(actividad)");
    }).catch(function (error) {
        console.error("Error elimiando el objeto :", error);
        modalTittle.innerHTML = 'Error en la operación';
        modalBody.innerHTML = `No se ha Eliminado la la obra, ${error} `;
        $('#modalObra ').modal('show');
    });
}


