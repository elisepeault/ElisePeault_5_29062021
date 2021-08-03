// Pick the parameter "teddyId" in each url 
let urlData = new URL ("http://localhost:3000/api/teddies/:_id");
let params = new URLSearchParams(window.location.search);
let _id = params.get("teddyId");

//fetch data via the api => get the description product matching with each id
fetch("http://localhost:3000/api/teddies/" + _id)
    .then(response => response.json())
    .then(data =>  {
        console.log(data);
    });











