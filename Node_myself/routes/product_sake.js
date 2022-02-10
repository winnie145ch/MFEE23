const express = require('express');
const db = require('./../modules/connect-db');
const upload = require('./../modules/upload-imgs');

const router = express.Router();

async function getListData(req, res){
    const perPage = 5;
    // 每頁幾筆
    let page = req.query.page ? parseInt(req.query.page) : 1;
    if(page<1){
        return res.redirect('/product_sake/list');
    }
    const conditions = {};
    // 傳到 ejs的條件
    let search = req.query.search ? req.query.seaech : '';
    search = search.trim();
    // 去首尾空白
    let sqlWhere = 'WHERE 1';
    if(search){
        t_sql += `AND \`pro_name\` LIKE ${db.excape('%'+search+'%')}`;
        conditions.search = search;
    }

    const output = {
        perPage,
        page,
        totalRows:0,
        totalPages:0,
        rows:[],
        conditions
    };

    const t_sql = `SELECT COUNT(1) num FROM product_sake ${sqlWhere}`;
    // return res.send(t_sql); 
    // 除錯用
    const [rs1] = await db.query(t_sql);
    const totalRows = rs1[0].num;

    if(totalRows){
        output.totalPages = Math.ceil(totalRows/perPage);
        output.totalRows = totalRows;
        if(page > output.totalPages){
            return res.redirect(`/product_sake/list?page=${output.totalPages}`);
        }

        const sql = `SELECT * FROM \`product_sake\` ${sqlWhere} ORDER BY pro_id DESC LIMIT ${perPage*(page-1)},${perPage}`;
        const [rs2] = await db.query(sql);
        rs2.forEach(el => {
            el.pro_creat_time = res.locals.toDateString(el.pro_creat_time);
        });
        output.rows = rs2;
    }
    return output;
}

router.get('/',async(req, res)=>{
    res.redirect('/product_sake/list');
})
router.get('/list',async(req, res)=>{
    res.render('product_sake/list', await getListData(req, res));
})
router.get('/api/list',async(req, res)=>{
    res.json(await getListData(req, res));
})
router.get('/add',async(req, res)=>{
    res.render('product_sake/add');
})
// multipart/form-data
router.post('/add2',upload.none(),async(req, res)=>{
    res.json(req.body);
})
// application/x-www-form-urlencoded
// application/json
router.post('/add', async (req, res)=>{

    const output = {
        success: false,
        error: ''
    };
    // const sql = "INSERT INTO product_sake SET ?";
    // const obj = {...req.body, pro_creat_time: new Date()};

    // const [result] = await db.query(sql, [obj]);
    // console.log(result);

    const sql = "INSERT INTO `product_sake`( `pro_name`, `pro_stock`, `pro_selling`, `pro_intro`, `pro_condition`, `format_id`, `pro_img`, `pro_creat_time`) VALUES(?, ?, ?, ?, ?, ?, ?, NOW())"
    const[result] = await db.query(sql, [
        req.body.pro_name,
        req.body.pro_stock,
        req.body.pro_selling,
        req.body.pro_intro,
        req.body.pro_condition,
        req.body.format_id,
        req.body.pro_img,
    ]);
    console.log(result);
    output.success = !! result.affectedRows;
    output.result = result;

    res.json(output);
});

router.get('/delete/:pro_id',async(req, res)=>{
    const sql = "DELETE FROM product_sake WHERE pro_id=?";
    const [result] = await db.query(sql, [req.params.pro_id]);
    res.redirect('/product_sake/list');
});

router.get('/edit/:pro_id', async(req, res)=>{
    const sql = "SELECT * FROM product_sake WHERE pro_id=?";
    const [rs] = await db.query(sql, [req.params.pro_id]);

    if(! rs.length){
        return res.redirect('/product_sake/list');
    }
    res.render('product_sake/edit', rs[0]);
});

router.post('/edit/:pro_id', async(req, res)=>{
    const output = {
        success: false,
        error: ''
    };
    const sql = "UPDATE `product_sake` SET ? WHERE pro_id=?";
    const [result] = await db.query(sql, [req.body, req.params.pro_id]);
    console.log(result);
    output.success = !! result.changedRows;
    output.result = result;

    res.json(output);
});

module.exports = router;