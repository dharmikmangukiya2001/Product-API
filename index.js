const express = require('express');
const path = require('path');
const port= process.env.prot ||8000;
const cookie = require('cookie');
const cookieParser = require('cookie-parser');
const app = express();
const morgan = require('morgan');

require('./config/db');

require('dotenv').config()
app.use(cookieParser())
app.use(morgan('dev'))
const cors= require('cors');
app.use(cors());


app.use(express.urlencoded({extended:true}));

app.use('/user',require('./router/user.router'))
app.use('/admin',require('./router/admin.router'))


app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log('app running on port',port);
})