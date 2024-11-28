async function afficherDetailsVoyage() {
    // Récupérer l'ID du voyage à partir de l'URL (paramètre 'voyageId')
    const urlParams = new URLSearchParams(window.location.search);
    const voyageId = urlParams.get('voyageId'); // Récupère le paramètre 'voyageId' de l'URL

    if (!voyageId) {
        console.error("L'ID du voyage n'est pas défini dans l'URL.");
        return; // Si l'ID n'est pas présent, on arrête l'exécution de la fonction
    }

    console.log("Voyage ID récupéré:", voyageId); // Vérification de l'ID

    try {
        const response = await fetch(`http://localhost:5074/api/voyages/${voyageId}`);
        const voyage = await response.json();
        console.log('Détails du voyage :', voyage); // Log des détails pour vérifier la structure
        
        if (response.ok) {
            document.getElementById('destination').textContent = voyage.destination;
            document.getElementById('prix').textContent = voyage.prix;
            document.getElementById('dateDepart').textContent = voyage.dateDepart;
            document.getElementById('dateRetour').textContent = voyage.dateRetour;
        } else {
            console.log('Erreur API:', voyage);
        }
    } catch (error) {
        console.error('Erreur lors du chargement des informations du voyage :', error);
    }
    
}

// Charger les détails du voyage dès que la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    afficherDetailsVoyage();
});

// Fonction pour reformater une date au format AAAA/MM/JJ
function reformaterDate(dateISO) {
    const date = new Date(dateISO);
    const annee = date.getFullYear();
    const mois = String(date.getMonth() + 1).padStart(2, '0'); // Mois entre 1-12
    const jour = String(date.getDate()).padStart(2, '0'); // Jour entre 1-31
    return `${jour}/${mois}/${annee}`;
}


// Charger les détails du voyage dès que la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    afficherDetailsVoyage();
});
