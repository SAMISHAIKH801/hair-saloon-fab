import {client} from "../mongodb.mjs"
import express from "express"
const router = express.Router()
const db = client.db("hairsaloon");
const col = db.collection("appoitment")
router.post("/appoint",async(req,res)=>{

    const  {firstName, lastName, email, phnumber, messege } = req.body
    if (
        !firstName || !lastName 
   ) {
       res.status(403);
       res.send(`required parameters missing, 
       example request body:
       {
           title: "abc post title",
           text: "some post text"
       } `);
       return;
   }

   const insetData = await col.insertOne({
    firstName:firstName,
    lastName:lastName,
    email:email,
    phno:phnumber,
    messege:messege,
   })
   console.log(insetData)
   res.send("you appoitment submited")
})


router.get("/appoitments",async(req,res)=>{

    const cursor =  col.find({})
    const data = await cursor.toArray()
    res.send(data)
})
export default router