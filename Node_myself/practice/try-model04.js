const Product = require('../models/Product');


let p4
(async ()=>{
    p4 = await Product.findOne();

    console.log(await p4.remove());

    process.exit();
})()
