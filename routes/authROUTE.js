import express from "express"
import { creds_compare, signup } from "../controller/authCONTROLLER.js"




const authROUTER  = express.Router()


authROUTER.post('/signup' ,  signup)
authROUTER.post('/signin' ,  creds_compare)








export default authROUTER