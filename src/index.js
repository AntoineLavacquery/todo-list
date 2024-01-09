import { compareAsc, format } from "date-fns";

const date = format(new Date(2014, 1, 11), "yyyy-MM-dd");

const body = document.querySelector("body");
const hello = document.createElement("p");
hello.innerText = `${date}`;
body.appendChild(hello);