// Functions for the creation of elements in the div "products-page"
const addContent = (type_element,name,div, className) =>{
    const content = document.createElement(type_element); 
    content.appendChild(document.createTextNode(name)); 
    content.classList.add(className);
    div.appendChild(content); 
}

const addImage = (src,alt,div, className) => {
    const image = document.createElement("IMG");
    image.src = src;  
    image.alt = alt; 
    image.classList.add(className);
    div.appendChild(image);
}

const addSelect = (div, className) => {
    const select = document.createElement("select");
    select.classList.add(className);
    for (let i = 0; i < productData.colors.length; i++) {
        let option = document.createElement("option");
        label = "Couleurs";
        option.innerText = productData.colors[i];
        select.appendChild(option);
    }
    div.appendChild(select);
}

/*const addButton =(div, className, idName) => {
    const a = document.createElement('a');
    // Build a button 
    const button = document.createElement("BUTTON");
    button.textContent="Ajouter au panier";
    button.classList.add(className);
    button.id = idName;
    a.appendChild(button);
    div.appendChild(a);
}
*/

// Pick the parameter "teddyId" in each url 
let urlData = new URL ("http://localhost:3000/api/teddies/:_id");
let params = new URLSearchParams(window.location.search);
let _id = params.get("teddyId");

//fetch data via the api => get the description product matching with each id
fetch("http://localhost:3000/api/teddies/" + _id)
    .then(response => response.json())
    .then(data =>  {
        console.log(data);
        productData = data; 

        //Search the general div with its id 
        let teddyPage = document.getElementById("product-page");
        let globalDiv = document.createElement("DIV");

        // Add a SPAN for the NAME
        addContent("h1", productData.name, globalDiv, "product__name");
        // Add an IMG
        addImage(productData.imageUrl, productData.name, globalDiv, "product__image");
        // Add a SPAN for the PRICE
        addContent("span", productData.price /100 + " €", globalDiv, "product__price"); 
        // Add a P for the DESCRIPTION
        addContent("p", productData.description, globalDiv, "product__description");
        // Add a SELECT for the color choice
        addSelect(globalDiv, "product__color");

        // Insert the div :"globalDiv" in the DOM => in teddyPage => in the html container : product-page
        teddyPage.appendChild(globalDiv);

    });



    /*--------------------------- LOCAL STORAGE ---------------------------
    Collect the data of a selected product & store it in the local storage*/


// Select the button : "add to the shopping cart"
const addToCartButton = document.getElementById("button-add-to-cart");

// Add an object to the local storage
addToCartButton.addEventListener("click", () => {
    let productAddedToCart = {
        name : productData.name,
        image : productData.imageUrl,
        price : productData.price /100, //+ " €"
        id : productData._id,
    };

    let productsInCart = [];

// if there are products in the local storage : the data is stocked in the array "productsInCart" and saved in the local storage 
if (localStorage.getItem("products") !== null) {
    productsInCart = JSON.parse(localStorage.getItem("products"));
}
// If the local storage is empty : products (in the array) are pushed to the local storage
    productsInCart.push(productAddedToCart);
    localStorage.setItem("products", JSON.stringify(productsInCart));
});



//alert("Le nounours a été ajouté au panier !");
//ou => "nom du nounours" a été ajouté au panier ! 
