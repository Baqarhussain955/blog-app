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
import { getFirestore, collection, doc, setDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";






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

let description = document.getElementById('description')
let title = document.getElementById('input_title')
let sel_cat = document.getElementById('select_cat')
const uploadImgBtn = document.getElementById("uploadImgBtn")
let fileInput = document.getElementById("fileInput")
let save = document.getElementById('save_btn')
const head = document.getElementById('head')
let name;

let currentpath = window.location.pathname.split('/').pop()

onAuthStateChanged(auth, (user) => {
  if (user) {
    
    name = user.email.split('@').shift()
    uploadImgBtn &&
  uploadImgBtn.addEventListener("click", uploadImage);


save && save.addEventListener('click', async() => {
  console.log("hi");
  await createBlog()
  window.location.href='index.html'
  
})

  } else {
    console.log('nhi');
  }
});



const out = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    window.location.href = "index.html"
    console.log('hi');
  }).catch((error) => {
    // An error happened.
    console.log(error);
  });
}


logout && logout.addEventListener('click', () => {

  out()
})




const createBlog = async () => {
  let select_type = document.querySelector("input[type='radio'][name='blog']:checked").value;;
  let select_status = document.querySelector("input[type='radio'][name='status']:checked").value;;
  console.log(title.value);
  console.log(description.value);
  console.log(sel_cat.value);
  console.log(select_status);
  console.log(select_type);
  console.log(fileInput.files[0]);
  if (title.value != "" && sel_cat.value != "" && select_status != "" && select_type != "" && description.value != "" && fileInput.files[0]) {
    let uploadDate = new Date().toISOString().slice(0, 10);
    if (select_type == "blog") {
      await setDoc(doc(db, "blog", `${title.value}`), {
        title: title.value,
        description: description.value,
        category: sel_cat.value,
        author_name: name,
        date: uploadDate,
        // img:fileInput.files.name
      });

    }
    else if (select_type == "question") {
      await setDoc(doc(db, "blog", `${title.value}`), {
        title: title.value,
        description: description.value,
        category: sel_cat.value,
        author_name: name,
        date: uploadDate,
        // img:fileInput.files.name
      });

    }
  }
}


const uploadImage = () => {
  const fileValue = fileInput.files[0]

  console.log(fileValue, "fileValue")


  const metadata = {
    contentType: fileValue.type,
    name: title.value,
    size: fileValue.size
  };

  const storageRef = ref(storage, `images/${title.value}`);
  const uploadTask = uploadBytesResumable(storageRef, fileValue, metadata);

  uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          uploadImgBtn.innerText=progress +"%" + " Uploaded";
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

        console.log('File available at', downloadURL);
      });
    }
  );
}



