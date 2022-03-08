const jwt = require("jsonwebtoken");
let t = jwt.sign({ name: "Jonas", age: 30 }, "aaaaa");

let f = jwt.verify(t, "aaaaa");

console.log("sign", t);
console.log("verify", f);
