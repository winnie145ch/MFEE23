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

app.get('/', (req, res) =>{
  res.render('home',{name:'Winnie'});
});

app.get('/json-sales',(req, res) => {
  const sales = require('./data/sales');
  // 變成array
  console.log(sales);
  res.render('json-sales',{sales});
});

app.get('/try-qs',(req,res)=>{
  res.json(req.query);
});

const urlencodeParser = express.urlencoded({extended: false});
app.post('/try-post', urlencodeParser, (req,res) => {
  res.json(req.body);
});

// ********** 所有路由的後面
app.use((req, res)=>{
  res.status(404).send(`<h2>走錯路了</h2>`);
});

const port = process.env.PORT || 3001;

app.listen(port, () =>{
  console.log(`server: started: ${port}-`, new Date());
});