

/**
 * @Description    Propiedad que realiza el inicio de sesion,
                    * en donde debes ingresar un correo y contraseña para ingresar
 * @version        0.5  
 * @constructor     function iniciarSesion()                   
 * @author         Robertt Stevenon         
 * @copyright     Gestru  
 * @date 2020-06-22   
 *
        */

function iniciarSesion() {
    const correo = document.querySelector('#correoTxt').value;
    const contrasena = document.querySelector('#contrasenaTxt').value;
    auth.signInWithEmailAndPassword(correo, contrasena)
        .then(userCredential => {
            alert("Ingreso Correcto");
          location.href = './obra.html';
        }).catch(function (error) {
            console.error("Error adding document: ", error);
            alert("Credenciales no registradas, Verifique Datos")
        });

}

/**
 * @Description Cerrar sesion mediante el servicio de autenticacion de firebase
 * @version        0.5                     
 * @author         Robertt Stevenson         
 * @copyright     Gestru    
 * @date 2020-06-22 
 *
        */
function cerrarSesion() {
    auth.signOut().then(() => {
        alert("Sesión Cerrada");
    })
}

