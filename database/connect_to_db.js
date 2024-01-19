import mongoose from "mongoose";




async function connect_to_db(url){

    console.log("trying to connect to database");

    try {

      let waiter =  await mongoose.connect(url)

      console.log("succesffully connected to db at " , url);
        
    } catch (error) {
        

        console.log("error to connect to db at===> backend/database/connect_to_db.js");
    }



}


export default connect_to_db