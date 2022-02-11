const bcrypt = require('bcryptjs');

let salt = bcrypt.genSaltSync(10);
let hash = bcrypt.hashSync("B4c0/\/", salt);

let password01 = bcrypt.compareSync("B4c0/\/", hash); 
let password02 = bcrypt.compareSync("not_bacon", hash); 
console.log(salt, hash)
console.log(password01,password02);

let salt02 = bcrypt.genSaltSync(12);
let hash02 = bcrypt.hashSync("B4c0/\/", salt);
console.log(salt02, hash02);