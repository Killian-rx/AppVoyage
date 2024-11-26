// Function to handle the registration form submission
async function handleRegister(event) {
    event.preventDefault(); // Prevent the form from reloading the page

    // Get form data (adjust IDs according to your HTML)
    const nomUtilisateur = document.getElementById('nomUtilisateur').value;
    const emailUtilisateur = document.getElementById('emailUtilisateur').value;
    const motDePasse = document.getElementById('motDePasse').value;

    // Prepare the data to send to the backend
    const utilisateurData = {
        nom: nomUtilisateur,       // Match the property name as used in Swagger
        email: emailUtilisateur,   // Match the property name as used in Swagger
        motDePasse: motDePasse     // Match the property name as used in Swagger
    };

    // Log the data being sent to the console (for debugging)
    console.log('Données envoyées formatées :', JSON.stringify(utilisateurData));


    try {
        // Make a POST request to the register endpoint
        const response = await fetch('http://localhost:5074/api/utilisateurs/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // Ensure content-type is set to JSON
            },
            body: JSON.stringify(utilisateurData), // 2 ajoute une indentation

        });

        // Check if the response is successful
        if (response.ok) {
            const result = await response.json();
            alert(result); // Show success message
            // Optionally redirect to login page or dashboard
        } else {
            const error = await response.json();
            alert(`Erreur: ${error.errors || error}`); // Show error message from the server
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Une erreur est survenue lors de l\'inscription.');
    }

    
}

// Fonction pour afficher les voyages dans le DOM
function displayVoyages(voyages) {
    const container = document.getElementById("voyages-container");
    container.innerHTML = ""; // Nettoyer le conteneur avant d'ajouter les voyages

    voyages.forEach((voyage) => {
        const voyageElement = document.createElement("div");
        voyageElement.classList.add("voyage");

        // Convertir les dates au format français
        const dateDepart = new Date(voyage.dateDepart).toLocaleDateString("fr-FR");
        const dateRetour = new Date(voyage.dateRetour).toLocaleDateString("fr-FR");

        voyageElement.innerHTML = `
            <h3>${voyage.destination}</h3>
            <p><strong>Date de départ :</strong> ${dateDepart}</p>
            <p><strong>Date de retour :</strong> ${dateRetour}</p>
            <p><strong>Prix :</strong> ${voyage.prix.toFixed(2)} €</p>
        `;
        container.appendChild(voyageElement);
    });
}

// Charger les voyages au chargement de la page
document.addEventListener("DOMContentLoaded", fetchVoyages);
