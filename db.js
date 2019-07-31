const url = "mongodb+srv://boi:boiboi123@cluster0-5rtck.mongodb.net/myuserdb?retryWrites=true";
const ObjectId = require('mongodb').ObjectId
const MongoClient = require('mongodb').MongoClient.connect(url, { useNewUrlParser: true })



function lastping(){
    return new Promise((resolve,reject)=>{
        MongoClient.then((db) => {
            db.db('nLogs').collection('lastPing').findOne({ _id: new ObjectId('5d38e4d81c9d440000e906f8') }).then((doc) => {
               // console.log('lastping');
                //console.log(doc.lastPing);
               // db.close()
                resolve(doc.lastPing)
            })
        })
    })
}
module.exports.lastPing=lastping