require('dotenv').config();
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const maxSize = 1024 * 1024 * 10; // 10MB

function fileFilter(req, file, cb){
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype){
    return cb(null,true);
  } else {
    return cb('Ошибка: только картинки!');
  }
}

aws.config.update({
  secretAccessKey: process.env.AWSSecretKey,
  accessKeyId: process.env.AWSAccessKeyId,
  region: "eu-north-1"
});


const s3 = new aws.S3();

const upload = multer({
  limits: { fileSize: maxSize },
  fileFilter: fileFilter,
  storage: multerS3({
    acl: "public-read",
    s3: s3,
    bucket: process.env.BUCKET_STORAGE,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString() + file.originalname);
    }
  })
});

module.exports.upload = upload;
