const path = require('path')
const googleCloudSettings = path.join(__dirname, 'storageconfig.json')
const {Storage} = require('@google-cloud/storage')

const storage = new Storage({
    keyFilename:googleCloudSettings,
    projectId:'inlaid-aura-274023'
})

const bucket = storage.bucket('vamplanches')

const uploadImage = (file, category,name) => new Promise((resolve, reject)=>{
    const {originalname, buffer} = file
    const blob = bucket.file(`${category}/${name}/${Date.now()+originalname.replace(/ /g,'-')}`)
    const blobStream = blob.createWriteStream({
        resumable:false
    })
    
    blobStream.on('finish',(data)=>{
        data 
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        resolve(publicUrl)    
    })
    blobStream.on('error', (err)=>{
        reject(`Unable to upload image, something went wrong: ${err}`)
    })
    .end(buffer)
})

const multer = require('multer')
const multerMiddleware = multer(
    {
     storage:multer.memoryStorage(),
     limits:{fileSize: 5*1024*1024}
    }
)

module.exports = {
    uploadImage,
    multerMiddleware
}