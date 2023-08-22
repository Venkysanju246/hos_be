const express   = require('express')
const UserRoute = express.Router()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const UserModel = require('../model/user.model')

UserRoute.post("/signup", (req, res)=>{
    try {
        const payload = req.body
     bcrypt.hash(payload.password, 5,async (err, hash)=>{
        if(err){
            return res.status(400).send({
                msg:"Something went wrong"
            })
        }
        payload.password = hash
        const newUser = new UserModel(payload)
        await newUser.save()
        res.status(200).send({
            msg:"Registration successful"
        })
     }) 
    } catch (error) {
        res.status(500).send({
            msg:error.message
        })
    }
    
})

UserRoute.post("/login", async(req, res)=>{
    try {
        const payload = req.body
        const userCheck = await UserModel.findOne({email: payload.email})
        if(userCheck){
            bcrypt.compare(payload.password, userCheck.password, (err, result)=>{
                if(result){
       const token = jwt.sign({userID:userCheck._id}, process.env.JWT_SECRET, {expiresIn:"5d"})
       res.status(200).send({
        msg:"Login successful",
        token : token
       })
                }else{
                    return res.status(400).send({
                        msg:"Invalid Credentials"
                    })
                }
            })
        }else{
            return res.status(400).send({
                msg:"No user Found"
            }) 
        }
    } catch (error) {
        res.status(500).send({
            msg:error.message
        })
    }
    
})


module.exports = UserRoute