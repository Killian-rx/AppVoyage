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

// Attach event listener to the form submission (adjust ID according to your form)
document.getElementById('registerForm').addEventListener('submit', handleRegister);
