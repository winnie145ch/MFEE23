console.log(process.env.NODE_ENV);

require ('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.set('view engine','ejs');

app.use(cors());

/*
app.get('/a.html', (req, res)=>{
    res.send(`<h2>動態內容</h2><p>${Math.random()}</p>`);
});
*/

app.use(express.static('public'));

app.get('/', cors(), (req, res) =>{
  res.render('home',{name:'Winnie'});
});

// ********** 所有路由的後面
app.use((req, res)=>{
  res.status(404).send(`<h2>走錯路了</h2>`);
});

const port = process.env.PORT || 3001;

app.listen(port, () =>{
  console.log(`server: started: ${port}-`, new Date());
});