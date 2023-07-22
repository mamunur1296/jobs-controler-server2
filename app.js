// external emport 
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
//internal emprt
const dbconnect = require('./middleware/common/dbConnect/dbconnect');
const { notFoundHandler } = require('./middleware/common/errorHandelar/notfoundHandelar');
const { errorHandler } = require('./middleware/common/errorHandelar/defoultHandelar');
const allFileuplodes= require('./routers/allFileUploder/allFileuplodes');
const userLogin= require('./routers/login/userLogin');



// internal import
const app=express()
dotenv.config()



//DataBase Connectore 
dbconnect()



//request parcer 
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser(process.env.COOKI_SECTAT))


//Routing satep 
// app.use("/",(req,res)=>{
//     res.send("Woilcome to our would")
// })
app.use("/files",allFileuplodes)
app.use("/login",userLogin)

// 404 not found handelar
app.use(notFoundHandler) 
// defoult error handelar 
app.use(errorHandler)


app.listen(process.env.PORT ,()=> {
    console.log(`this app are raning port ${process.env.PORT}`);
})