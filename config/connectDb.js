
const mongoose=require('mongoose')
const connectdb=async()=>{
    try {
      await  mongoose.connect(`${process.env.MONGODB_URI}`)

        console.log('db succesfuly connected')
    } catch (error) {
        console.log(error)
    }
   
}
module.exports=connectdb