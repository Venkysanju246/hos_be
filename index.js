const express = require('express');
const app = express();
const cors = require('cors');
const connectionToDb = require('./config/connection');
const UserRoute = require('./controllers/user.controller');
const DoctorRoute = require('./controllers/doctor.controller');
app.use(cors())
app.use(express.json());

app.use("/user", UserRoute)
app.use("/doctor", DoctorRoute)

app.listen(8000, async()=>{
    try {
        await connectionToDb
         console.log("Connected to database");
        console.log("server started running");
    } catch (error) {
        console.log(error.message);
    }
   
})