/*--------------------------- CART ---------------------------*/
 
// Select the main div in the DOM with its class : "cart-card"
const cartDiv = document.getElementById("cart-card");

// Function to get products that are stored in the local storage
const local = JSON.parse(localStorage.getItem("products"));


// Declaration of the totalPrices variable (which will contains the total price of products in the cart)
let totalPrices = 0;


// Creation of a DIV (in order to put each product added to the cart in its own div)
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


/* Display total costs of the teddies in the cart */
const displayTotalCosts = () => {
    // Select the total-costs element in the DOM (where the total will be display)
    let totalCosts = document.getElementById("total-costs");
    // Display the totalCosts in the HTML
    totalCosts.innerHTML = "Prix total =   " + totalPrices + " €";
}


/* Display products saved in the local storage onto the cart page */
const displayLSOnCart = () => {
    
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

        // Add each price to the totalPrices variable to get a total
        totalPrices += local[product].price;

        displayTotalCosts();
    }
}

displayLSOnCart();


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


// The fetch request interact with the api to send the order information (the contact object and the products array) and return and order id 
const fetchOrder = (orderData) => {
    fetch("http://localhost:3000/api/teddies/order", {method: "POST", body: JSON.stringify(orderData), headers: {"Content-Type":"application/json"} })
        .then(response => response.json())
        .then((data) => {
            localStorage.clear();
            localStorage.setItem("orderId", data.orderId);
            // Redirect to the order-confirmation page (once the order is validated and the order id is saved in the local storage)
            document.location.href = "order-confirmation.html";
        })
        .catch((error) => {
            alert("Il y a eu une erreur : " + error);
        });
}


/* --- Add the "on submit" EVENT LISTENER to the form --- */ 

cartForm.addEventListener("submit", function (e) {

    // prevent the page from reloading or naviguating away
    e.preventDefault();

    // the array "purchasedProducts" will contain objects = the teddies that were purchased by the customer
    let purchasedProducts = [];

    // Push ordered products id in an array
    for (let product in local) {
        purchasedProducts.push(local[product].id);
    }

    // the const "order" contains the object contact (info for the delivery) and the products array (purchased products)
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
    
    fetchOrder(order);

});