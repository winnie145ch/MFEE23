console.log(process.env.NODE_ENV);

require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
// const upload = multer({dest:'tmp_uploads/'});
// 呼叫 multer 和設定暫存目的
const upload = require(__dirname + '/modules/upload-imgs');
const fs = require('fs').promises;

const app = express();

app.set('view engine','ejs');

app.use(cors());

/*
app.get('/a.html', (req, res)=>{
    res.send(`<h2>動態內容</h2><p>${Math.random()}</p>`);
});
*/

// top middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
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


app.post('/try-post', (req,res) => {
  res.json(req.body);
});

app.get('/try-post-form', (req, res)=>{
  res.render('try-post-form');
});
app.post('/try-post-form', (req, res)=>{
  res.json('try-post-form', req.body);
});

app.post('/try-upload', upload.single('avatar'), async(req,res)=>{
  // res.json(req.body);
  // res.json(req.file);
  /*const types = ['image/jpeg', 'image/png'];
  const f = req.file;
  if( f && f.originalname){
    console.log(1);
    if(types.includes(f.mimetype)){
      console.log(2);
      await fs.rename(f.path, __dirname +'/public/img/' + f.originalname);
      return res.redirect('/img/'+f.originalname);
    }
  }else{
    return res.send('檔案類型不符合');
  }
  res.send('bad');
  */
});

app.post('/try-uploads',upload.array('photos'),async(req,res)=>{
  const result = req.files.map(({mimetype,filename,size})=>{
    // 用()包住展開來的物件，才會視為3個東西
    return(mimtype,filename,size);
  })
  res.json(result);
});

// ********** 所有路由的後面
app.use((req, res)=>{
  res.status(404).send(`<h2>走錯路了</h2>`);
});

const port = process.env.PORT || 3001;

app.listen(port, () =>{
  console.log(`server: started: ${port}-`, new Date());
});