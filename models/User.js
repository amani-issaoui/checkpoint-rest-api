const mongoose=require('mongoose')
const userSchema= new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        lowercase:true
    },
    age:Number,
    adress:String
})
const User=mongoose.model('User',userSchema)
module.exports=User