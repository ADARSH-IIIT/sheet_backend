import mongoose from "mongoose"
import validator from 'validator'


const row_access_schema = new mongoose.Schema({ 



    sheet_id : {
        type: mongoose.Schema.Types.ObjectId, ref: "sheet"  
    } ,

   
    row_wise_access : {

        type : [   [  {String}  ]   ]

    }

   




	
}   ,  { timestamps : true }) 








const USERreference = new mongoose.model("userdetail", userSCHEMA)




export default USERreference