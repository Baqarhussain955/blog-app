import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, getMetadata  } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";
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
let loginn = document.getElementById('loginn')
let google = document.getElementById('Google')
let err = document.getElementById('for-error')
let logout = document.getElementById('logout')
let write = document.getElementById("Write")

let description = document.getElementById('description')
let title = document.getElementById('input_title')
let sel_cat = document.getElementById('select_cat')
const uploadImgBtn = document.getElementById("uploadImgBtn")
let fileInput = document.getElementById("fileInput")
let save=document.getElementById('save_btn')


// let heading= document.getElementById("heading")
// let para= document.getElementById("para")
// let author= document.getElementById("author")
// let date= document.getElementById("date")


let currentpath = window.location.pathname.split('/').pop()

onAuthStateChanged(auth, (user) => {
  console.log(user);
  if (user) {
    loginn.style.display="none"
    logout.style.display="block"
    const uid = user.uid;
    console.log(user);
  } else {

    }
  })


  loginn.addEventListener('click',()=>{window.location.href="login.html"})



write && write.addEventListener('click', () => {
  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if (user) {
      if (currentpath != 'createBlog.html') {
        window.location.href = "createBlog.html"
        console.log(user);
      }
      const uid = user.uid;
      console.log(user);
    } else {
      if (currentpath != 'login.html' && currentpath !== "") {
        window.location.href = "login.html"
        console.log(user);
      }
    }
  });
})



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

const getImg =async(title)=>{
  let starsRef= ref(storage, `images/${title}`);
  return await getDownloadURL(starsRef)
}


const get_data = async () => {
  const querySnapshot = await getDocs(collection(db, "blog"));
  querySnapshot.forEach(async (doc) => {
    // console.log(`${doc.id} => ${doc.data().id}`);


    let imggg =await getImg(doc.data().title)
    console.log(imggg);
    create(
      doc.data().title,
      doc.data().description,
      doc.data().author_name,
      doc.data().date,
      imggg
    );
  });
};

get_data();

const create = (title, description, authorr, datee,imggg) => {
 
  let spann = document.createElement('span')
  spann.innerText = " .....ReadMore"
  spann.style.color='white'
  // spann.style.textDecoration="underline"

  let child1=document.createElement("div")
  const heading = document.createElement("h1");
  heading.innerText = title;
  child1.classList.add('font-bold','sm:h-6', 'sm:w-full','md:h-8', 'md:w-full','lg:h-14', 'lg:w-full','sm:text-sm', 'sm:font-bold','md:text-lg', 'md:font-bold','lg:text-xl', 'lg:font-bold')
  child1.appendChild(heading);


  let child2=document.createElement("div")
  const para = document.createElement("p");
  para.innerText = description.slice(0, 200)
  para.appendChild(spann);
  child2.classList.add('sm:h-24', 'md:h-28', 'lg:h-40', 'sm:text-sm',  'md:text-md',  'lg:text-lg')
  child2.appendChild(para);



  let child3=document.createElement("div")
  const author = document.createElement("p");
  const date = document.createElement("p");
  author.innerText = authorr;
  date.innerText = datee;
  child3.classList.add('flex', 'justify-around',
  'sm:h-4', 'sm:text-xs', 'sm:font-bold',
  'md:h-6', 'md:text-md', 'md:font-bold',
  'lg:h-8', 'lg:text-lg', 'lg:font-bold')
  child3.appendChild(author);
  child3.appendChild(date);
 
  let childdiv1=document.createElement("div")
  childdiv1.appendChild(child1);
  childdiv1.appendChild(child2);
  childdiv1.appendChild(child3);
  childdiv1.classList.add('pl-2','sm:h-full', 'sm:w-9/12','md:h-full', 'md:w-9/12','lg:h-full', 'lg:w-9/12')

  let childdiv2=document.createElement("div")
  const image = document.createElement("img");
  image.src =`${imggg}`;
  image.alt="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
  image.classList.add("pr-2", "m-auto", "lg:h-60" ,"sm:h-32", "md:h-40")
  childdiv2.classList.add('h-full', 'w-3/12')
  childdiv2.appendChild(image);

  
 

  let parentdiv=document.createElement("div")
  parentdiv.classList.add( 'border-2',
   'rounded-lg', 
   'border-amber-300',
   'mt-7',
   'w-9/12',
   'sm:h-44',
   "sm:w-9/12",
   'md:h-52',
   'lg:h-72',
   'sm:text-sm',
   'md:text-md',
   'lg:text-lg',
   'flex', 
   'pt-10',
   'm-auto')
 
  parentdiv.appendChild(childdiv1);
  parentdiv.appendChild(childdiv2);

  document.body.appendChild(parentdiv);

  child2.addEventListener('click',()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        window.location.href=`blogs.html?desc=${title}`
        // ...
      } else {
        // User is signed out
        // ...
        window.location.href=`login.html`
      }
    });
    

  })
};
















































































































// uploadImgBtn &&
//   uploadImgBtn.addEventListener("click", uploadImage);


// if (loginn != null) {
  //   loginn.addEventListener('click', () => {
    //     logIn()
    
    //   })
    // }
    // else {
//   console.log('moye moye');
// }

// save && save.addEventListener('click', ()=>{
  //         createBlog()
  // })
  
  // if (google != null) {
    //   google.addEventListener('click', () => {
      //     googleLog()
      //   })
      // }
      // else {
        //   console.log('moye moye');
        // }
        
        
        // const logIn = () => {
        
        //   signInWithEmailAndPassword(auth, email.value, password.value)
        //     .then((userCredential) => {
        //       // Signed in 
        //       const user = userCredential.user;
        //       window.location.href = "blogs.html"
        //       console.log(user);
        //       // ...
        //     })
        //     .catch((error) => {
        //       const errorCode = error.code;
        //       const errorMessage = error.message;
        //       err.innerHTML = errorMessage
        //       setTimeout(() => {
          //         err.innerHTML = ""
        //       }, 2000);
        //     });
        
        
        // }
        
        // const googleLog = () => {
        //   signInWithPopup(auth, provider)
        //     .then((result) => {
          //       // This gives you a Google Access Token. You can use it to access the Google API.
          //       const credential = GoogleAuthProvider.credentialFromResult(result);
          //       const token = credential.accessToken;
        //       // The signed-in user info.
        //       const user = result.user;
        //       window.location.href = "blogs.html"
        //       // IdP data available using getAdditionalUserInfo(result)
        //       // ...
        //     }).catch((error) => {
          //       // Handle Errors here.
          //       const errorCode = error.code;
          //       const errorMessage = error.message;
        //       // The email of the user's account used.
        //       const email = error.customData.email;
        //       // The AuthCredential type that was used.
        //       const credential = GoogleAuthProvider.credentialFromError(error);
        //       // ...
        //     });
        // }
        
        // const onload=()=>{
        //     onAuthStateChanged(auth, (user) => {
        //         if (user) {
        //           if(currentpath!='blogs.html'){
        //             window.location.href="blogs.html"
        //           }
        //           const uid = user.uid;
        //           console.log(user);
        //         } else {
        //           if(currentpath!='index.html'&& currentpath !==""){
        //             window.location.href="index.html"
        //           }
        //         }
        //       });
        // }
        // const createBlog = async () => {
        //   let select_type = document.querySelector("input[type='radio'][name='blog']:checked").value;;
        //   let select_status = document.querySelector("input[type='radio'][name='status']:checked").value;;
        //   console.log(title.value);
        //   console.log(description.value);
        //   console.log(sel_cat.value);
        //   console.log(select_status);
        //   console.log(select_type);
        //   if (title.value != "" && sel_cat.value != "" &&  select_status != "" && select_type != "" && description.value != "") {
        //     let uploadDate = new Date();
        //     if (select_type == "blog") {
        //       await setDoc(doc(db, "blog",`${title.value}`), {
        //           title:title.value,
        //           description:description.value,
        //           category:sel_cat.value,
        //           author_name:"Baqar",
        //           date:uploadDate
        //       });
        
        //     }
        //     else if (select_type == "question") {
        //       await setDoc(doc(db, "Question",`${title.value}`), {
        //           title:title.value,
        //           description:description.value,
        //           category:sel_cat.value,
        //           author_name:"Baqar",
        //           date:uploadDate
        //       });
        
        //     }
        //   }
        // }
        // const uploadImage = () => {
        //   const fileValue = fileInput.files[0]
        
        //   console.log(fileValue, "fileValue")
        
        
        //   const metadata = {
        //     contentType: fileValue.type,
        //     name: fileValue.name,
        //     size: fileValue.size
        //   };
        
        //   const storageRef = ref(storage, `images/${fileValue.name}_${Date.now()}`);
        //   const uploadTask = uploadBytesResumable(storageRef, fileValue, metadata);
        
        //   uploadTask.on('state_changed',
        //     (snapshot) => {
        //       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //       console.log('Upload is ' + progress + '% done');
        //       switch (snapshot.state) {
        //         case 'paused':
        //           console.log('Upload is paused');
        //           break;
        //         case 'running':
        //           console.log('Upload is running');
        //           break;
        //       }
        //     },
        //     (error) => {
        //       // A full list of error codes is available at
        //       // https://firebase.google.com/docs/storage/web/handle-errors
        //       switch (error.code) {
        //         case 'storage/unauthorized':
        //           // User doesn't have permission to access the object
        //           break;
        //         case 'storage/canceled':
        //           // User canceled the upload
        //           break;
        
        //         // ...
        
        //         case 'storage/unknown':
        //           // Unknown error occurred, inspect error.serverResponse
        //           break;
        //       }
        //     },
        //     () => {
        //       // Upload completed successfully, now we can get the download URL
        //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        
        //         console.log('File available at', downloadURL);
        //       });
        //     }
        //   );
        // }