/*--------------------------- CART ---------------------------*/
 
// Select the main div with its class: "cart-card"
const cartDiv = document.getElementById("cart-card");

//
const local = JSON.parse(localStorage.getItem("products"));


const makeProductDiv = () => {
  const productDiv = document.createElement("div"); 
  productDiv.classList.add("product-div"); 
  return productDiv;
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

/* Display products saved in the local storage onto the cart page */

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

  // 
  totalPrices += local[product].price;

}


/* Total costs of the teddies in the cart */

// Select the total-costs element in the DOM (where the total will be display)
let totalCosts = document.getElementById("total-costs");

// Display the totalCosts in the HTML
totalCosts.innerHTML = "Prix total =   " + totalPrices + " €";


/* "Clear the cart" Button */ 
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
  
  // REGEX for the email field validation 
  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // REGEX to check if a field is empty 
  //let emptyFieldRegex = /^[\s]/;

  //|| emptyFieldRegex.test(emailInput) == true 

  // Once the order button "commander" is clicked : validation of fields form before allowing the POST request to be sent
  if (
    emailRegex.test(emailInput.value) == false 
    ) {
    window.alert("La syntaxe de l'adresse email n'est pas valide.");
    e.preventDefault(); // prevent the page from reloading or naviguating away
  } else {
    // If the email adress is valid : purchased products & delivery info will be sent with the post request (details below)
  

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
      //console.log(order);

      fetch("http://localhost:3000/api/teddies/order", {method: "POST", body: JSON.stringify(order), headers: {"Content-Type":"application/json"} })
      .then(response => response.json())
      .then((data) => {
        console.log(data); 
        localStorage.clear();
        localStorage.setItem("orderId", data.orderId);
        // Redirect to the order-confirmation page (once the order is validated and the order id is saved in the local storage)
        document.location.href = "order-confirmation.html";
        //console.log(data.orderId); //numéro de commande à récupérer du back
      })
      .catch((error) => {
        alert("Il y a eu une erreur : " + error);
      });

  }

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