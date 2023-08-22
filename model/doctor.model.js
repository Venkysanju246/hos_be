const mongoose = require('mongoose')

const doctorScehma = mongoose.Schema({
    name:String,
    image:String,
    specialization:String,
    experience:Number,
    location:String,
    slots:String,
    fee:String
})

const doctorModel = mongoose.model("doctor", doctorScehma)

module.exports = doctorModel