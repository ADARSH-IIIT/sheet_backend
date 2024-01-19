


 export async function signup(req , res){


    try {

    

        const { username , email , password } = req.body



        if(  !username ||  !email   || !password  ) {  
            return res.json({error : true , mssg : "pls provide all 3 creds....."})
              }
        


        res.json({error : false , mssg : "registration done successfully"})


    } catch (error) {

        console.log("error at backend at signup controller");
        console.log(error);
        
    }





}










