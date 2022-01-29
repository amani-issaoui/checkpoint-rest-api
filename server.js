const express= require("express")
const connectDb=require('./config/connectDb.js')
const User= require('./models/User')
const app=express()
require('dotenv').config()
connectDb()
const port=4000
app.use(express.json())
//method GET
app.get("/get",async (req,res)=>{
    try {
        const getAllUsers= await User.find()
        res.status(200).send(getAllUsers)
    } catch (error) {
        res.status(400).send(error.message)
    }

})


// Method POST
app.post("/add",async (req,res)=>{
    try {

 const newUser= new User(req.body)
  await newUser.save()

res.status(200).send({newUser,msg:"added successfuly"}) 
   
    } catch (error) {
       res.status(400).send(error.message)
        
    }
})
//method delete
app.delete("/del/:id", async(req,res)=>{
    try {
        const userDeleted= await User.deleteOne({_id:req.params.id})
        if(userDeleted.deletedCount==1){
            return res.status(200).send({msg:"user deleted successfuly"})
        }
        res.status(400).send({msg:"user already deleted"})
    } catch (error) {
        res.status(400).send(error.message)
    }
})
//method PUt 
app.put("/edit/:id", async (req,res)=>{
    const exist=  await User.findById(req.params.id)
    try {
       if(!exist){
           return res.status(400).send({msg:"verifier votre id"})
       }
        
       const editUser= await User.updateOne({_id:req.params.id},{$set:{...req.body}})
       if(editUser.modifiedCount){
        return (res.status(200).send({msg:"user modified successfuly"}))
       }
       res.status(400).send({msg:"user already modified"})
    } catch (error) {

         res.status(400).send(error.message)
    }
})



app.listen(port,(err)=>{
    err?console.log(err):console.log(`server is running at ${port}`)
})