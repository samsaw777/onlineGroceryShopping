// Items dummy api.
const groceryItemsList = [
  {
    itemName: "Milk",
    price: 200,
    url: "Images/milk.png",
  },
  {
    itemName: "Grap",
    price: 200,
    url: "Images/graps.png",
  },
  {
    itemName: "Apple",
    price: 200,
    url: "Images/apple.png",
  },
  {
    itemName: "Butter",
    price: 200,
    url: "Images/butter.png",
  },
];

// get the elements using ID.
const groceryItems = document.getElementById("groceryItems");

// display the list on the load up.
const displayGroceryItems = () => {
  groceryItemsList.forEach((item, index) => {
    groceryItems.innerHTML += `<div class="itemName">${item.itemName}</div>`;
  });

  const itemName = document.getElementsByClassName("itemName");
  //   console.log(itemName);

  for (let item = 0; item < itemName.length; item++) {
    itemName[item].addEventListener("click", () => {
      console.log(`clicked ${item}th element!`);
    });
  }
};

displayGroceryItems();
