import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";
import { getFirestore, collection, doc, setDoc , getDocs} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";






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
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

let email = document.getElementById('email')
let password = document.getElementById('password')
let loginn = document.getElementById('login')
let google = document.getElementById('Google')
let err = document.getElementById('for-error')
let logout = document.getElementById('logout')
let write = document.getElementById("Write")
let tosignn = document.getElementById('tosignn')

let description = document.getElementById('description')
let title = document.getElementById('input_title')
let sel_cat = document.getElementById('select_cat')
const uploadImgBtn = document.getElementById("uploadImgBtn")
let fileInput = document.getElementById("fileInput")
let save=document.getElementById('save_btn')
const head = document.getElementById('head')


let currentpath = window.location.pathname.split('/').pop()





const logIn = () => {

    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        window.location.href = "index.html"
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        err.innerHTML = errorMessage
        setTimeout(() => {
          err.innerHTML = ""
        }, 2000);
      });
  
  
  }
  
  const googleLog = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        window.location.href = "index.html"
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }



  if (google != null) {
    google.addEventListener('click', () => {
      googleLog()
    })
  }
  else {
    console.log('moye moye');
  }

  if (loginn != null) {
    loginn.addEventListener('click', () => {
      logIn()
  
    })
  }
  else {
    console.log('moye moye');
  }
  
  tosignn.addEventListener('click',()=>{
    window.location.href="signup.html"
  })
 
  