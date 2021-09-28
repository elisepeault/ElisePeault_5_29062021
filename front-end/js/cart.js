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

    /* Total prices */
  /*
    const totalCosts = document.getElementById("total-costs");

  const classPrice = document.querySelectorAll(".price");

    function totalCart () {
      let totalCosts = 0;
      for (let product in local) {
        totalCosts += local[product].price;

      }
      totalCosts.push(classPrice);
      return totalCosts;
    }
    
    console.log( totalCart())
*/


/* "Clear the cart" Button */ 
const clearTheCartButton = document.getElementById("clear-cart-button");
// When we click on the button "clearTheCartButton" : the cart and the local storage are emptied and the page is refreshed
clearTheCartButton.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});


/*--------------------------- SUBMIT FORM ---------------------------*/
/*
// On fait un lien vers le formulaire dans le DOM (Get a reference to the Form element in the DOM )    myForm => id of the form !!!
const myForm = document.getElementById("");

// add the "on submit" event listener to the form
myForm.addEventListener("submit", function (e) {
  //prevent the page from reloading or naviguating away when we submit the form
  e.preventDefault();

  // sending the data using fetch  (2 techniques!!!)
  const formData


});
*/