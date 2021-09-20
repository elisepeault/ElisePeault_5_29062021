// Select the main div with its class: "cart-card"
const cart = document.getElementById("cart-card");

//
const local = JSON.parse(localStorage.getItem("products"));


for (let product in local) {

    let productImage = document.createElement("IMG");
    cart.appendChild(productImage);
    productImage.src = local[product].image;
    productImage.alt = local[product].name;  

    let productName = document.createElement("div");
    cart.appendChild(productName);
    productName.innerHTML = local[product].name;

    let productPrice = document.createElement("div");
    cart.appendChild(productPrice);
    productPrice.innerHTML = local[product].price;

}


/* "Clear the cart" Button */ 
const clearTheCartButton = document.getElementById("clear-cart-button");

// When we click on the button "clearTheCartButton" : the cart and the local storage are emptied
clearTheCartButton.addEventListener("click", () => {
    localStorage.clear();
});