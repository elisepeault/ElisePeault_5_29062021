/* ----- DISPLAY THE ORDER ID IN THE CONFIRMATION PAGE ----- */

// Select the span "order-id" in the DOM (to display the orderId)
let orderIdSpan = document.getElementById("order-id");

// Get the orderId in the local storage
let orderIdStorage = localStorage.getItem("orderId");

    if (orderIdStorage == null) {
        orderIdSpan.innerHTML = "Il n'y a pas de numéro de commande. Veuillez contacter le service client.";
    } else {
        orderIdSpan.innerHTML = "&nbsp" + orderIdStorage;
        localStorage.clear();
    }

