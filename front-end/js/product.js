/* -------------- DISPLAY THE CARD OF THE SELECTED PRODUCT -------------- */

// Functions for the creation of elements in the div "product-page"
const addContent = (type_element, name, div, className) => {
    const content = document.createElement(type_element); 
    content.appendChild(document.createTextNode(name)); 
    content.classList.add(className);
    div.appendChild(content); 
}
const addImage = (src, alt, div, className) => {
    const image = document.createElement("IMG");
    image.src = src;  
    image.alt = alt; 
    image.classList.add(className);
    div.appendChild(image);
}
const addSelect = (div, className) => {
    const select = document.createElement("select");
    select.classList.add(className);
    // Add all the colors of a product in the select element (Colors are different for each teddy)
    for (let i = 0; i < productData.colors.length; i++) {
        let option = document.createElement("option");
        label = "Couleurs";
        option.innerText = productData.colors[i];
        select.appendChild(option);
    }
    div.appendChild(select);
}


// Pick the parameter "teddyId" in each url 
let urlData = new URL ("http://localhost:3000/api/teddies/:_id");
let params = new URLSearchParams(window.location.search);
let _id = params.get("teddyId");


// Fetch data via the API, then parse the response in json format, then display the data (get the product's element that match with each id)
fetch("http://localhost:3000/api/teddies/" + _id)
    .then(response => response.json())
    .then(data =>  {
        productData = data; 

        //Search the general div in the DOM with its id 
        let teddyPage = document.getElementById("product-page");

        // Create a DIV for the product's card
        let globalDiv = document.createElement("DIV");

        // Add a SPAN for the NAME
        addContent("h2", productData.name, globalDiv, "product__name");
        // Add an IMG
        addImage(productData.imageUrl, productData.name, globalDiv, "product__image");
        // Add a SPAN for the PRICE
        addContent("span", productData.price /100 + " €", globalDiv, "product__price"); 
        // Add a P for the DESCRIPTION
        addContent("p", productData.description, globalDiv, "product__description");
        // Add a SELECT for the color choice
        addSelect(globalDiv, "product__color");

        // Insert the div :"globalDiv" in the DOM => in teddyPage (in the html container : product-page)
        teddyPage.appendChild(globalDiv);
    })
    .catch((error) => {
        alert("Il y a eu une erreur : " + error);
    });


/*--------------------------- LOCAL STORAGE ---------------------------*/
// Collect the data of a selected product & store it into the local storage


// Select the button : "add to the shopping cart"
const addToCartButton = document.getElementById("button-add-to-cart");


// Push cart products in the local storage
const pushCartInLS = (newProductInCart, productsInCartArray) => {
    // If there are products in the local storage : the local storage data is stocked in the array "productsInCart" and parsed
    if (localStorage.getItem("products") !== null) {
        productsInCartArray = JSON.parse(localStorage.getItem("products"));
    }
    // If the local storage is empty : new products are pushed in the cart array, stringified and sent to the local storage
    productsInCartArray.push(newProductInCart);
    localStorage.setItem("products", JSON.stringify(productsInCartArray));
}


// Add an object to the local storage
addToCartButton.addEventListener("click", () => {
    let productAddedToCart = {
        name : productData.name,
        image : productData.imageUrl,
        price : productData.price /100, 
        id : productData._id,
    };

    // Creation of an array to contain all the products in the cart
    let productsInCart = [];

    pushCartInLS(productAddedToCart, productsInCart);

});