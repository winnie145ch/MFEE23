const express = require('express');
const router = express.Router();

// router.get('/admin2/:p1?/:p2?',(req, res)=>{
//     res.json(req.params);
// });

router.use((req, res, next)=>{
    res.locals.hi += 'admin2';
    next();
});

router.get('/',(req, res)=>{
    res.send('admin2 root');
});

router.get('/abc',(req, res)=>{
    res.json({
        originalUrl:req.originalUrl,
        'local.hi':res.locals.hi
    });
});
router.get('/def',(req, res)=>{
    res.json({
        originalUrl:req.originalUrl,
        'local.hi':res.locals.hi
    });
});

router.get('/:p1?/:p2?', (req, res)=>{
    let{
        params,
        url,
        originalUrl,
        baseUrl,
    }=req;
    res.json({
        params,
        url,
        originalUrl,
        baseUrl,
        'local.hi':res.locals.hi
    });
});

module.exports = router;