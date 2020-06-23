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
 * @Description     Propiedad que realiza la accion de registrar un nuevo usuario, 
                    * inicializando los campos que se muestran declarandolos con la constante en base a los inputs del HTML ,               
                          * esto incluye la validacion de este mismo.
 * @constructor     function registrarUsuario(),
 * @returns         {boolean} retorna un false en caso de que no se cumplan las condiciones
                      *para que no se pueda continuar si no se cumple la condicion
 * @version        0.5                     
 * @author         Jannier Flores         
 * @copyright     Gestru     
 * @date 2020-06-22
 * 
 */
function registrarUsuario() {


    //NOMBRE
    const nombre = document.querySelector("#nombreTxt").value.trim();
    if (document.querySelector("#nombreTxt").value.trim() == "") {
        alert("debe ingresar Nombre");
        return false;
    }


    /**
     * @Description     Validacion del rut ingresado en el formulario,
                            *   esto inicializa las constantes en base al input del HTML            
                              * esto incluye la validacion de este mismo.
     * @returns         {boolean} retorna un false en caso de que no se cumplan las condiciones
     * @version        0.5                     
     * @author         Robertt Stevenson        
     * @copyright     Gestru     
     * @date 2020-06-22
     * 
     */

    //RUT
    let rut = document.querySelector("#rutTxt").value.trim();
    let valor = rut.replace('.', '');
    // Despejar Guión
    valor = valor.replace('-', '');
    // Aislar Cuerpo y Dígito Verificador
    cuerpo = valor.slice(0, -1);
    dv = valor.slice(-1).toUpperCase();
    // Formatear RUN
    rut = cuerpo + '-' + dv
    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if (cuerpo.length < 7) {

        alert("Rut incompleto");
        return false;
    }
    // Calcular Dígito Verificador
    suma = 0;
    multiplo = 2;
    // Para cada dígito del Cuerpo
    for (i = 1; i <= cuerpo.length; i++) {
        // Obtener su Producto con el Múltiplo Correspondiente
        index = multiplo * valor.charAt(cuerpo.length - i);
        // Sumar al Contador General
        suma = suma + index;
        // Consolidar Múltiplo dentro del rango [2,7]
        if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
    }
    // Calcular Dígito Verificador en base al Módulo 11
    dvEsperado = 11 - (suma % 11);
    // Casos Especiales (0 y K)
    dv = (dv == 'K') ? 10 : dv;
    dv = (dv == 0) ? 11 : dv;
    // Validar que el Cuerpo coincide con su Dígito Verificador
    if (dvEsperado != dv) { alert("Rut invalido"); return false; }
    // Si todo sale bien, eliminar errores (decretar que es válido)
    const rutValidado = rut;

    /**
 * @Description     Inicializacion y declaracion la constante correo en base al input del HTML
 * @returns         {boolean} retorna un false en caso de que no se cumplan las condiciones
 * @version        0.5                     
 * @author         Jannier Flores        
 * @copyright     Gestru     
 * @date 2020-06-22
 * 
 */
    const correo = document.querySelector("#correoTxt").value.trim();
    expresion = /\w+@\w+\.+[a-z]/;
    if (!expresion.test(document.querySelector("#correoTxt").value.trim())) {
        alert("Debe ingresar un correo válido");
        return false;
    }

    /**
     * @Description     Inicializacion y declaracion la constante contraseña en base al input del HTML
     * @returns         {boolean} retorna un false en caso de que no se cumplan las condiciones
     * @version        0.5                     
     * @author         Jannier Flores        
     * @copyright     Gestru     
     * @date 2020-06-22
     * 
     */
    //CONTRASEÑA
    const contrasena = document.querySelector("#contrasenaTxt").value;
    if (document.querySelector('#contrasenaTxt').value.length == 0) {
        alert("Debe ingresar una de contraseña")
        return false;
    } else {
        if (document.querySelector("#contrasenaTxt").value.length < 4) {
            alert("Debe ingresar  una contraseña con 4 caracteres minimos")
            return false;
        }
    }

    /**
  * @Description     Inicializacion y declaracion la constante contraseña en base al input del HTML
  * @returns         {boolean} retorna un false en caso de que no se cumplan las condiciones
  * @version        0.5                     
  * @author         Jannier Flores        
  * @copyright     Gestru     
  * @date 2020-06-22
  * 
  */
    const contacto = document.querySelector("#contactoTxt").value;


    if (contacto.length > 8) {
        alert("Maximo 8 numeros")
        return false;
    }
    else if (document.querySelector('#contactoTxt').value.length < 8) {
        alert("Debe ingresar un numero de contacto válido de 8 digitos");
        return false;
    }

    checkBox = document.querySelector("#checkTerminos").checked;
    if (!checkBox) {
        alert("Acepte los terminos y condiciones");
        return false;
    }
    /**
 * @Description     Inicializacion y declaracion la constante tipo en base al input del HTML
                        * en donde se debera elegir el tipo de usuario   
 * @returns         {boolean} retorna un false en caso de que no se cumplan las condiciones
 * @version        0.5                     
 * @author         Jannier Flores        
 * @copyright     Gestru     
 * @date 2020-06-22
 * 
 */
    const tipo = document.querySelector("#tipoSelect").value;
    if (tipo == "seleccione") {
        alert("Debe seleccionar un tipo de usuario");
        return false;
    } else {
        if (tipo != "cliente") {
            db.collection("usuarios").add({
                nombre: nombre,
                rut: rutValidado,
                correo: correo,
                contacto: contacto,
                tipo: tipo
            })
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    alert("Usuario Agregado Correctamente");
                    document.querySelector("#nombreTxt").value = '';
                    document.querySelector("#rutTxt").value = '';
                    document.querySelector("#correoTxt").value = '';
                    document.querySelector("#contrasenaTxt").value = '';
                    document.querySelector("#contactoTxt").value = '';
                    auth.
                        createUserWithEmailAndPassword(correo, contrasena)
                        .then(userCredential => {
                            console.log("Registro Correcto!!,  db.collection 'usuarios' add");
                        })

                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                    alert("Ocurrió un Error, Intente nuevamente")
                });
        } {
            /**
* @Description     Luego de pasar el formulario completo y cumplir todos los requisitos se añadira
                       * a la base de datos todos los datos  
* @returns         {boolean} retorna un false en caso de que no se cumplan las condiciones
* @version        0.5                     
* @author         Robertt Stevenson        
* @copyright     Gestru     
* @date 2020-06-22
* 
*/
            db.collection("usuariosClientes").add({
                nombre: nombre,
                rut: rutValidado,
                contrasena: contrasena,
                correo: correo,
                contacto: contacto,
                tipo: tipo
            })
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    alert("Usuario Agregado Correctamente");
                    document.querySelector("#nombreTxt").value = '';
                    document.querySelector("#rutTxt").value = '';
                    document.querySelector("#correoTxt").value = '';
                    document.querySelector("#contrasenaTxt").value = '';
                    document.querySelector("#contactoTxt").value = '';
                    auth.
                        createUserWithEmailAndPassword(correo, contrasena)
                        .then(userCredential => {
                            console.log("Registro Cliente Correcto!!, db.collection('usuariosClientes').add");
                        })

                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                    alert("Ocurrió un Error, Intente nuevamente")
                });
        }
    }






}