let shoppingCart = [
  { name: "T-shirt", price: 20 },
  { name: "Jeans", price: 50 },
  { name: "Sneakers", price: 80 },
  { name: "Backpack", price: 30 },
];
let total = 0;
console.log(shoppingCart);
for (let i = 0; i < shoppingCart.length; i++) {
  total = total + shoppingCart[i].price;
  console.log("total so far is", total);
}
console.log("final total is", total);
let discount = 0.1;
if (total > 100) {
  let discountedPrice = (total = total * discount);
  console.log("Discounted price is", discountedPrice);
}

//variables let and const
// types of variables
// numerical veriable let a = 0 -  + - * /
// string/ text variables let name = "Name" 'name'
// ` name
// boolean variables true false let isItRaining = false;
// objects have curly brackets
// let myRecord = { name: "ak", id: 1, isLocal: false;}
// myRecord.name = ak
// arrays
// let numbers =[2,4,6,8,10];
// arrays start at 0 not 1
// numbers[2] = 6
// if condition
// for loops
