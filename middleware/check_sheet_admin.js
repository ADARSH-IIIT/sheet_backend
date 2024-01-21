



////// this function will check whether logged in user is admin of selected sheet or not

import SHEETreference from "../modals/sheetSCHEMA.js";


export async function check_sheet_admin(req , res , next){


    try {

        const {sheet_id} = req.params

        const sheet_details = await SHEETreference.findOne({ _id : sheet_id        }).populate("sheet_admin").select("sheet_admin -_id")

        const user_id = sheet_details.sheet_admin._id


  
       

        if(   user_id.equals(req.userdetails._id)    ){ return next() }

        return res.json({error : true  , mssg : "you are not admin of this sheet"})

        // console.log(sheet_details);





        
    } catch (error) {


        console.log("error at check sheet admin");
            // console.log(error );
            res.json({error : true ,  mssg : "internal server error at backend"})       
    }





}