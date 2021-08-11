// Functions for the creation of elements in the div "products-page"
const addContent = (type_element,name,div) =>{
    const content = document.createElement(type_element); 
    content.appendChild(document.createTextNode(name)); 
    div.appendChild(content); 
}

const addImage = (src,alt,div) => {
    const image = document.createElement("IMG");
    image.src = src;  
    image.alt = alt;  //same alt for all photos
    div.appendChild(image);
}

const addSelect = (div) => {
    const select = document.createElement("select");
    for (let i = 0; i < productData.colors.length; i++) {
        let option = document.createElement("option");
        label = "Couleurs";
        option.innerText = productData.colors[i];
        select.appendChild(option);
    }
    div.appendChild(select);
}

const addButton =(div) => {
    const a = document.createElement('a');
    // Build a button 
    const button = document.createElement("BUTTON");
    button.textContent="Ajouter au panier";
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
        addContent("h1", productData.name, globalDiv);
        // Add an IMG
        addImage(productData.imageUrl, productData.name, globalDiv);
        // Add a SPAN for the PRICE
        addContent("span", productData.price /100 + " €", globalDiv);
        // Add a P for the DESCRIPTION
        addContent("p", productData.description, globalDiv);
        // Add a SELECT for the color choice
        addSelect(globalDiv);
        // Add a BUTTON to Add to the cart
        addButton(globalDiv);

        // Insert our div :"globalDiv" in the DOM => in teddyPage => in the html container : product-page
        teddyPage.appendChild(globalDiv);

    });
