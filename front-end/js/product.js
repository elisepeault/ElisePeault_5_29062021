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
    image.alt = alt;  //same alt for all photos
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

const addButton =(div, className) => {
    const a = document.createElement('a');
    // Build a button 
    const button = document.createElement("BUTTON");
    button.textContent="Ajouter au panier";
    button.classList.add(className);
    a.appendChild(button);
    div.appendChild(a);
}

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
        // Add a BUTTON to Add to the cart
        addButton(globalDiv, "add-to-cart");

        // Insert our div :"globalDiv" in the DOM => in teddyPage => in the html container : product-page
        teddyPage.appendChild(globalDiv);

    });


/*--------------------------- SHOPPING CART ---------------------------
Collect the data of a selected product & send it to the cart*/

// Select the button : "add to the shopping cart"
const addToCartButton = document.querySelector(".add-to-cart");

// Select details of the product 
const productName = document.querySelector(".product__name");
const productImage = document.querySelector(".product__image");
const productPrice = document.querySelector(".product__price");

// Local Storage : stock informations about the product in local storage => to use these data in the shopping cart
// const cart = {};      => Ajouter objet ???
let productsInCart = [];

// addEventListener => Listen to the action on the button & send the cart
addToCartButton.addEventListener("click", () => {
    
    //alert("Le nounours a été ajouté au panier !");

    //If the local Storage contain products => we collect the data & put them in the array (JSON.parse => translate JSON format into a Js object)
    if (localStorage.getItem("products") !== null) {
        productsInCart = JSON.parse(localStorage.getItem("products"));
    //But if the local storage is empty => we fill it 
    } else {
        // Create the product that will be added to the cart
        let productAddedToCart = {
            name : productName.innerHTML,
            image : productImage.innerHTML,
            price : productPrice.innerHTML,
            _id : _id,
        };
        productsInCart.push(productAddedToCart);
        localStorage.setItem("products", JSON.stringify(productsInCart));
    }


})





    //LOCAL STORAGE :
    //monStockage = localStorage;
    // ajouter un item : localStorage.setItem('monChat', 'Tom');   
    // setItem(key, value) => key et value sont forcément des chaines de caractères
    // lire un article : let cat = localStorage.getItem('myCat');
    // supprimer un élément : localStorage.removeItem('myCat');
    // supprimer tous les éléments du local storage : localStorage.clear();
    // localStorage.key(index) => on remplace index par le numero de l'item recherché
    // localStorage.length => pour savoir le nombre d'item dans notre local storage

    // looping pour lister les différents items du local storage : 
    /* for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i)
        console.log(key, localStorage.getItem(key))
    }
    */ 