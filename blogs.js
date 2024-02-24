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
import { getFirestore, collection, doc, setDoc , getDocs, getDocFromCache,getDoc, where} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";






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

let current = window.location.href.split('=').pop()
console.log(current);
let a= current.split("%20")
let b=a.join(' ');
let name;
let textarea;
let logout = document.getElementById('logout')
let write = document.getElementById("Write")


write && write.addEventListener('click', () => {
  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if (user) {
      
        window.location.href = "createBlog.html"
        console.log(user);
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




onAuthStateChanged(auth, (user) => {
  if (user) {
    get_data()
    do {
      get_cmnt()
    }
    while (false);
    name = user.email.split('@').shift()
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});


const get_data = async () => {

const docRef = doc(db, "blog", `${b}`);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  create(docSnap.data().title,docSnap.data().description,docSnap.data().date,docSnap.data().author_name)
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
};


const create =(title,description,datee,authorr)=>{
  let parent = document.createElement('div')
  parent.classList.add('h-full', 'w-10/12', 'm-auto', 't-3')

  let child1 = document.createElement('div')
  let heading = document.createElement('h1')
  heading.innerText = title 
  child1.classList.add('font-bold', 'sm:h-8', 'text-2xl', 'md:h-10' ,'md:text-3xl' ,'lg:h-12', 'lg:text-4xl')
  child1.appendChild(heading)


  let child2 = document.createElement('div')
  let paragraph = document.createElement('p')
  paragraph.innerText = description 
  child2.classList.add('text-lg', 'mt-2')
  child2.appendChild(paragraph)


  let child3 = document.createElement('div')
  let author = document.createElement('p')
  author.innerText = authorr
  let date = document.createElement('p')
  date.innerText = datee 
  child3.classList.add('flex', 'justify-around', 'font-bold', 'mt-4', 'text-xs', 'sm:text-xl')
  child3.appendChild(author)
  child3.appendChild(date)
  
  let child4 = document.createElement('div')
  textarea= document.createElement("TEXTAREA")
  textarea.cols="70"
  textarea.rows="10"
  textarea.placeholder=" Your Thoughts...."
  textarea.classList.add('w-12/12', 'relative' ,'rounded-md', 'sm:left-4', 'lg:left-12','w-11/12')
  child4.classList.add('mt-6')
  child4.appendChild(textarea)


  let child5 = document.createElement('div')
  let btn = document.createElement('p')
  btn.innerText=" Submit "
  btn.classList.add('btn', 'relative' ,'text-center', 'sm:left-4',  'lg:left-12')
  child5.appendChild(btn)
      btn && btn.addEventListener('click',async()=>{
        await set_cmnt()
      
        textarea.value=""
        window.location.reload();

  });



  parent.appendChild(child1)
  parent.appendChild(child2)
  parent.appendChild(child3)
  parent.appendChild(child4)
  parent.appendChild(child5)

  document.body.appendChild(parent)


  

}

const set_cmnt=async()=>{
  await setDoc(doc(db, "comments", `${textarea.value}`), {
    comment:textarea.value,
    author_name:name
  });
    
}

const get_cmnt=async()=>{
  const querySnapshot = await getDocs(collection(db, "comments"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  create_cmnts(doc.data().comment,doc.data().author_name)
});
}







const create_cmnts=(comment,a_name)=>{
  let parent = document.createElement('div')
  parent.classList.add('h-full', 'w-10/12', 'm-auto', 't-3')

let child6=document.createElement('div')
child6.classList.add('avatar','flex' ,'mt-8')

let child6_1=document.createElement('div')
let img_tag=document.createElement('img')
img_tag.src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
child6_1.classList.add("w-10", "h-10", 'rounded-full' ,'ring','ring-primary' ,'ring-offset-base-100' ,'ring-offset-2')
child6_1.appendChild(img_tag)

let child6_2=document.createElement('div')
let auth_name=document.createElement('h1')
auth_name.innerText=a_name
child6_2.classList.add('ml-6','font-bold')
child6_2.appendChild(auth_name)

let child7=document.createElement('div')
let comnt =document.createElement('p')
comnt.innerText=comment
child7.classList.add("mt-4", 'ml-11')
child7.appendChild(comnt)

child6.appendChild(child6_1)
child6.appendChild(child6_2)

parent.appendChild(child6)
parent.appendChild(child7)

document.body.appendChild(parent)





}

