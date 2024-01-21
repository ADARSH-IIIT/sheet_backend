import rowREFERERNCE from "../modals/ROWwiseACCESSschema.js";
import SHEETreference from "../modals/sheetSCHEMA.js";




export async function create_sheet(req , res){


    //////    no of rows , no of cols , acessed by anyone , onlyadmin , [set of people]  ,  if list then provide set of people

    try {

        // console.log(req.userdetails);

    //    console.log("provide row , col , accessed_by , edit_able_by , accessed_people_email , edit_able_people_email");




        const {_id} = req.userdetails

        const {  row=5 , col=5 , accessed_by="anyone" , accessed_people_email=[]  ,  edit_able_by="anyone" , edit_able_people_email=[] } = req.body


        let enumset = [ "anyone" , "admin" , "set" ]

        if(row<=0 || col<=0){
            return res.json({error : true , mssg : "size of sheet  can never be negative"})
         }

        if(  !enumset.includes(accessed_by) || !enumset.includes(edit_able_by)    ){
            return res.json({error : true , mssg : "enum error == > provide anyone/admin/set" })
        } 

        


        const saver = await SHEETreference.create(  {    
             
            number_of_rows : row ,
            number_of_cols : col ,
            sheet_admin : _id  ,
            accessed_by : accessed_by ,
            accessed_people_email : accessed_people_email ,
            edit_able_by : edit_able_by ,
            edit_able_people_email : edit_able_people_email




            
             
          }    )


          res.json(  {error : false , mssg : "sheet created successfully" , sheet_id : saver._id  })


        





        
    } catch (error) {


        console.log("error at backend at create sheet controller");
        // console.log(error);
        res.json({error : false , mssg : "internal server error at backend"})
        
    }





}




export async function row_wise_access(req , res){


    ///// saving mails for row wise access

    try {

        const { sheet_id } = req.params
        const {   set_of_people  } = req.body

        console.log(sheet_id , set_of_people);

/////////////////////////////////////////////////////////    checking whether sheet exist or not ///////////////////////////////////////
        const sheet_details = await SHEETreference.findOne({ _id : sheet_id} )


        if(!sheet_details){
            return res.json({error : true , mssg : "no sheet exist with this id "})
        }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      



        /////////////////////     agar ek baar row eccess kr diya gaya tha iss sheet ke liye , now thius is updated data////////

        const isalreadypresent = await rowREFERERNCE.findOne({ sheet_id : sheet_id})


        
            //////////////////    saving for the first time ///////////////////////////////////////
        
        if(!isalreadypresent){

              const saver = await rowREFERERNCE.create(  {sheet_id : sheet_id ,  row_wise_access : set_of_people}     )

               console.log(saver , "saved for first time");

                  return   res.json({error : false , mssg : "row access saved successfully"})
        

        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////





///////////////////////////////////////    agar ek baar save hua hoga row access , then wo update ho jayega niche/////////////////////////
         
            const saver = await rowREFERERNCE.findOneAndUpdate( {sheet_id : sheet_id} , {row_wise_access : set_of_people }  )

            console.log(saver , "already saved tha , abhi update kr diya");
   
           return res.json({error : false , mssg : "access updated successfullyyy........"})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////        
        


    } catch (error) {

                    console.log("error at row_wise_controller backend");
                    // console.log(error);
                    res.json({error : true , mssg : "internal server error at backend "})
        
    }








}


