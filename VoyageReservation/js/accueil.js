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

    if (!searchQuery.trim()) {
        afficherVoyages([]);
        return;
    }

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

document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('rechercheVoyage');
    const placeholderText = input.getAttribute('data-placeholder');
    let currentIndex = 0;

    // Fonction pour ajouter un caractère à la fois au placeholder
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

    // Efface le placeholder initialement pour commencer l'animation
    input.setAttribute('placeholder', '');
    typePlaceholder(); // Lance l'animation du placeholder

    // L'événement blur pour rétablir le placeholder complet
    input.addEventListener('blur', function () {
        input.setAttribute('placeholder', placeholderText);
    });
});



document.getElementById('rechercheVoyage').addEventListener('blur', function () {
    const input = this;
    const placeholderText = input.getAttribute('data-placeholder');

    // Rétablit le placeholder complet et vide la barre de saisie
    input.setAttribute('placeholder', placeholderText);
    input.value = ''; // Vide la valeur de l'input
});



// Appeler cette fonction au chargement de la page pour afficher le bon lien
document.addEventListener('DOMContentLoaded', toggleConnexionLink);

// Event listener pour rechercher les voyages à chaque frappe de l'utilisateur
document.getElementById('rechercheVoyage').addEventListener('input', rechercherVoyages);


function applyBlackFilter() {
    // Applique un filtre noir semi-transparent sur l'image de fond
    document.getElementById('overlay').style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
}

function removeBlackFilter() {
    // Enlève le filtre noir lorsque l'élément perd le focus
    document.getElementById('overlay').style.backgroundColor = 'rgba(0, 0, 0, 0)';
}