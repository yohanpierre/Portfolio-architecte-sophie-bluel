document.body.onload = get;
//Création de la classe contenant les information des post
class Works{
  constructor(id,title,imageUrl,categoryId,userId,category){
    this.id = id
    this.title = title
    this.imageUrl = imageUrl
    this.categoryId = categoryId
    this.userId = userId
    this.category = category
  }
 //Méthode d' ajout des pots au DOM
  addElement () {
    let fig =`
				<img crossorigin="anonymous" src="${this.imageUrl}" alt="">
				<figcaption>${this.title}</figcaption>
        `
        const newDiv = document.createElement("figure");
        newDiv.innerHTML = fig
        const currentDiv = document.getElementsByClassName("gallery")[0];
        currentDiv.appendChild(newDiv)
        newDiv.classList.add(this.categoryId)
        newDiv.setAttribute('id',this.id)
  }
  //Ajout des image pour la popup
  addContent () {
    let fig =`
				<img class="xs" crossorigin="anonymous" src="${this.imageUrl}" alt="">
				<figcaption class="xs">éditer</figcaption>
        ` 
        const newDiv = document.createElement("figure");
        newDiv.innerHTML = fig
        const currentDiv = document.getElementById('content')
        currentDiv.appendChild(newDiv)
        newDiv.classList.add(this.category.name)
        newDiv.classList.add("active")
        newDiv.setAttribute('id',`a${this.id}`)
  }
}
//Conversion d'une cookie en texte
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
//Recuperation des identifiants si l'utilisateur c'est déja inscrit
let user = {
  email:   getCookie('email'),
  password: getCookie('password'),
};
const users = JSON.stringify(user)
//Connexion et mise à jour du token
fetch('http://localhost:5678/api/users/login', {
  method: "POST",
  headers: {
      "Content-Type": "application/json"
  },
  body: users
})
.then((response) => response.json())
.then((result) => {
console.log("Connected:", result);
document.cookie =` token=${result.token}; SameSite=None; Secure`;
document.cookie =` userId=${result.userId}; SameSite=None; Secure`;
if (result.token!=null) {
  document.getElementById('pop').style.display = 'flex'
}
})
.catch((error) => {
console.error("Error:", error);
});
const token= getCookie('token')
const userId= getCookie('userId')

 //Requète http GET vers  l'API works  et appel de la méthode  addElement
async function get() {
  const response = await fetch('http://localhost:5678/api/works')
  const posts = await response.json()
  for (const post of posts) {
   let work = new Works(post.id,post.title,post.imageUrl,post.categoryId,post.userId,post.category)
   if (work.category.name =="Hotels & restaurants"){
    work.category.name = "Hotels"
  }
   work.addElement()
   work.addContent()
  }
}
const all =  document.getElementById('all')
all.addEventListener("click", (e) => {
  for (const p of document.getElementsByClassName('1')) {
    document.getElementById(p.id).style.display = "block";
  }
  for (const p of document.getElementsByClassName('3')) {
    document.getElementById(p.id).style.display = "block";
  }
  for (const p of document.getElementsByClassName('2')) {
    document.getElementById(p.id).style.display = "block";
  }
})
function o() {
  for (const p of document.getElementsByClassName('1')) {
    document.getElementById(p.id).style.display = "block";
  }
  for (const p of document.getElementsByClassName('3')) {
    document.getElementById(p.id).style.display = "none";
  }
  for (const p of document.getElementsByClassName('2')) {
    document.getElementById(p.id).style.display = "none";
  }
}
function a() {
  for (const p of document.getElementsByClassName('1')) {
    document.getElementById(p.id).style.display = "none";
  }
  for (const p of document.getElementsByClassName('3')) {
    document.getElementById(p.id).style.display = "none";
  }
  for (const p of document.getElementsByClassName('2')) {
    document.getElementById(p.id).style.display = "block";
  }
}
function h() {
  for (const p of document.getElementsByClassName('1')) {
    document.getElementById(p.id).style.display = "none";
  }
  for (const p of document.getElementsByClassName('3')) {
    document.getElementById(p.id).style.display = "block";
  }
  for (const p of document.getElementsByClassName('2')) {
    document.getElementById(p.id).style.display = "none";
  }
}

//Lancement de la popup lors du clic sur moddifier
const pop =  document.getElementById('pop')
edit.addEventListener("click", (e) => {
  const popup = document.getElementById('popup')
  popup.style.display = 'flex'
  console.log('popup est active');
})

// Fermeture de la popup
const close =  document.getElementById('close')
close.addEventListener("click", (e) => {
  const popup = document.getElementById('popup')
  popup.style.display = 'none'
  console.log('close');
})
//Actualisation de la popup pour l'ajout de post

function create() {
  console.log('créé')
  let t = document.getElementById('popup-title')
  let g= document.getElementById('green')
  let r = document.getElementById('red')
  let gr = document.getElementById('grey')
  let c = document.getElementById('content')
  let n = document.getElementById('nform')
  t.innerText = 'Ajout photo'
  g.style.display = 'none'
  r.style.display = 'none'
  gr.style.display = 'block'
  c.style.display = 'none'
  n.style.display = 'flex'
}
//Le bouton ajouter photo déclenche l'input file
const fileSelect = document.getElementById("fileSelect")
const fileElem =  document.getElementsByTagName('input')[0]
fileSelect.addEventListener("click", (e) => {
  if (fileElem) {
    fileElem.click();
  }
}, false);

//Supression du post par l'id choisi par l'admin
const remove =  document.getElementById('red')
remove.addEventListener("click", (e) => {
  const p = prompt("Entrez l'id du post à supprimez")
  let url = `http://localhost:5678/api/works/${p}`
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `${token}`}
  })
  .then((response) => response)
  .then((result) => {
    console.log("Deleted:", result)
    document.getElementById(p).remove()
    document.getElementById(`a${p}`).remove()
 })
})


// Fonction asynchrone qui poste l'image quand les informations sont entré
 async function validate() {
  const nform =  document.getElementsByTagName('form')[0]
  const file =  document.getElementsByTagName('input')[0].files[0]
 const formData = await new FormData(nform)
//Renvoie le categoryId
  function getid(category) {
    if (category=='Objets') {
      return 1
    } if (category=='Appartements') {
      return 2
    } else{
      return 3
    }
  }
  await fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      'Authorization': token
    },
    body: JSON.stringify({
      title: formData.get('titre'),
      category: getid(formData.get('category')),
      imageUrl: file.name,
      user: userId
    })
  })
  .then((response) => response.json())
.then((result) => {
  console.log("Success:", result);
})
.catch((error) => {
  console.error("Error:", error);
});
}