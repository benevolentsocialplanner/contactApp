const mongoose = require('mongoose')
const express = require('express')
const path = require('path');
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { cookie } = require('express-validator')

require('dotenv').config();

app.set('view engine','pug')
app.set('views', path.join(__dirname, './views'))

app.use(express.static(path.join(__dirname,'/public')))

//dbc
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log("connected 2 db")
}).catch((err)=>{
    console.log('db connection failed')
    console.log(err)
})



app.use(cookieParser())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json()) // support json encoded bodies

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log(req.cookies);
    next();
  });


const viewRoutes = require('./routes/viewRoutes.js')
app.use('/', viewRoutes);
const userRoutes = require('./routes/users.js')
app.use('/api',userRoutes)
const contactRoutes = require('./routes/contacts.js')
app.use('/contacts',contactRoutes)

const port = process.env.PORT || 8000

//SERVER SETUP
app.listen(port, ()=>{
    console.log(`port : ${port}`)
})