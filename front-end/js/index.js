class Teddy {
    constructor(_id, name, price, description, imageUrl) {
        this._id = _id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}

// Array that contain all the "teddy"cards
let teddies = [];
const BASE_URL = "http://127.0.0.1:5500/";

// Functions for the creation of elements in "products__cards"
const addContent = (type_element,name,div) =>{
    const elt = document.createElement(type_element); 
    elt.appendChild(document.createTextNode(name)); 
    div.appendChild(elt); 
}
const addImage = (src,alt,div) => {
    const image = document.createElement("IMG");
    image.src = src;  
    image.alt = alt;  //same alt for all photos
    div.appendChild(image);
}
const addButton =(id,div) => {
    const a = document.createElement('a');
    // Build url + id
    let url = new URL (window.location.origin + '/product.html');
    url.searchParams.append("teddyId", id);
    a.href = url.href;
    // Build a button 
    const button = document.createElement("BUTTON");
    button.textContent="Voir le produit";
    a.appendChild(button);
    div.appendChild(a);
}


// fetch data via the api, then parse the response in json format, then display the data 
fetch("http://localhost:3000/api/teddies/")
    .then(response => response.json())
    .then(data =>  {
        console.log(data);
        for(var key in data) {
            let teddy = new Teddy (
                data[key]._id,
                data[key].name,
                data[key].price,
                data[key].description,
                data[key].imageUrl       
                )
            teddies.push(teddy);
        }
    
        // Search an element with its ID 
        let teddyCard = document.getElementById("products__cards");

        // Loop for => on the "teddies" array
        for (let i = 0; i < teddies.length; i++) {

            // Create a DIV for the card
            let newElt = document.createElement("DIV");
            // Add an IMG
            addImage(teddies[i].imageUrl,teddies[i].name,newElt);
            // Add a SPAN for the NAME
            addContent("span",teddies[i].name,newElt);
            // Add a SPAN for the PRICE
            addContent("span",teddies[i].price /100 + " €",newElt);
            // Add a button (link to open the product page)
            addButton(teddies[i]._id, newElt);

            // Insert our new element in the DOM => in teddyCard (in the html container : products__cards) 
            teddyCard.appendChild(newElt);
        }
    }
)










