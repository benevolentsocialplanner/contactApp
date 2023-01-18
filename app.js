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

app.use(express.static(path.join(__dirname,'/views')))
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());


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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) // support json encoded bodies



//routes
const userRoutes = require('./routes/users.js')
app.use('/api',userRoutes)
const contactRoutes = require('./routes/contacts.js')
app.use('/contacts',contactRoutes)
const port = process.env.PORT || 8000

//SERVER SETUP
app.listen(port, ()=>{
    console.log(`port : ${port}`)
})