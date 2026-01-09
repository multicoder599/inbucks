import express from "express";
const cors = require('cors');
app.use(cors()); // This allows your frontend to talk to your backend
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/send-telegram", async (req,res)=>{
  const { message } = req.body;

  try{
    await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text: message
      })
    });

    res.json({success:true});
  }catch(e){
    res.status(500).json({error:"Failed"});
  }
});

app.listen(3000,()=>console.log("Server running"));
