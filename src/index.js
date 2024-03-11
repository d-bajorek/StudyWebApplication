import { style } from "./css/index.scss";
import Icon from "./assets/img/bag-seedling.png";

import { sum2 } from "./sum2";
const sum = require("./sum").sum;
console.log("Hello World");
console.log(sum(2, 3));
console.log(sum2(2, 3));

////////////////////////////////////////////

let heading = document.querySelector("#demo"),
  sumValue = sum(10, 5);
heading.innerHTML = `10 + 5 = ${sumValue}`;

////////////////////////////////////////////

let myIcon = new Image(); // odpowiednik <img>
myIcon.src = Icon;
document.querySelector("div").appendChild(myIcon);
document.querySelector("div").classList.add("change");
