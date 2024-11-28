// Fonction pour gérer la soumission du formulaire de connexion
async function handleLogin(event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    // Récupérer les valeurs des champs de formulaire
    const utilisateur = document.getElementById('utilisateur').value;
    const email = document.getElementById('email').value;
    const motdepasse = document.getElementById('motdepasse').value;

    // Vérifier si les champs sont remplis
    if (!utilisateur || !motdepasse) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    // Préparer les données à envoyer à l'API
    const loginData = {
        nom: utilisateur,      // Utiliser 'nom' au lieu de 'utilisateur' pour correspondre à l'API
        motDePasse: motdepasse,
        email: email           // Inclure l'email si l'API le demande
    };

    try {
        // Envoi de la requête de connexion à l'API
        const response = await fetch('http://localhost:5074/api/utilisateurs/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Indiquer que les données sont envoyées en JSON
            },
            body: JSON.stringify(loginData), // Convertir les données en JSON
        });

        // Vérifier si la connexion a réussi
        const responseText = await response.text(); // Récupérer la réponse en texte brut
        try {
            const result = JSON.parse(responseText);  // Tenter de parser en JSON

            if (response.ok) {
                alert('Connexion réussie !');
                window.location.href = '/home'; // Remplacer '/home' par l'URL de la page d'accueil
            } else {
                alert(`Erreur : ${result}`);  // Afficher l'erreur retournée par l'API
            }
        } catch (error) {
            console.error('Erreur lors de l\'analyse JSON', error);
            alert('Une erreur est survenue : ' + responseText);
        }

    } catch (error) {
        console.error('Erreur de connexion :', error);
        alert('Une erreur est survenue lors de la connexion.');
    }
}

// Ajouter l'écouteur d'événement pour la soumission du formulaire (s'assurer que l'ID correspond à celui du formulaire)
document.getElementById('loginForm').addEventListener('submit', handleLogin);
