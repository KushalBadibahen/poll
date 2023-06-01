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
    // console.log(req.body)
   
    try{
        try{
            const newUser = new User(req.body);
            await newUser.save();
        }catch(err){
            res.status(500).json({message: "Old User"});
        }
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
      
        res.status(200).json(counts);
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

app.listen(8080, () => console.log("Backend server is running"));
