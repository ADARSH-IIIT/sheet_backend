import express from "express"
import {  signin, signup } from "../controller/authCONTROLLER.js"
import check_login from "../middleware/check_login.js"




const authROUTER  = express.Router()


authROUTER.post('/signup' ,  signup)
authROUTER.post('/signin' ,  signin)

authROUTER.get('/test' ,  check_login,(req , res)=>{ res.json(req.userdetails) })







export default authROUTER