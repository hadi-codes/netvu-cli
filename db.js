const url = "mongodb+srv://boi:boiboi123@cluster0-5rtck.mongodb.net/myuserdb?retryWrites=true";
const ObjectId = require('mongodb').ObjectId
const MongoClient = require('mongodb').MongoClient.connect(url, { useNewUrlParser: true })



function getLastping() {
    let list = [];
    let activeList = []
    let profiles = []
    let timestamp = '';
    let devices=[]
    return new Promise((resolve, reject) => {
        MongoClient.then((db) => {
            db.db('nLog3').collection('profiles').find().toArray().then((doc) => {

                for (i in doc) {
                    delete doc[i]._id
                    delete doc[i].firstSeen
                    delete doc[i].lastSeen
                    doc[i].status = false
                    profiles.push(doc[i])
                }


            }).then(() => {

                db.db('nLog3').collection('lastPing').find().toArray().then((doc) => {
                    timestamp = doc[0].lastPing.time
                    console.log(timestamp);
                    activeList = doc[0].lastPing.devices
                    for (i in activeList) {
                        for (x in profiles) {
                            if (profiles[x].mac === activeList[i].mac) {
                                list.push(x);
                                console.log(x);
                                list.sort(function (a, b) { return b - a })

                            } 
                        }

                    }

                    for (k in list) {
                        profiles.splice(list[k], 1)
                    }
                    for (l in activeList) {
                        profiles.push(activeList[l])
                    }

                    for (d in profiles) {
                        const sorted = {};
                        Object.keys(profiles[d]).sort().forEach(function (key) {
                            sorted[key] = profiles[d][key];
                        });
                        devices.push(sorted)
                    }
                    resolve({ timestamp: timestamp, devices: devices });



                })
            })

        })
    })
}
module.exports.getLastping = getLastping


const days = require('dayjs')
function devicesNumberTime(){
    return new Promise((resolve,reject)=>{


        let arr=[]
        MongoClient.then((db) => {
            db.db('nLog3').collection('logs').findOne({ date: '27-08-2019' }).then((doc) => {
                //  console.log(doc.logs.length)
                for (i in doc.logs) {
        
                    arr.push({timestamp:days(doc.logs[i].timestamp).format(),devices:doc.logs[i].devicesLogs.length})  
                    
                }

                resolve(arr)
            })
        })


    })
}

module.exports.devicesNumberTime=devicesNumberTime