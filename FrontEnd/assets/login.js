const login =  document.getElementById('login')
//On écoute sur le formulaire de connexion
login.addEventListener("submit",  async (e) => {
  e.preventDefault() // stop le chargement de la page
  const formData = new FormData(login)
  //récupération des  éntré utilisateur et conversion en json
  let user = {
    email:   await formData.get('email'),
    password:  await formData.get('password'),
  };
      if (user.password == 'S0phie ' && user.email == 'sophie.bluel@test.tld') { //Redirection vers l'acceuil si validation du mot de passe
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
        alert('Mots de passe ou email incorrect')
      }
    })