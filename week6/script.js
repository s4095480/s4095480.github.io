// function add(a, b) {
//   let total = a + b;
//   console.log(total);
//   return total;
// }

// function subtract(a, b) {
//   let res = a - b;
//   console.log(res);
//   return res;
// }

// let a = 20;
// let b = 10;
// // let c = a + b;
// let c = add(a, b);
// // console.log(c);

// c = 40 + 56;
// console.log(c);

// c = subtract(a, b);
// console.log(c);

// a = 45;
// b = 6;
// c = a + b;
// console.log(c);

// function whatIsMyGrade(marks) {
//   if (marks > 80) {
//     console.log("you got a hd");
//   } else if (marks < 40) {
//     console.log("sorry you failed lol");
//   } else {
//     console.log("you passed");
//   }
// }

// let score = 59;
// let msg = whatIsMyGrade(score);

const topHeading = document.querySelector("header");
console.log(header);
console.log(header.textContent);
console.log(header.innerHTML);
header.innerHTM += `<h1> This is ${course} </h1>`;
console.log(header.textContent);
let course = "yes";
// topHeading.textContent = "this is my new heading";
// topHeading.style.color = "crimson";

const allParas = document.querySelectorAll("p");
console.log(allParas);
for (let i = 0; i < allParas.length; i++) {
  console.log(allParas[i].textContent);
  allParas[i].style.border = "1px solid green";
  allParas[i].style.backgroundColor = "beige";
}

const firstSubHeading = document.querySelector("h2");
console.log(firstSubHeading);
