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


const table = document.querySelector("#tableUsuarios");

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
 * @Description     Propiedad que realiza la accion de listar los usuarios en una tabla, 
 *                     * estos datos de los usuarios son traidos desde la base de datos
 *                          * esto incluye la validacion de este mismo.
 * @version        0.5                     
 * @author        Jannier Flores         
 * @copyright     Gestru     
 * @date 2020-06-22
 */
/* Listar Usuarios */
db.collection("usuarios").onSnapshot((querySnapshot) => {
    table.innerHTML = '';
    querySnapshot.forEach((doc) => {
        table.innerHTML += `
        <tr>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().rut}</td>
        <td>${doc.data().correo}</td>
        <td>${doc.data().contacto}</td>
        <td>${doc.data().tipo}</td>
        `
    })
})