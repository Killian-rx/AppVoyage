async function rechercherVoyages() {
    const searchQuery = document.getElementById('rechercheVoyage').value;

    // Envoi de la requête de recherche au back-end
    const response = await fetch(`http://localhost:5074/api/voyages/recherche?query=${searchQuery}`);
    const voyages = await response.json();

    afficherVoyages(voyages);
}

function afficherVoyages(voyages) {
    const voyagesListe = document.getElementById('voyagesListe');
    voyagesListe.innerHTML = '';

    voyages.forEach(voyage => {
        const listItem = document.createElement('li');
        listItem.textContent = `${voyage.destination} - ${voyage.dateDepart} - ${voyage.prix}€`;
        voyagesListe.appendChild(listItem);
    });
}
