//fonction qui facilite la recherche dans l'objet Cookie du dom
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
const login =  document.getElementById('login')
//On écoute sur le formulaire de connexion
login.addEventListener("submit",  async (e) => {
  e.preventDefault() // stop le chargement de la page
  const formData = new FormData(login)
  //récupération des  éntré utilisateur et conversion en json
  let user = {
    email:   formData.get('email'),
    password:  formData.get('password'),
  };
      if (user.password.length>6) { //Redirection vers l'acceuil si validation du mot de passe
        const users = JSON.stringify(user)
        //requete http POST pour enregistré l'utilisateur
        await fetch('http://localhost:5678/api/users/signup', {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: users
      })
      .then((response) => response.json()) // on utulise la promise pour renvoyer la réponse 
      .then((result) => {
        console.log("Success:", result);
        document.cookie =` token=${result.token}; SameSite=None; Secure`;  //sauvegarde du token pour la connexion
      })
      .catch((error) => {
        console.error("Error:", error);
      });
        document.cookie =` email=${user.email}; SameSite=None; Secure`;
        document.cookie =` password=${user.password}; SameSite=None; Secure`;
       window.location.assign('./index.html')
      }
      else{
        alert('Mots de passe trop court')
      }
    })