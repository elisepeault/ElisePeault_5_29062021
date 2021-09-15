
const cart = document.getElementById("cart-card");

const local = JSON.parse(localStorage.getItem("productAddedToCart"));


for (let product in local) {

    let productName = document.createElement("div");
    cart.appendChild(productName);
    productName.innerHTML = local[product].name;

    let productPrice = document.createElement("div");
    cart.appendChild(productPrice);
    productPrice.innerHTML = local[product].price;

    let productImage = document.createElement("IMG");
    cart.appendChild(productImage);
    productImage.src = local[product].image;
    productImage.alt = local[product].name;  

}

/*
addContent("h1", productData.name, globalDiv, "product__name");
// Add an IMG
addImage(productData.imageUrl, productData.name, globalDiv, "product__image");
// Add a SPAN for the PRICE
addContent("span", productData.price /100 + " €", globalDiv, "product__price");
// Add a P for the DESCRIPTION
addContent("p", productData.description, globalDiv, "product__description");
// Add a SELECT for the color choice
addSelect(globalDiv, "product__color");
*/