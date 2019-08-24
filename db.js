const url = "mongodb+srv://boi:boiboi123@cluster0-5rtck.mongodb.net/myuserdb?retryWrites=true";
const ObjectId = require('mongodb').ObjectId
const MongoClient = require('mongodb').MongoClient.connect(url, { useNewUrlParser: true })



function lastping(){
    let list=[];
    let activeList=[]
    let dissctiveList=[]
    return new Promise((resolve,reject)=>{
        MongoClient.then((db) => {
            db.db('nLogs').collection('lastPing').find(({Mac:"a"}), {$all: 1, '_id': 0}).toArray().then((doc) => {
              console.log(doc);
                resolve(doc)
              

            })
        })
    })
}
module.exports.lastPing=lastping