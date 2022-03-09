const Product = require('./../models/Product');


const p1 = new Product({author:'david', bookname:'教你如何看一本書'});
console.log(process.env.DB_USER)
p1.save().then(r=>{
    console.log(p1);
    process.exit();
});
