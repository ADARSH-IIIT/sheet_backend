import express from 'express'
import check_login from '../middleware/check_login.js'
import { create_sheet } from '../controller/sheetCONTROLLER.js'



const sheetROUTER = express()




sheetROUTER.post( "/create/sheet"  ,   check_login    , create_sheet)





export default sheetROUTER