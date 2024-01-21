import express from 'express'
import check_login from '../middleware/check_login.js'
import { create_sheet, row_wise_access } from '../controller/sheetCONTROLLER.js'
import { check_sheet_admin } from '../middleware/check_sheet_admin.js'



const sheetROUTER = express()




sheetROUTER.post( "/create/sheet"  ,   check_login    , create_sheet)

sheetROUTER.post( "/update/row/access/:sheet_id"  ,   check_login ,  check_sheet_admin   , row_wise_access)




export default sheetROUTER