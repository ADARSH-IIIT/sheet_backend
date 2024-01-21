import mongoose from "mongoose"



const data_schema = new mongoose.Schema({ 



    sheet_id : {
        type: mongoose.Schema.Types.ObjectId, ref: "sheet"  
    } ,


    row_number : {
        type : Number
    }
    ,  


    content : [  {   row : Number , col : Number ,  data : String         }       ]
   




	
}   ,  { timestamps : true }) 








const datasaveREFERERNCE = new mongoose.model("cell_data", data_schema)




export default datasaveREFERERNCE