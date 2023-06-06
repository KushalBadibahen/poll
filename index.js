const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const User = require("./models/User");

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DBConnection Successfull!"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.post("/api/vote",async (req,res) =>{
   
    try{
        const newUser = new User(req.body);
        // console.log(newUser)
        await newUser.save();
        const docs = await User.aggregate([
            {
              $group: {
                _id: '$ans',
                count: { $sum: 1 }
              }
            }
          ])
      
          const counts = {};
          docs.forEach(doc => {
            counts[doc._id] = doc.count;
          });

         const length = counts.No+counts.Yes+counts.Planning
      
        res.status(200).json({...counts,length:length});
    }catch(err){
        res.status(500).json({message: err});
    }
})

app.get("/api/voterNumber",async (req,res) =>{
   
  try{
      const voters = await User.find()
      res.status(200).json({voterNumber:voters.length})
  }catch(err){
      res.status(500).json({message: err});
  }
})

app.listen(8080, () => console.log("Backend server is running"));
