const firebaseConfig = {
    apiKey: "AIzaSyD7K8sNo_tvMWipOgtY7QUxNzAz_cFaWFo",
    authDomain: "gestru-5943e.firebaseapp.com",
    databaseURL: "https://gestru-5943e.firebaseio.com",
    projectId: "gestru-5943e",
    storageBucket: "gestru-5943e.appspot.com",
    messagingSenderId: "930084029473",
    appId: "1:930084029473:web:7dfb090e6b93ca100d4f60"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

function cargarSelectCronograma() {

    const selectCronograma = document.querySelector("#selectCronograma");
    db.collection("cronogramas").onSnapshot((querySnapshot) => {
        selectCronograma.innerHTML = ``;
        querySnapshot.forEach((doc) => {
            selectCronograma.innerHTML += `
            <option>${doc.data().nombre}</option>
            `
        })

    })
}
function cargarSelectTrabajadores() {
    const selectTrabajador = document.querySelector("#selectTrabajador");
    db.collection("usuarios").onSnapshot((querySnapshot) => {
        selectTrabajador.innerHTML = ``;
        querySnapshot.forEach((doc) => {
            selectTrabajador.innerHTML += `
            <option>${doc.data().nombre}</option>
            `
        })

    })
}