// Fonction pour transformer la première lettre en majuscule
function capitalizeFirstLetter(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Fonction pour récupérer les voyages depuis l'API
async function rechercherVoyages() {
    let searchQuery = document.getElementById('rechercheVoyage').value;

    searchQuery = capitalizeFirstLetter(searchQuery);

    console.log('Requête utilisateur normalisée :', searchQuery);

    try {
        const response = await fetch(`http://localhost:5074/api/voyages/recherche?query=${searchQuery}`);
        
        if (!response.ok) {
            console.error('Erreur dans la réponse de l\'API :', response.status);
            return;
        }

        const voyages = await response.json();
        console.log('Résultats renvoyés par l\'API :', voyages);

        afficherVoyages(voyages);
    } catch (error) {
        console.error('Erreur lors de la requête fetch :', error);
    }
}

// Fonction pour afficher les voyages dans le DOM
function afficherVoyages(voyages) {
    const voyagesListe = document.getElementById('voyagesListe');
    voyagesListe.innerHTML = ''; 

    voyages.forEach(voyage => {
        const listItem = document.createElement('li');
        
        const dateDepart = new Date(voyage.dateDepart).toLocaleDateString("fr-FR");
        const dateRetour = new Date(voyage.dateRetour).toLocaleDateString("fr-FR");

        listItem.innerHTML = `
            <a href="billet.html?voyageId=${voyage.voyageId}">
                <h3>${voyage.destination}</h3>
            </a>
        `;

        voyagesListe.appendChild(listItem);
    });
}

// Fonction pour afficher ou cacher le bouton de connexion/déconnexion en fonction de l'état de l'utilisateur
function toggleConnexionLink() {
    const userId = localStorage.getItem('utilisateurId');
    const loginLink = document.getElementById('login-link');

    if (userId) {
        loginLink.textContent = 'Déconnexion';
        loginLink.href = '#';
        loginLink.onclick = function() {
            localStorage.removeItem('utilisateurId');  // Supprimer l'ID utilisateur
            alert('Vous êtes déconnecté');
            toggleConnexionLink();  // Mettre à jour l'affichage
        };
    } else {
        loginLink.textContent = 'Connexion';
        loginLink.href = 'connexion.html';  // Redirige vers la page de connexion
    }
}

document.getElementById('rechercheVoyage').addEventListener('focus', function () {
    const input = this;
    const placeholderText = input.getAttribute('data-placeholder');
    let currentIndex = 0;

    // Efface le placeholder pour débuter l'animation
    input.setAttribute('placeholder', '');

    // Fonction pour ajouter un caractère à la fois
    const typePlaceholder = () => {
        if (currentIndex < placeholderText.length) {
            input.setAttribute(
                'placeholder',
                input.getAttribute('placeholder') + placeholderText[currentIndex]
            );
            currentIndex++;
            setTimeout(typePlaceholder, 100); // Ajuste la vitesse ici
        }
    };

    typePlaceholder(); // Lance l'animation
});

document.getElementById('rechercheVoyage').addEventListener('blur', function () {
    const input = this;
    const placeholderText = input.getAttribute('data-placeholder');

    // Rétablit le placeholder complet quand on sort du focus
    input.setAttribute('placeholder', placeholderText);
});

// Met le focus sur l'input de recherche quand la page est chargée
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('rechercheVoyage').focus();
});



// Appeler cette fonction au chargement de la page pour afficher le bon lien
document.addEventListener('DOMContentLoaded', toggleConnexionLink);

// Event listener pour rechercher les voyages à chaque frappe de l'utilisateur
document.getElementById('rechercheVoyage').addEventListener('input', rechercherVoyages);

