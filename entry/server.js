import express from 'express'

const server = express()



server.get('/' , (req , res)=>{   res.json({mssg : "route working properly"})    })





export default server