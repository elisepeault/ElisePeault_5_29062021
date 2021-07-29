let params = new URL(document.location).searchParams;
let _id = params.get("_id");

class TeddyPage {
    constructor(_id, name, price, description, imageUrl, colors) {
        this._id = _id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.colors = colors;
    }
}

let colors = [];


fetch("http://localhost:3000/api/teddies/:_id")
    .then(response => response.json())
    .then(data =>  {
        console.log(data);
        for(var key in data) {
            let teddyInfos = new TeddyPage (
                data[key].id,
                data[key].name,
                data[key].price,
                data[key].description,
                data[key].imageUrl       
                )
            //teddies.push(teddyInfos);
        }
    })











