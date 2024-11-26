const apiUrl = "https://localhost:5074/api/voyages"; // L'URL de l'API

// Fonction pour récupérer les voyages depuis l'API
async function fetchVoyages() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données.");
        }
        const voyages = await response.json();
        displayVoyages(voyages);
    } catch (error) {
        console.error(error.message);
    }
}

// Fonction pour afficher les voyages dans le DOM
function displayVoyages(voyages) {
    const container = document.getElementById("voyages-container");
    container.innerHTML = ""; // Réinitialiser le conteneur

    voyages.forEach(voyage => {
        const voyageElement = document.createElement("div");
        voyageElement.classList.add("voyage");
        voyageElement.innerHTML = `
            <h3>${voyage.destination}</h3>
            <p><strong>Date de départ :</strong> ${new Date(voyage.dateDepart).toLocaleDateString()}</p>
            <p><strong>Date de retour :</strong> ${new Date(voyage.dateRetour).toLocaleDateString()}</p>
            <p><strong>Prix :</strong> ${voyage.prix} €</p>
        `;
        container.appendChild(voyageElement);
    });
}

// Charger les données au chargement de la page
document.addEventListener("DOMContentLoaded", fetchVoyages);
