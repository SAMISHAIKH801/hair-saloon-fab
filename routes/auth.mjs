
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const __dirname = path.resolve();
const SECRET = process.env.SECRET || "topsecret";
import {client} from "../mongodb.mjs"
import express from "express"
import e from "express";
const router = express.Router()
const db = client.db("hairsaloon");
const col = db.collection("admin")

router.post("/adminlogin",async(req,res)=>{

    const  { password, email } = req.body
//     if (
//         !password || !email 
//    ) {
//        res.status(403);
//        res.send(`required parameters missing, 
//        example request body:
//        {
//            title: "abc post title",
//            text: "some post text"
//        } `);
//        return;
//    }
//    console.log(email, password)
//    const hashedPassword = await bcrypt.hash(password, 10);
  
//    console.log("Hashed Password:", hashedPassword);

// //   const Usermodel = await col.insertOne({
// //      email:email,
// //      password: hashedPassword,
// //    });

//     // await col.find({email:emil})
// //    console.log(Usermodel);
// //    res.status(201).json({ message: "User registered successfully." });
try {
    const data = await col.findOne(
      { email: email  },
      "email password"
    );
0
    if (!data) {
      console.log("User not found");
      return res.status(401).send( "Incorrect email or password" );
    }

    const isMatch = await bcrypt.compare(password, data.password);

    if (isMatch) {
      console.log("Password matches");

      const token = jwt.sign({
        _id: data._id,
        email: data.email,
        iat: Math.floor(Date.now() / 1000) - 30,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
    }, SECRET);

    // res.send(token);

    res.cookie('Token', token, {
        maxAge: 86_400_000,
        httpOnly: true,
        // sameSite: true,
        // secure: true
    });
    // Cookies.set("username", "john", { expires: 7, path: "/" });
      // console.log(req.cookies.Token)
      res.send("Login successful");
      return
    } else {
      console.log("Password did not match");
      return res.status(401).send("Incorrect password" );
    }
  } catch (err) {
    console.log("DB error:", err);
    res.status(500).send( "Login failed, please try later" );
  }
});

router.get("/logout",(req, res) => {

  res.cookie('Token', '', {
       maxAge: 1,
       httpOnly: true
   });

   res.send("Logout successful" );
   console.log(req.cookies)
})
  


router.get("/login",async(req,res)=>{

   res.sendFile(path.join(__dirname , "public/auth.html"))
})
export default router