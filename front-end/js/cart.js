/*--------------------------- CART ---------------------------*/
 
// Select the main div in the DOM with its class: "cart-card"
const cartDiv = document.getElementById("cart-card");

// Function to get products that are stored in the local storage
const local = JSON.parse(localStorage.getItem("products"));

// Creation of a DIV (in order to put each product added to the cart in its own div (line 37))
const makeProductDiv = () => {
    const productDiv = document.createElement("div"); 
    productDiv.classList.add("product-div"); 
    return productDiv;
}

// Functions for the creation of elements (image and many types of content)
const addProductImage = (src, alt, mainProductDiv) => {
    const productImage = document.createElement("IMG");
    productImage.src = src;  
    productImage.alt = alt;  
    mainProductDiv.appendChild(productImage);
}
const addProductContent = (type_element, name, mainProductDiv) =>{
    const productContent = document.createElement(type_element); 
    productContent.innerHTML = name;
    mainProductDiv.appendChild(productContent);
}


/* Display products saved in the local storage onto the cart page */

// Declaration of the totalPrices variable (which will contains the total price of products in the cart) with a value of 0  
let totalPrices = 0;
 
for (let product in local) {

    // Add a Div for each product
    let productDiv = makeProductDiv();

    // Add an image for each product
    addProductImage(local[product].image, local[product].name, productDiv);
    // Add a name for each product
    addProductContent("div", local[product].name, productDiv);
    // Add a price for each product
    addProductContent("div", local[product].price + " €", productDiv);

    // Add the productDiv to the cartDiv (main div that contains all of the productDiv) in the DOM
    cartDiv.appendChild(productDiv);

    // Push and add each price to the totalPrices variable. It is an addition that gives the total cost of the cart
    totalPrices += local[product].price;

}


/* Display total costs of the teddies in the cart */

// Select the total-costs element in the DOM (where the total will be display)
let totalCosts = document.getElementById("total-costs");

// Display the totalCosts in the HTML
totalCosts.innerHTML = "Prix total =   " + totalPrices + " €";


/* "Clear the cart" Button */ 

// Select the clear-cart-button element in the DOM 
const clearTheCartButton = document.getElementById("clear-cart-button");

// When we click on the button "clearTheCartButton" : the cart and the local storage are emptied and the page is refreshed
clearTheCartButton.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});



/*--------------------------- SUBMIT FORM ---------------------------*/


// Select the form element in the DOM
const cartForm = document.getElementById("form");

// Select each input of the form in the DOM
let firstNameInput = document.getElementById("firstName");
let lastNameInput = document.getElementById("lastName");
let addressInput = document.getElementById("address");
let cityInput = document.getElementById("city");
let emailInput = document.getElementById("email");

// Select the submit button of the form in the DOM
let orderButton = document.getElementById("order-button");

/* --- Add the "on submit" EVENT LISTENER to the form --- */ 
cartForm.addEventListener("submit", function (e) {

    // prevent the page from reloading or naviguating away
    e.preventDefault();

    // the array "purchasedProducts" will contain objects = the teddies that were purchased by the customer
    let purchasedProducts = [];

    for (let product in local) {
        purchasedProducts.push(local[product].id);
    }

    // the const "order" contains the object contact (info for the delivery) and the array products (purchased products)
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

    // Fetch data via the API, then parse the response in json format, then display the data 
    fetch("http://localhost:3000/api/teddies/order", {method: "POST", body: JSON.stringify(order), headers: {"Content-Type":"application/json"} })
        .then(response => response.json())
        .then((data) => {
            console.log(data); 
            localStorage.clear();
            localStorage.setItem("orderId", data.orderId);
            // Redirect to the order-confirmation page (once the order is validated and the order id is saved in the local storage)
            document.location.href = "order-confirmation.html";
        })
        .catch((error) => {
            alert("Il y a eu une erreur : " + error);
        });

});

  /* The BACK-END : Expects request to contain : 
  contact: {
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    email: string
  }
  products: [string] <-- array of product _id
  */