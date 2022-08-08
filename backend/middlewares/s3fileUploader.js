const aws = require('aws-sdk');

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const { S3Client } = require('@aws-sdk/client-s3');
const s3 = new S3Client();
const multer = require('multer');
const multerS3 = require('multer-s3');
const BUCKET = process.env.AWS_BUCKET;
const uploader = multer({
    storage: multerS3({
      s3: s3,
      bucket: BUCKET,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    })
});

module.exports = uploader;
