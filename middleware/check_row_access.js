import rowREFERERNCE from "../modals/ROWwiseACCESSschema.js";


export async function  check_row_access(req , res , next){

    try {

        const { sheet_id } = req.params

        const {  row_number } = req.body


        // console.log( sheet_id , content , row_number);


        const {row_wise_access} = await rowREFERERNCE.findOne( {  sheet_id : sheet_id  } ).select("-_id row_wise_access")

        // console.log(row_wise_access);

        ////////////////////////////////////////////////////////    if "anyone can edit this row"
        if( row_wise_access[row_number] == "anyone"  ){
            return next()
        }

        //////////////////////////////////////   checking whether u ca nsave data from this row or not//////////////////////////////////

        const isallowed = row_wise_access[row_number].includes(req.userdetails.email)

        if(isallowed){
            return next()
        }



        return res.json({error : true , mssg : "sorry you are not allowed to save data for this row"})




        
    } catch (error) {
        console.log("error at check row access middleware backend");
        // console.log(error);
        res.json({error : true , mssg : "internal server error at backend "})
        
        
    }




}