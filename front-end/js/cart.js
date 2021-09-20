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