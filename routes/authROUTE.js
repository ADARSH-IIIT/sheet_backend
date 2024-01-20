import express from "express"
import {  signin, signup , logout } from "../controller/authCONTROLLER.js"
import check_login from "../middleware/check_login.js"




const authROUTER  = express.Router()


authROUTER.post('/signup' ,  signup)
authROUTER.post('/signin' ,  signin)

authROUTER.get('/test' ,  check_login,(req , res)=>{ res.json(req.userdetails) })


authROUTER.get('/logout' ,  check_login   , logout)




export default authROUTER