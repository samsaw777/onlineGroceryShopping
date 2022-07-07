// Items dummy api.
const groceryItemsList = [
  {
    itemName: "Milk",
    price: 200,
    itemQuantity: 1,
    url: "Images/milk.png",
  },
  {
    itemName: "Grap",
    price: 300,
    itemQuantity: 1,
    url: "Images/graps.png",
  },
  {
    itemName: "Apple",
    price: 100,
    itemQuantity: 1,
    url: "Images/apple.png",
  },
  {
    itemName: "Butter",
    price: 900,
    itemQuantity: 1,
    url: "Images/butter.png",
  },
];

//creating the cart items class.
class CartItems {
  constructor(itemImage, itemName, itemPrice, itemQuantity) {
    this.itemImage = itemImage;
    this.itemName = itemName;
    this.itemPrice = itemPrice;
    this.itemQuantity = itemQuantity;
  }
}

//Local storage class will go here.
class LocalStorage {
  static getCartItems() {
    let items;

    // check if LocalStorage is empty or not.
    if (localStorage.getItem("cartItems") == null) {
      items = [];
    } else {
      items = JSON.parse(localStorage.getItems("cartItems"));
    }

    return items;
  }

  static setCartItems(item) {
    const cartItems = LocalStorage.getCartItems();

    cartItems.push(item);

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
}

// get the elements using ID.
const groceryItems = document.getElementById("groceryItems");
const cartButton = document.getElementById("cartToggleButton");
const cartDisplaySection = document.getElementById("cartDisplay");

//Toggle add to cart section.
cartButton.addEventListener("click", () => {
  cartDisplaySection.classList.toggle("hidden");
});

// display the list on the load up.
const displayGroceryItems = () => {
  groceryItemsList.forEach((item, index) => {
    groceryItems.innerHTML += `<div class="flex flex-col broder border-2 border-gray-200">
        <img src="${item.url}" class="object-fit h-72 w-full p-10 bg-gray-200 itemImage"/>
        <div class="flex flex-col gap-2 items-center py-5">
            <div class="text-2xl font-bold name">${item.itemName}</div>
            <div class="text-green-500 font-bold text-xl price">Rs. ${item.price}</div>
        </div>
        <div class="flex gap-4 justify-between px-10 pb-5">
        <div class="flex justify-between gap-4 px-5 items-center">
            <button class="decrementButton px-4 font-bold py-1 bg-gray-100">-</button>
            <div class="quantity">${item.itemQuantity}</div>
            <button class="incrementButton px-4 font-bold py-1 bg-gray-100">+</button>
        </div>
        <button class="px-5 py-3 bg-yellow-100 addToCartButton"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg></button>
        </div>
      </div>`;
  });

  //increment quantity function.
  function incrementQuantity(quantity) {
    quantity++;
    return quantity;
  }

  //decrement quantity function.
  function decrementQuantity(quantity) {
    quantity--;
    return quantity;
  }

  const incrementQuantityButton =
    document.getElementsByClassName("incrementButton");

  const decrementQuantityButton =
    document.getElementsByClassName("decrementButton");

  const addToCartButton = document.getElementsByClassName("addToCartButton");
  const itemPrice = document.getElementsByClassName("price");
  const itemName = document.getElementsByClassName("name");
  const itemQuantity = document.getElementsByClassName("quantity");
  const itemImage = document.getElementsByClassName("itemImage");

  //looping through the increment buttons in the API.
  for (
    let quantity = 0;
    quantity < incrementQuantityButton.length;
    quantity++
  ) {
    incrementQuantityButton[quantity].addEventListener("click", () => {
      const modifiedQuantity = incrementQuantity(
        parseInt(
          incrementQuantityButton[quantity].previousElementSibling.textContent
        )
      );
      incrementQuantityButton[quantity].previousElementSibling.textContent =
        modifiedQuantity;
    });
  }

  //looping through the decrement buttons in the API.
  for (
    let quantityDec = 0;
    quantityDec < decrementQuantityButton.length;
    quantityDec++
  ) {
    decrementQuantityButton[quantityDec].addEventListener("click", () => {
      const modifiedQuantity = decrementQuantity(
        parseInt(
          decrementQuantityButton[quantityDec].nextElementSibling.textContent
        )
      );

      //check if the quantity is not less than equal to 0.
      if (modifiedQuantity <= 0) {
        decrementQuantityButton[quantityDec].nextElementSibling.textContent = 1;
      } else {
        decrementQuantityButton[quantityDec].nextElementSibling.textContent =
          modifiedQuantity;
      }
    });
  }

  //adding items to the carts.
  for (let addToCart = 0; addToCart < addToCartButton.length; addToCart++) {
    addToCartButton[addToCart].addEventListener("click", () => {
      const image = itemImage[addToCart].src;
      const name = itemName[addToCart].textContent;
      const quantity = parseInt(itemQuantity[addToCart].textContent);
      const price = parseInt(
        itemPrice[addToCart].textContent.replace("Rs.", "")
      );

      const newCartItem = new CartItems(image, name, price, quantity);
      LocalStorage.setCartItems(newCartItem);
    });
  }
};

displayGroceryItems();

const item = LocalStorage.getCartItems();
console.log(item);
