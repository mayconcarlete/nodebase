const admin =require('firebase-admin')
const serviceAccount= require('./live.json')

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    storageBucket:"livesolutions-7666e.appspot.com"
})

let bucket = admin.storage().bucket()
module.exports = bucket