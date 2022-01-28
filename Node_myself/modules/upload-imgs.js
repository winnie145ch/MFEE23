const multer = require('multer');
const {v4 : uuidv4} = require('uuid');

const expMap={
    'image/jpeg':'.jpg',
    'image/png':'.png',
    'image/gif':'.gif'
};

const fileFilter = (req, file, cb)=>{
    cb(null,!!expMap[file.mimetype]);
};

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,__dirname+'/../public/img');
    },
    filename:(req, file, cb)=>{
        cb(null,uuidv4()+expMap[file.mimetype]);
    }
});

module.exports=multer({storage,fileFilter});