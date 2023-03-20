import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getStorage , ref, getDownloadURL  , uploadString  } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";
const firebaseConfig = {
  apiKey: "AIzaSyBcD5NFKeS1Fb3c2A1pPszWOUDq2v0Adss",
  authDomain: "portfolio-76f40.firebaseapp.com",
  projectId: "portfolio-76f40",
  storageBucket: "portfolio-76f40.appspot.com",
  messagingSenderId: "589990240604",
  appId: "1:589990240604:web:4120a63917c14fae3f6199"
};
  const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

//Previsualisation de l'image choisi
  document.getElementsByTagName('input')[0].addEventListener('change', () => {
  const drop = document.getElementById('drop')
  drop.style.display = 'none'
  const preview = document.getElementById('obj');
  preview.style.display = 'block'
  const file =  document.getElementsByTagName('input')[0].files[0]
  const reader = new FileReader();
  //Lecture du fichier et envoie à la database
  reader.addEventListener("load", () => {
   preview.src = reader.result
   const storageRef = ref(storage, `images/${file.name}`);
  uploadString(storageRef,  reader.result, 'data_url').then((snapshot) => {
     console.log('Fichier envoyé!');
   });
  }, false);

  if (file) {
    reader.readAsDataURL(file)
  }
  })