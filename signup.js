import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
   
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";






const firebaseConfig = {
    apiKey: "AIzaSyCSrlezpwOoHGsgt6C01hBiuO2QpATVH9w",
    authDomain: "blog-app-f7dfe.firebaseapp.com",
    projectId: "blog-app-f7dfe",
    storageBucket: "blog-app-f7dfe.appspot.com",
    messagingSenderId: "187026194406",
    appId: "1:187026194406:web:d3fd8eddddb5123d7c2027"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

let email1 = document.getElementById('email1')
let password1 = document.getElementById('password1')
let tologin = document.getElementById('tologin')
let signupp = document.getElementById('signup')
// let google = document.getElementById('Google')
let err = document.getElementById('for-error')


const signp = () => {
    console.log(email1.value,password1.value);
    createUserWithEmailAndPassword(auth, email1.value, password1.value)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            window.location.href='login.html'
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            err.innerHTML = errorMessage
            setTimeout(() => {
                err.innerHTML=""
            }, 2000);
        });

}

signupp.addEventListener('click',()=>{
    console.log('hi');
    signp()
})

tologin.addEventListener('click',()=>{
    window.location.href="login.html"

})
