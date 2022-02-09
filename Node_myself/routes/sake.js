const express = require('express');
const db = require('./../modules/connect-db');

const router = express.Router();

async function getListData(req, res){
    const perPage = 5;
    // 每頁幾筆
    let page = req.query.page ? parseInt(req.query.page) : 1;
    if(page<1){
        return res.rdirect('modules/list');
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
        totalPages:0
        rows:[],
        conditions
    };

    const t_sql = `SELECT COUNT(1) num FROM product_sake ${sqlWhere}`;
    // return res.send(t_sql); 
    // 除錯用
    const [rs1] = awaitdb.query(t_sql);
    const totalRows = rs1[0].num;

    if(totalRows){
        output.totalRows = Math.ceil(totalRows/perPage);
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
    res.render('/product_sake/add');
})
router.post('/api',async(req, res)=>{
    
})


