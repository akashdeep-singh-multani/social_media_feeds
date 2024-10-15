const multer=require('multer');
const path=require('path');
const uploadsDir=path.join(__dirname, '..', 'uploads');

const storage=multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, uploadsDir);
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now()+path.extname(file.originalname));
    }
});

const upload=multer({storage:storage});

module.exports=upload;