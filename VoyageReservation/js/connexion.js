async function handleLogin(event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    const utilisateur = document.getElementById('utilisateur').value;
    const motdepasse = document.getElementById('motdepasse').value;
    const messageDiv = document.getElementById('message');

    messageDiv.textContent = '';
    messageDiv.style.color = '';

    if (!utilisateur || !motdepasse) {
        messageDiv.textContent = "Veuillez remplir tous les champs.";
        messageDiv.style.color = "red";
        return;
    }

    const loginData = {
        nom: utilisateur,
        motDePasse: motdepasse,
    };

    try {
        const response = await fetch('http://localhost:5074/api/utilisateurs/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (response.ok) {
            const { utilisateurId, message } = await response.json(); // Récupérer la réponse JSON
            messageDiv.textContent = message || "Connexion réussie !";
            messageDiv.style.color = "green";

            // Stocker l'ID utilisateur
            localStorage.setItem('utilisateurId', utilisateurId);
            console.log('ID utilisateur enregistré dans localStorage :', utilisateurId);

            setTimeout(() => {
                window.location.href = '/voyages.html';
            }, 2000);
        } else {
            const error = await response.text();
            messageDiv.textContent = `Erreur : ${error}`;
            messageDiv.style.color = "red";
        }
    } catch (error) {
        console.error('Erreur de connexion :', error);
        messageDiv.textContent = "Une erreur est survenue lors de la connexion.";
        messageDiv.style.color = "red";
    }
}

// Ajouter l'écouteur d'événement pour la soumission du formulaire
document.getElementById('loginForm').addEventListener('submit', handleLogin);

// Function to handle the registration form submission
async function handleRegister(event) {
    event.preventDefault(); // Prevent the form from reloading the page

    // Get form data (adjust IDs according to your HTML)
    const nomUtilisateur = document.getElementById('Utilisateur').value;
    const emailUtilisateur = document.getElementById('Email').value;
    const motDePasse = document.getElementById('Motdepasse').value;

    // Prepare the data to send to the backend
    const utilisateurData = {
        nom: nomUtilisateur,
        email: emailUtilisateur,
        motDePasse: motDePasse
    };

    // Select the message element
    const messageDiv = document.getElementById('Message');
    messageDiv.textContent = ""; // Reset the message content
    messageDiv.style.color = ""; // Reset the message color

    try {
        // Make a POST request to the register endpoint
        const response = await fetch('http://localhost:5074/api/utilisateurs/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Ensure content-type is set to JSON
            },
            body: JSON.stringify(utilisateurData),
        });

        // Check if the response is successful
        if (response.ok) {
            const { message } = await response.json(); // Extract the message from the JSON response
            messageDiv.textContent = message; // Display the success message
            messageDiv.style.color = "green"; // Set the text color to green
            // Optionally redirect after a delay
            setTimeout(() => {
                window.location.href = '/connexion.html'; // Adjust the URL as needed
            }, 2000);
        } else {
            const { error } = await response.json(); // Extract the error message from the JSON response
            messageDiv.textContent = `Erreur: ${error}`; // Display the error message
            messageDiv.style.color = "red"; // Set the text color to red
        }
    } catch (error) {
        console.error('Error:', error);
        messageDiv.textContent = "Une erreur est survenue lors de l'inscription.";
        messageDiv.style.color = "red";
    }
}

// Attach event listener to the form submission (adjust ID according to your form)
document.getElementById('registerForm').addEventListener('submit', handleRegister);

function SlideToLeft(){
    const slider = document.getElementById('slider-overlay');
    slider.style.left = "0";
}

function SlideToRight(){
    const slider = document.getElementById('slider-overlay');
    slider.style.left = "50%";
}

