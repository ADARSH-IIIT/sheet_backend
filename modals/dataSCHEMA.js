import mongoose from "mongoose"



const data_schema = new mongoose.Schema({ 



    sheet_id : {
        type: mongoose.Schema.Types.ObjectId, ref: "sheet"  
    } ,

   
    data : [      {   row : Number , col : Number ,  content : String         }       ]
   




	
}   ,  { timestamps : true }) 








const datasaveREFERERNCE = new mongoose.model("row_wise_access", data_schema)




export default datasaveREFERERNCE