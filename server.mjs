import express from "express"
import cors from "cors"
import path from "path"
import jwt from 'jsonwebtoken';
import mongoose from "mongoose"
const SECRET = process.env.SECRET || "topsecret";

import cookieParser from 'cookie-parser'
import appointrouter from "./routes/appoint.mjs"
import dashbordrouter from "./routes/dashbord.mjs"
import authrouter from "./routes/auth.mjs"
const app = express()
const PORT = process.env.PORT || 5000
const __dirname = path.resolve()

app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use(appointrouter)

app.use("/",express.static(__dirname))
app.use(authrouter)

app.use((req, res, next) => {

    console.log("req.cookies: ", req.cookies.Token);

    if (!req?.cookies?.Token) {
        res.status(401).send({
            message: "include http-only credentials with every request"
        })
        return;
    }

    jwt.verify(req.cookies.Token, SECRET, function (err, decodedData) {
        if (!err) {

            console.log("decodedData: ", decodedData);

            const nowDate = new Date().getTime() / 1000;

            if (decodedData.exp < nowDate) {

                res.status(401);
                res.cookie('Token', '', {
                    maxAge: 1,
                    httpOnly: true
                });
                res.send({ message: "token expired" })

            } else {

                console.log("token approved");

                req.body.token = decodedData
                next();
            }
        } else {
            res.status(401).send("invalid token")
        }
    });
})

app.use(dashbordrouter)

app.listen(PORT , console.log(PORT))