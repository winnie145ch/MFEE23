console.log(process.env.NODE_ENV);

require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MysqlStore = require("express-mysql-session")(session);
const moment = require("moment-timezone");
const cors = require("cors");
const multer = require("multer");
// const upload = multer({dest:'tmp_uploads/'});
// 呼叫 multer 和設定暫存目的
const upload = require(__dirname + "/modules/upload-imgs");
const fs = require("fs").promises;
const db = require("./modules/connect-db");
const sessionStore = new MysqlStore({}, db);
const app = express();
const fetch = require("node-fetch");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

app.set("view engine", "ejs");

app.use(cors());

/*
app.get('/a.html', (req, res)=>{
    res.send(`<h2>動態內容</h2><p>${Math.random()}</p>`);
});
*/

// top middleware
const corsOptions = {
  credentials: true,
  origin: function (origin, cb) {
    console.log({ origin });
    cb(null, true);
  },
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use("/joi", express.static("node_modules/joi/dist/"));

app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: "sdkfkdh984576894kjdkgjhdfkkjdfgjkfjsdfjhskAAAkdfjdsf",
    store: sessionStore,
    cookie: {
      maxAge: 1200000,
    },
  })
);

// 自訂middleware
app.use((req, res, next) => {
  res.locals.hi = "hello world ヾ(•ω•`) ";
  // res.send('blablabla');
  // 回應後，不會往下一個路由規則

  // template helper functions 樣版輔助函式
  res.locals.toDateString = (d) => moment(d).format("YYYY-MM-DD");
  res.locals.toDatetimeString = (d) => moment(d).format("YYYY-MM-DD HH:mm:ss");
  // 如果有 token 就解析(驗證)完放在 res.locals.auth
  res.locals.auth = null; // 自訂的變數, 設定有沒有身份驗證, 預設值為 null
  let auth = req.get("Authorization");
  if (auth && auth.indexOf("Bearer ") === 0) {
    auth = auth.slice(7);
    try {
      const payload = jwt.verify(auth, process.env.JWT_KEY);
      res.locals.auth = payload;
    } catch (ex) {}
  }
  next();
});

app.get("/", (req, res) => {
  res.render("home", { name: "root" });
});

app.get("/json-sales", (req, res) => {
  const sales = require("./data/sales");
  // 變成array
  console.log(sales);
  res.render("json-sales", { sales });
});

app.get("/try-qs", (req, res) => {
  res.json(req.query);
});

app.post("/try-post", (req, res) => {
  res.json(req.body);
});

app.get("/try-post-form", (req, res) => {
  res.render("try-post-form");
});
app.post("/try-post-form", (req, res) => {
  res.json("try-post-form", req.body);
});

app.post("/try-upload", upload.single("avatar"), async (req, res) => {
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

app.post("/try-uploads", upload.array("photos"), async (req, res) => {
  const result = req.files.map(({ mimetype, filename, size }) => {
    // 用()包住展開來的物件，才會視為3個東西
    return { mimtype, filename, size };
  });
  res.json(result);
});

app.get("/my-params1/:action/:id", (req, res) => {
  res.json(req.params);
});
app.get("/my-params2/:action?/:id?", (req, res) => {
  res.json(req.params);
});
app.get("/my-params3/*/*?", (req, res) => {
  res.json(req.params);
});
app.get(["/xxx", "/yyy"], (req, res) => {
  res.json({ x: "y", url: req.url });
});

app.get(/^\/m\/09\d{2}-?\d{3}-?\d{3}$/i, (rep, res) => {
  let u = req.url.split("?")[0];
  u = u.slice(3);
  u = u.replaceAll(/-/, "");
  res.json({ mobile: u });
});

app.use("/admin2", require("./routes/admin2"));
app.use("/product_sake", require("./routes/product_sake"));

app.get("/try-session", (req, res) => {
  req.session.my_var = req.session.my_var || 0;
  req.session.my_var++;
  res.json(req.session);
});

app.get("/try-moment", (req, res) => {
  const fm = "YYYY-MM-DD HH:mm:ss";
  res.json({
    mo1: moment().format(fm),
    mo2: moment().tz("Europe/London").format(fm),
    mo3: moment(req.session.cookie.expires).format(fm),
    mo4: moment(req.session.cookie.expires).tz("Europe/London").format(fm),
  });
});

app.get("/try-db", async (req, res) => {
  const sql = "SELECT * FROM product_sake LIMIT 5";

  const [rs, fields] = await db.query(sql);

  res.json(rs);
});

app.get("/yahoo", async (req, res) => {
  fetch("http://tw.yahoo.com/")
    .then((r) => r.text())
    .then((txt) => {
      res.send(txt);
    });
});
app.get("/yahoo2", async (req, res) => {
  const response = await axios.get("https://tw.yahoo.com/");
  console.log(response);
  res.send(response.data);
});

// 登入的表單
app.get("/login", async (req, res) => {
  res.render("login");
});
// 檢查帳密
app.post("/login", async (req, res) => {
  const output = {
    success: false,
    error: "",
    info: null,
    token: "",
    code: 0,
  };
  const [rs] = await db.query("SELECT * FROM admins WHERE account=?", [
    req.body.account,
  ]);

  if (!rs.length) {
    output.error = "密碼錯誤";
    output.code = 401;
    return res.json(output);
  }
  const row = rs[0];

  const compareResult = await bcrypt.compare(req.body.password, row.password);
  if (!compareResult) {
    output.error = "帳密錯誤";
    output.code = 402;
    return res.json(output);
  }
  const { sid, account, avatar, nickname } = row;
  output.success = true;
  output.info = { account, avatar, nickname };

  output.token = jwt.sign({ sid, account }, process.env.JWT_KEY);
  res.json(output);
});

// ********** 所有路由的後面
app.use((req, res) => {
  res.status(404).send(`<h2>走錯路了</h2>`);
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server: started: ${port}-`, new Date());
});
