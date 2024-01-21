import mongoose from "mongoose"



const row_access_schema = new mongoose.Schema({ 



    sheet_id : {
        type: mongoose.Schema.Types.ObjectId, ref: "sheet"  
    } ,

   
    row_wise_access : {

        type : [   [   String  ]   ]

    }

   




	
}   ,  { timestamps : true }) 








const rowREFERERNCE = new mongoose.model("row_wise_access", row_access_schema)




export default rowREFERERNCE