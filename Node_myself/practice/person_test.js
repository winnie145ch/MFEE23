const obj = require('./person');

const{Person} = require('./person');

const p2 = new obj.Person('Peter',25);
const p3 = new Person('David',30);
// 下方是抓到第3行的 {Person}

console.log(p2);
console.log(obj.f3(3));
console.log(p3);
console.log(obj.Person === Person);