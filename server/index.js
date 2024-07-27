const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoute = require("./Routes/userRoute")
const chatRoute = require("./Routes/chatRoute")
const messageRoute = require("./Routes/messageRoute")
const app = express()

require('dotenv').config();

app.use(express.json())
app.use(cors())
app.use("/api/users", userRoute)
app.use("/api/chats", chatRoute)
app.use("/api/messages", messageRoute)

app.get("/baby", (req, res) =>{
    res.send("Heyyy Baby!!!")
})

const port = process.env.PORT || 2703
const uri = process.env.ATLAS_URI

try{
    app.listen(port,(req, res) =>{
        console.log(`Server running on PORT: ${port}`)
    })
} catch(error){
    console.error(`Failed to run on server PORT: ${port}`)
}
//mongoose.connect(uri, {useNewUrlParser: true, useUnifinedTopology: true,}).then(() => console.log("EWW EWW... MongoDB connection SUCCESS!!! YEOWWW")).catch((error) => console.log("MongoDb have some FUCKING problem: ",error.message))

const connectToDatabase = async () => {
    try {
      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
      console.log("EWW EWW... u have successfully connected to this F@CKING MongoDB Database!!! YEOWWW")
    } catch (error) {
      console.error("MongoDb have some F@CKING problem: ", error.message)
    }
  }
  
  connectToDatabase()