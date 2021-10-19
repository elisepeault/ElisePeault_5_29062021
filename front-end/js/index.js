// Template named "Teddy" for the creation of "teddy" objects (teddy objects = products cards displayed on the index page)
class Teddy {
    constructor(_id, name, price, description, imageUrl) {
        this._id = _id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}


// Functions for the creation of elements in the div "products__cards"
const addContent = (type_element, name, div) => {
    const elt = document.createElement(type_element); 
    elt.appendChild(document.createTextNode(name)); 
    div.appendChild(elt); 
}
const addImage = (src, alt, div) => {
    const image = document.createElement("IMG");
    image.src = src;  
    image.alt = alt;  
    div.appendChild(image);
}
const addButton = (id, className, div) => {
    const a = document.createElement('a');
    // Build url + id
    let url = new URL (window.location.origin + '/product.html');
    url.searchParams.append("teddyId", id);
    a.href = url.href;
    // Build a button 
    const button = document.createElement("BUTTON");
    button.classList.add(className);
    button.textContent="Voir le produit";
    a.appendChild(button);
    div.appendChild(a);
}


// Create objects based on the Teddy class using the data obtained by the fetch request and stock it into an array
const createDataArray = (responseFetch, arrayOfTeddy) => {
    for(var key in responseFetch) {
        // Create a teddy object based on the Teddy class
        let teddy = new Teddy (
            responseFetch[key]._id,
            responseFetch[key].name,
            responseFetch[key].price,
            responseFetch[key].description,
            responseFetch[key].imageUrl       
            )
        // Push each teddy object in the teddies array
        arrayOfTeddy.push(teddy);
    }
    // create an array
    return arrayOfTeddy
}


// Fetch data via the API, then parse the response in json format, then display the data 
fetch("http://localhost:3000/api/teddies/")
    .then(response => response.json())
    .then(data =>  {
        // Call the function createTeddyCard 
        let teddies = createDataArray(data,[]);
        
        // Search the div that will contain "teddy" objects (cards) with its ID 
        let teddyCard = document.getElementById("products__cards");

        // For each object in the "teddies" array :
        for (let i = 0; i < teddies.length; i++) {

            // Create a DIV for the card
            let newElt = document.createElement("DIV");
            // Add an IMG
            addImage(teddies[i].imageUrl, teddies[i].name, newElt);
            // Add a SPAN for the NAME
            addContent("span", teddies[i].name, newElt);
            // Add a SPAN for the PRICE
            addContent("span", teddies[i].price /100 + " €", newElt);
            // Add a button (link to open the product page)
            addButton(teddies[i]._id, "button", newElt);

            // Insert each new element in the DOM => in teddyCard (in the html container : products__cards) 
            teddyCard.appendChild(newElt);
        }
    })
    .catch((error) => {
        alert("Il y a eu une erreur : " + error);
    });