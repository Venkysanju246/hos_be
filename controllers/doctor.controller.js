const express   = require('express')
const doctorModel = require('../model/doctor.model')
const DoctorRoute = express.Router()

DoctorRoute.post("/add",async (req, res)=>{

const payload = req.body
const data = await doctorModel(payload)
await data.save()

res.send({
    msg:"Appointment added successfully"
})

})

DoctorRoute.get("/appoint",async (req, res)=>{
    const data = await doctorModel.find()
    
    res.send({
        msg:data
    })
    
    })


DoctorRoute.patch("/update/:id",async (req, res)=>{
  const id = req.params.id
  const payload = req.body
  const data = await doctorModel.findByIdAndUpdate({_id : id}, payload)
  res.send({
    msg:"Appointment successfully updated"
  })
})

DoctorRoute.delete("/delete/:id",async (req, res)=>{
    const id = req.params.id

    const data = await doctorModel.findByIdAndDelete({_id : id})
    res.send({
      msg:"Appointment successfully Deleted"
    })
  })

    module.exports =  DoctorRoute