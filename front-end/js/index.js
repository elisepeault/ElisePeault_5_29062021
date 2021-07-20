class Teddy {
    constructor(id, name, price, description, imageUrl) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}

// Array that contain all the "teddy"cards
let teddies = [];


// fetch data via the api, then parse the response in json format, then display the data in the browser console
fetch("http://localhost:3000/api/teddies/")
    .then(response => response.json())
    .then(data =>  {
        console.log(data);
        for(var key in data) {
            let teddy = new Teddy (
                data[key].id,
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

            // Create a SPAN for the IMG
            let imgElt = document.createElement("IMG"); // <img >
            imgElt.src = teddies[i].imageUrl;  
            //imgElt.alt = teddies[i].name;     => on peut ajouter un alt si on veut mais ce sera le même pour tous les éléments si on met du texte
            newElt.appendChild(imgElt);

            // Create a SPAN for the NAME
            let nameElt = document.createElement("SPAN"); //<span> </span>
            nameElt.appendChild(document.createTextNode(teddies[i].name)); // 3546546546 & dans second temps => <span> 3546546546 </span>
            newElt.appendChild(nameElt); //<div> <span> 3546546546 </span></div>

            // Create a SPAN for the PRICE
            let priceElt = document.createElement("SPAN");
            priceElt.appendChild(document.createTextNode(teddies[i].price /100 + " €"));
            newElt.appendChild(priceElt);

            let buttonElt = document.createElement("BUTTON");
            buttonElt.appendChild(document.createTextNode("Voir le produit"));
            newElt.appendChild(buttonElt);


            // Insert our new element in the DOM => in teddyCard (in the html container : products__cards) 
            teddyCard.appendChild(newElt);

        // Réutiliser la même variable plutot que en créer plein ("idElt" , "nameELT") ... peut être une boucle ? 
        // Test console
        /*console.log("Object numéro : " + [i]);
        console.log(teddies[i].imageUrl);
        console.log(teddies[i].name);
        console.log(teddies[i].price);*/
        }
    }
)











