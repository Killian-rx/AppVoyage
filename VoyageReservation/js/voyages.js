const apiUrl = "http://localhost:5074/api/voyages"; // URL de ton API

// Fonction pour récupérer les voyages depuis l'API
async function fetchVoyages() {
    try {
        // Appel de l'API pour récupérer les voyages
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données depuis l'API.");
        }

        // Convertir les données en JSON
        const voyages = await response.json();
        displayVoyages(voyages);
    } catch (error) {
        console.error("Erreur:", error.message);
        // Affichage d'un message d'erreur dans le DOM
        const container = document.getElementById("voyages-container");
        container.innerHTML = `<p style="color: red;">Impossible de charger les voyages. Vérifiez votre connexion ou contactez un administrateur.</p>`;
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