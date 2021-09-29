/*--------------------------- CART ---------------------------*/
 
 // Select the main div with its class: "cart-card"
  const cartDiv = document.getElementById("cart-card");



//
const local = JSON.parse(localStorage.getItem("products"));

/*
const addProductDiv = (mainDiv) =>{
  const productDiv = document.createElement("div"); 
  //productDiv.classList.add("product-div"); 
  productDiv.setAttribute("id", "product-div");
  mainDiv.appendChild(productDiv);
}

const addProductImage = (src, alt, mainProductDiv) => {
  const productImage = document.createElement("IMG");
  productImage.src = src;  
  productImage.alt = alt;  
  mainProductDiv.appendChild(productImage);
}

const addProductContent = (type_element, name, mainProductDiv) =>{
  const productContent = document.createElement(type_element); 
  //productContent.appendChild(document.createTextNode(name)); 
  productContent.innerHTML = name;
  mainProductDiv.appendChild(productContent);
}


for (let product in local) {

  // Add a Div for each product
  addProductDiv(cartDiv);
  
  const eachProductDiv = document.getElementById("product-div");

  // Add an image for each product
  addProductImage(local[product].image, local[product].name, eachProductDiv);

  // Add a name for each product
  addProductContent("div", local[product].name, eachProductDiv);

  // Add a price for each product
  addProductContent("div", local[product].price , eachProductDiv);

}
*/


// Display products saved in the local storage onto the cart page

for (let product in local) {

    let productDiv = document.createElement("div");
    cartDiv.appendChild(productDiv);
    productDiv.classList.add("product-div");

    let productImage = document.createElement("IMG");
    productDiv.appendChild(productImage);
    productImage.src = local[product].image;
    productImage.alt = local[product].name;  

    let productName = document.createElement("div");
    productDiv.appendChild(productName);
    productName.innerHTML = local[product].name;

    let productPrice = document.createElement("div");
    productDiv.appendChild(productPrice);
    productPrice.classList.add("price");
    productPrice.innerHTML = local[product].price;

}

    /* Total costs of the teddies in the cart */
  
// Select the total-costs element in the DOM (where the total will be display)
let totalCosts = document.getElementById("total-costs");

// Select each price element in the DOM
const classPrice = document.querySelectorAll(".price");

// Array to contain prices of teddies in the cart
let arrayOfPrices = [];

    function totalCart () {
      let totalCosts = 0;
      for (let product in local) {
        totalCosts += local[product].price;
      }
      arrayOfPrices.push(classPrice);

      return totalCosts;
    }
    
    console.log( totalCart())



/* "Clear the cart" Button */ 
const clearTheCartButton = document.getElementById("clear-cart-button");
// When we click on the button "clearTheCartButton" : the cart and the local storage are emptied and the page is refreshed
clearTheCartButton.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});


/*--------------------------- SUBMIT FORM ---------------------------*/


/* TEST */

// Select the form element in the DOM
const cartForm = document.getElementById("form");

// Select the submit button of the form in the DOM
let orderButton = document.getElementById("order-button");

// Select each input of the form in the DOM
let firstNameInput = document.getElementById("firstName");
let lastNameInput = document.getElementById("lastName");
let addressInput = document.getElementById("address");
let cityInput = document.getElementById("city");
let emailInput = document.getElementById("email");

// the array "purchasedProducts" will contain objects = the teddies that were purchased by the customer
let purchasedProducts = [];
//purchasedProducts.push(local);

// the const "order" contains the object contact (information about the customer) and the array containing the purchased products
const order = {
  contact: {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    address: addressInput.value,
    city: cityInput.value,
    email: emailInput.value,
  },
  products: purchasedProducts,
};

// add the "on submit" event listener to the form
cartForm.addEventListener("submit", function (e) {
  //orderButton.addEventListener("submit", function (e) {
  //prevent the page from reloading or naviguating away when we submit the form
  e.preventDefault();

  fetch("http://localhost:3000/api/teddies/order", {method: "POST", body: JSON.stringify(order)})
  .then(response => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    alert("Il y a eu une erreur : " + error);
  });

});






/* !!!  PREMIERE TECHNIQUE  !!! */

/*
// On fait un lien vers le formulaire dans le DOM (Get a reference to the Form element in the DOM )    myForm => id of the form !!!
const myForm = document.getElementById("");

// add the "on submit" event listener to the form
myForm.addEventListener("submit", function (e) {
  //prevent the page from reloading or naviguating away when we submit the form
  e.preventDefault();

  // sending the data using fetch  (2 techniques!!!)

  //First technique  : we pass trough the formData using a FormData object
  const formData = new FormData(this); // this => refers to the actual form itself.  The object "new FormData" contains a pair of keys and values which match the elements in the form (ex : city, with the value that will be chosen by the user)

  fetch("http://localhost:3000/api/teddies/order", {method: "post", body: formData})
    .then(function (response) {
      return response.text();
    })
    .then (function (text) {
      console.log(text);
    })
    .catch (function (error) {
      console.error (error);
    })

});
*/

/* !!!  DEUXIEME TECHNIQUE  !!! */

/*
  //we pass through an instance of the url search params ????
  
  const myForm = document.getElementById("");

// add the "on submit" event listener to the form
myForm.addEventListener("submit", function (e) {
  //prevent the page from reloading or naviguating away when we submit the form
  e.preventDefault();
  
  const formData = new FormData(this); 
  const searchParams = new URLSearchParams(); // send the data through an url enconding strings

  for (const pair of formData) {
    searchParams.append(pair[0], pair[1]) // pair 0 = ex city and pair 1 = value
  }

  fetch("http://localhost:3000/api/teddies/order", {method: "post", body: searchParams})
  .then(function (response) {
    return response.text();
  })
  .then (function (text) {
    console.log(text);
  })
  .catch (function (error) {
    console.error (error);
  })

});
*/



/* !!!  TROISIEME TECHNIQUE  !!! */

/*
fetch("http://localhost:3000/api/teddies/order", {method: "post", body: searchParams})
.then(results => results.json())
.then(console.log);
.catch((error) => {
  alert("Il y a eu une erreur : " + error);
});

*/


/* !!!  DONNEES DU BACK END  !!! */

//Expects request to contain:
/*
contact: {
  firstName: string,
  lastName: string,
  address: string,
  city: string,
  email: string
}
products: [string] <-- array of product _id
*/