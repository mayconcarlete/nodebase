const path = require('path')
const gcloudConfig = require('./image-uploader/google-cloud-config')
const gg = path.join(__dirname,'storageconfig.json')
//const pqp = require('./storageconfig.json')
const {Storage} = require('@google-cloud/storage')
const storage = new Storage({
    keyFilename:gg,
    projectId:'inlaid-aura-274023'
}) 

const bucket = storage.bucket('vamplanches')

 const uploadImage = (file) => new Promise((resolve, reject) => {
  console.log(`valor de gg: ${gg}`)  
  const { originalname, buffer } = file
    const blob = bucket.file(`frango/${Date.now()+originalname.replace(" ","-")}`)
    const blobStream = blob.createWriteStream({
      resumable: false
    })
    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      
      resolve(publicUrl)
    })
    .on('error', (erro) => {
      console.log(erro)
      reject(`Unable to upload image, something went wrong`)
    })
    .end(buffer)
  })
function getPublicUrl(filename){
    return `https://storage.googleapis.com/${bucket.name}/${filename}`;
}
/*
function sendUploadToGCS(req, res, next){
    if(!req.file){
        return next()
    }

    const gcsName = Date.now() + req.file.originalname
    const file = bucket.file(gcsName)

    const stream = file.createWriteStream({
        metadata:{
            contentType: req.file.mimetype
        },
        resumable:false
    })
    stream.on('error',(err)=>{
        req.file.cloudStorageError = err;
        next(err);
    })
    stream.on('finish', ()=>{
        req.file.cloudStorageObject = gcsName;
        file.makePublic().then(() => {
          req.file.cloudStoragePublicUrl = getPublicUrl(gcsName);
          next();
        });
    })
    stream.end(req.file.buffer);

}

const uploadImage = (file) => new Promise((resolve, reject) => {
    const { originalname, buffer } = file
  
    const blob = bucket.file(originalname.replace(/ /g, "_"))
    const blobStream = blob.createWriteStream({
      resumable: false
    })
    blobStream.on('finish', () => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      )
      resolve(publicUrl)
    })
    .on('error', () => {
      reject(`Unable to upload image, something went wrong`)
    })
    .end(buffer)
  })
*/
const multer = require('multer')
const multerMiddleware = multer({
    storage:multer.memoryStorage(),
    limits:{fileSize:5*1024*1024}
})

module.exports = {
    getPublicUrl,
    uploadImage,
    multerMiddleware
}