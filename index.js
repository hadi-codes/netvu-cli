const express=require('express')
const app = express()
const lastping=require('./db').lastPing
const port = process.env.PORT || 3001;




app.get('/',(req,res)=>{
    res.send('hi fam')
})







app.get('/lp',(req,res)=>{
lastping().then((lp)=>{
    res.send(lp)
})
})




























app.listen(port);
console.log(`listing on port .... ${port}`);

