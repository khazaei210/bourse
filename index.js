const express = require('express')
const hbs = require('hbs')
let bodyParser = require('body-parser')
const main = require('./app')
const path = require('path')
const port = process.env.PORT || 3000
const app = express()
const publicDirectoryPath = path.join(__dirname, './public')
app.use(express.static(publicDirectoryPath))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())
app.set('view engine', 'hbs') 

app.get('/', (req, res)=>{
    res.render('index', { 
       
    })
})
app.post('/',async (req, res)=>{
    if (!req.body.user || !req.body.pass || !req.body.borse || !req.body.price || !req.body.number){
        res.send('Smoe Information Is not available')
        
    }else {
        await main(req.body.user, req.body.pass, req.body.borse, req.body.price, req.body.number)
        res.send("check your account one mintue later")

    }

 })

app.listen(port, ()=>{
    console.log('server is running')
})