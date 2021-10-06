/* ----- DISPLAY THE ORDER ID IN THE CONFIRMATION PAGE ----- */

// Select the span "order-id" in the DOM (to display the orderId)
let orderIdSpan = document.getElementById("order-id");

const displayOrderId = () => {
    
    let orderIdStorage = localStorage.getItem("orderId");

    if (orderIdStorage == null) {
        orderIdSpan.innerHTML = "Erreur : Veuillez contacter le service client.";
    } else {
        orderIdSpan.innerHTML = ` ${orderIdStorage} `;
    }
};
