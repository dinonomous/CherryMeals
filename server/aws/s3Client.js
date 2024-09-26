const AWS = require('aws-sdk');
const {AWSACCESSKEYID,AWSSECRETACCESSKEY} = require('../config/keys')
const s3 = new AWS.S3({
    accessKeyId: AWSACCESSKEYID,
    secretAccessKey: AWSSECRETACCESSKEY,
    region: 'us-east-1' // Singapore region
});
module.exports = s3