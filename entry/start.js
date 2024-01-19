import server from "./server.js";






const PORT  = process.env.PORT || 8080


server.listen(PORT , ()=>{ console.log("server started at " , PORT); })
