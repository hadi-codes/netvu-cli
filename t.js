const url = "mongodb+srv://boi:boiboi123@cluster0-5rtck.mongodb.net/myuserdb?retryWrites=true";
const ObjectId = require('mongodb').ObjectId
const MongoClient = require('mongodb').MongoClient.connect(url, { useNewUrlParser: true })

MongoClient.then((db) => {
    db.db('nLogs').collection('profiles').find().toArray().then((doc) => {
        var mac=[]
        for(i in doc){
            mac.push(doc[i].mac)
        }
      console.log(mac);
      //  resolve(doc)
      

    }).then((mac)=>{
        mac.forEach(i => {
            db.db('nLogs').collection('profiles').update({'mac':i},{$unset:{logs:""}})
        });
        
    })
})