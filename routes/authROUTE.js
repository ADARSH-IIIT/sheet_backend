import express from "express"
import {  signin, signup } from "../controller/authCONTROLLER.js"




const authROUTER  = express.Router()


authROUTER.post('/signup' ,  signup)
authROUTER.post('/signin' ,  signin)







export default authROUTER