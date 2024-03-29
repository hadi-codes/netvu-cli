const express=require('express')
const app = express()
const lastping=require('./db').getLastping
const port = process.env.PORT || 3001;
let devicesNumberTime=require('./db').devicesNumberTime
const getDates=require('./db').getDates


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendfile(__dirname + '/public/index.html');
});





app.get('/lp',(req,res)=>{
    
lastping().then((lp)=>{
 // console.log(lp);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(lp)
})
})

app.get('/dates',(req,res)=>{
getDates().then(doc=>{
  res.send(doc)
})
})





app.get('/nt/:date',(req,res)=>{
  devicesNumberTime(req.params.date).then((data)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(data)
  })
})





















app.listen(port);
console.log(`listing on port .... ${port}`);

