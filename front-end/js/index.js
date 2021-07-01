class Teddy {
    constructor(id, name, price, description, imageUrl) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}

let teddy1 = new Teddy(
    "5be9c8541c9d440000665243", 
    "Norbert", 
    2900, 
    "teddy_1.jpg", 
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    )

let teddies = [];

teddies.push(teddy1);

//const newTeddyCard = document.createElement("div");


let teddyCard = document.getElementById("products__cards");
teddyCard.innerHTML = "<div><img><span>Norbert</span><span>29.00€</span></div>" ;

//Faire boucle pour venir prendre cards sur le array : let teddies
//.length pour => taille array