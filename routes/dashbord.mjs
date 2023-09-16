import {client} from "../mongodb.mjs"
import express from "express"
const router = express.Router()
import path from "path"
const __dirname = path.resolve()
const db = client.db("hairsaloon");
const col = db.collection("appoitment")

router.get("/dashbord",async(req,res)=>{

   res.sendFile(path.join(__dirname , "public/dashbord.html"))
})
export default router