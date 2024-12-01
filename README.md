# Application de Voyage

Bienvenue dans l'application de voyage ! Ce projet est divisé en deux parties principales : le **backend** et le **frontend**, qui travaillent ensemble pour offrir une expérience utilisateur fluide.

---

## 🗂 Structure du projet

### **Backend (API)**

- Localisation : `AppVoyage/VoyageReservationAPI`
- Langage et Framework : C# avec ASP.NET Core.
- Fonctionnalités :
  - Fournit des endpoints pour rechercher des voyages.
  - Gère les utilisateurs (inscription, connexion).
  - Permet de récupérer et gérer les réservations.
  - Gestion de la base de données 
  - Utilisation d'une API 

  
### **Frontend (Web)**

- Localisation : `AppVoyage/VoyageReservation`
- Technologies utilisées : HTML, CSS et JavaScript.
- Fonctionnalités :
  - Affichage des voyages disponibles.
  - Système de connexion/déconnexion des utilisateurs.
  - Barre de recherche dynamique pour les destinations.
  - Interface utilisateur pour la consultation et la réservation.

---

## 🚀 Lancer l'application

### **Backend**

1. Assurez-vous d'avoir installé le SDK .NET (version 6.0 ou plus récente).
2. Ouvrez un terminal et placez-vous dans le dossier `AppVoyage/VoyageReservationAPI`.
3. Exécutez la commande suivante pour lancer le serveur :
   ```bash
   dotnet run