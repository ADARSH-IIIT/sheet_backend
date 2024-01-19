import express from "express"
import { signup } from "../controller/authCONTROLLER.js"




const authROUTER  = express.Router()


authROUTER.post('/signup' ,  signup)








export default authROUTER