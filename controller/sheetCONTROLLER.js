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







