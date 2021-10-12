/* ----- DISPLAY THE ORDER ID IN THE CONFIRMATION PAGE ----- */

// Select the span "order-id" in the DOM (to display the orderId)
let orderIdSpan = document.getElementById("order-id");

// Get the orderId in the local storage
let orderIdStorage = localStorage.getItem("orderId");

    // If there is no order id in the local storage = error message
    if (orderIdStorage == null) {
        orderIdSpan.innerHTML = "Il n'y a pas de numéro de commande. Veuillez contacter le service client.";
    // But if there is an order id in the local storage = display the order id in the "orderIdSpan" element in the DOM, and then = clear the local storage. 
    } else {
        orderIdSpan.innerHTML = "&nbsp" + orderIdStorage;
        localStorage.clear();
    }

