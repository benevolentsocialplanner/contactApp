const mongoose = require('mongoose')
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { cookie } = require('express-validator')

require('dotenv').config();

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

app.use(express.static("public"))


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