import mongoose from "mongoose"



const sheetSCHEMA = new mongoose.Schema({ 

    number_of_rows : {
        type : Number , 
        required : [true , "pls enter some  no of rows"] ,
    } ,

    number_of_cols : {
        type : Number , 
        required : [true , "pls enter some  no of columns"] ,
    } ,


    sheet_admin : {
        type: mongoose.Schema.Types.ObjectId, ref: "userdetail"  
    }  ,

    accessed_by : { 
          type : String ,
          required : [true , "pls provide who can see this sheet ==> anyone / only admin / [set of users] "] ,
          
     } ,

    
    accessed_people_id : {
            type : [ { type: mongoose.Schema.Types.ObjectId, ref: "userdetail" } ]
    } ,

  

    edit_able_by : { 
        type : String ,
        required : [true , "pls provide who can edit this sheet ==> anyone / only admin / [set of users] "] ,
        
   } ,

  
  edit_able_people_id : {
          type : [ { type: mongoose.Schema.Types.ObjectId, ref: "userdetail" } ]
  } 


	
}   ,  { timestamps : true }) 








const SHEETreference = new mongoose.model("sheet", sheetSCHEMA)




export default SHEETreference