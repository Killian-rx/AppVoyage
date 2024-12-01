// Fonction pour reformater une date au format JJ/MM/AAAA
function reformaterDate(dateISO) {
    const date = new Date(dateISO);
    const annee = date.getFullYear();
    const mois = String(date.getMonth() + 1).padStart(2, '0'); // Mois entre 1-12
    const jour = String(date.getDate()).padStart(2, '0'); // Jour entre 1-31
    return `${jour}/${mois}/${annee}`;
}

async function afficherReservations() {
    const utilisateurId = localStorage.getItem('utilisateurId');

    if (!utilisateurId) {
        alert("Utilisateur non connecté.");
        window.location.href = '/connexion.html'; // Rediriger vers la page de connexion si nécessaire
        return;
    }

    try {
        const response = await fetch(`http://localhost:5074/api/reservations/utilisateur/${utilisateurId}`);

        if (response.ok) {
            const reservations = await response.json();
            const reservationsListe = document.getElementById('reservationsListe');
            reservationsListe.innerHTML = ''; // Vider la liste avant d'ajouter les nouvelles réservations

            reservations.forEach(reservation => {
                const listItem = document.createElement('li');
                listItem.textContent = `Réservation pour ${reservation.voyageNom} le ${reformaterDate(reservation.dateReservation)}`;

                // Création d'un conteneur pour les boutons
                const buttonContainer = document.createElement('div');
                buttonContainer.classList.add('button-container');

                // Création du bouton "En savoir plus"
                const enSavoirPlusButton = document.createElement('button');
                enSavoirPlusButton.classList.add('button1');
                enSavoirPlusButton.textContent = "Détails";
                enSavoirPlusButton.onclick = () => {
                    console.log("ID du voyage : ", reservation.voyageId); // Vérification de l'ID
                    window.location.href = `/billet.html?voyageId=${reservation.voyageId}`;
                };
                
                // Création du bouton "Annuler"
                const annulerButton = document.createElement('button');
                annulerButton.classList.add('button2');
                annulerButton.textContent = "Annuler";
                annulerButton.onclick = () => annulerReservation(reservation.id); // Passer correctement l'ID

                // Ajout des boutons au conteneur
                buttonContainer.appendChild(enSavoirPlusButton);
                buttonContainer.appendChild(annulerButton);

                // Ajout du conteneur des boutons à l'élément de liste
                listItem.appendChild(buttonContainer);

                reservationsListe.appendChild(listItem);
            });
        } else {
            alert("Impossible de charger les réservations.");
        }
    } catch (error) {
        console.error('Erreur lors du chargement des réservations :', error);
        alert('Une erreur est survenue.');
    }
}




async function annulerReservation(reservationId) {
    if (!reservationId) {
        console.error("L'ID de la réservation est manquant. Valeur reçue :", reservationId);
        return;
    }

    try {
        const response = await fetch(`http://localhost:5074/api/reservations/${reservationId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log("Réservation annulée avec succès :", reservationId);
            // Rafraîchir la liste
            location.reload();
        } else {
            alert("Impossible d'annuler la réservation.");
        }
    } catch (error) {
        console.error('Erreur lors de l\'annulation de la réservation :', error);
        alert('Une erreur est survenue.');
    }
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

// Appeler cette fonction au chargement de la page pour afficher le bon lien
document.addEventListener('DOMContentLoaded', toggleConnexionLink);

// Charger les réservations après le chargement de la page
window.onload = afficherReservations;
