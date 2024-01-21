import express from 'express'
import connect_to_db from '../database/connect_to_db.js'
import authROUTER from '../routes/authROUTE.js'
import sheetROUTER from '../routes/sheetROUTE.js'

import cookieParser  from 'cookie-parser'
// import sheetROUTER from '../routes/sheetROUTE.js'
const server = express()



const db_url = process.env.URL || "mongodb://127.0.0.1:27017/google_sheet"
connect_to_db(db_url)


// server.get('/' , (req , res)=>{   res.json({mssg : "route working properly"})    })

server.use(express.json())


server.use(cookieParser())

server.use(authROUTER)

server.use(sheetROUTER)



export default server