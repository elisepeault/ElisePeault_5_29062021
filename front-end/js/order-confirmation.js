


function displayOrderId() {
    const orderIdSpan = document.getElementById("order-id");
    //orderIdSpan.innerText = JSON.parse(localStorage.getItem("orderId"));
    orderIdSpan.innerText = localStorage.getItem("orderId");
    // On vide le localStorage pour recommencer plus tard le processus d'achat
    //localStorage.clear(); 
  }
