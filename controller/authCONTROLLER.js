import USERreference from "../modals/userSCHEMA.js";
import bcrypt from 'bcrypt'

import validator from "validator";

import JWT from 'jsonwebtoken'





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 export async function signup(req , res){



    const SECRET = process.env.SECRET || "sdssdfrwer4"

    try {

    
////////////////////////////////////////////////////////////  destructuring///////////////////////////////
        const { username , email , password } = req.body



        if(  !username ||  !email   || !password  ) {  
            return res.json({error : true , mssg : "pls provide all 3 creds....."}) 
        }
//////////////////////////////////////////////////////////  validation starts here //////////////////////


        let validation_error = []
        if(username.length<4){ validation_error.push("length of username should be more than 4 ")    }   
        if(password.length<8){  validation_error.push("length of password should be greater than 8")    }   
        if( !(validator.isEmail(email)) ){ validation_error.push("invalid email address")}

        if(validation_error.length!=0){
            return res.json({ error : true , mssg : validation_error })
        }


 ////////////////////////////////////////////////////////   input validation ends here /////////////////////////////////////       


        const hashedpassword = await  bcrypt.hash(req.body.password , 10)
        req.body.password = undefined
    

  ///////////////////////////////////////////////////   password hashing done //////////////////////////////////////////////////

        const saver = await USERreference.create({ username , email , password : hashedpassword    })      


        // res.json({error : false , mssg : "registration done successfully"})
///////////////////////////////////////////////////////////////////    user info has been saved to db successfully ////////////////




/////////////////////////////////////////   now we are going to set token in frontend /////////////////////////////////////////////////

let userdetails = await USERreference.findOne({ username })

// creating login token 
const logintoken = JWT.sign( {_id : userdetails._id  } , SECRET , {expiresIn : '24h'}    )


//writing cookie details
const cookieoption = {  httpOnly : true , maxAge : 1*60*60*24*1000 , secure : true , sameSite : "None"}


// setting token and cookie details to cookie in frontend
res.cookie( "logintoken" , logintoken  , cookieoption  )


res.json({  error : false     ,  mssg:`u r welcome ${userdetails.username}`})











    } catch (error) {

        console.log("error at backend at signup controller");
        // console.log(error);


        //////////////////////////////////////    duplicate user issue olved here /////////////////////////////////////////
        if(error.code==11000){ 
            if(error.keyValue.email){ return res.json({error : true , mssg : "user exist with this mail id"}) }
            if(error.keyValue.username){ return res.json({error : true , mssg : "pls enter some unique username"}) }
         }
 
         ////////////////////////////////////////////////////////////////////////////////////////////////////////////////



        res.json({error : true , mssg : "some internal error at server"})
        
    }





}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






export async function signin(req , res){

    try {

        const SECRET = process.env.SECRET || "sdssdfrwer4"


        ////////////////////////////////////////////////////////////  destructuring///////////////////////////////
        const {  email , password } = req.body



        if(    !email   || !password  ) {  
            return res.json({error : true , mssg : "pls provide all 2 creds....."}) 
        }
//////////////////////////////////////////////////////////  validation starts here //////////////////////

       

//////////////////////////////////////////////////////////////////////  findiing user in db with that mail id///////////////////////
        const userdetails = await USERreference.findOne({email}).select("+password")
        // console.log(userdetails);
        if(!userdetails){
            return res.json({error : false , mssg : "invalid creds........"})
        }


        //////////////////////////////////////////////////    comparing hashed and entered password using bcrypt.compare
        if(  !await bcrypt.compare( password , userdetails.password )  ){ 
            return res.json({  error : true   , mssg :  "invalid creds......."})
         }



//////////////////////////      SOCKET KI HELP SE 2 STEP VERIFICATION KR SAKTE HAIN YAHAN ////////////////
//*
//*
//*
//*
//*

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////// setting jwt ///////////////////////////////////////////////////

// creating login token 
const logintoken = JWT.sign( {_id : userdetails._id  } , SECRET , {expiresIn : '24h'}    )


//writing cookie details
const cookieoption = {  httpOnly : true , maxAge : 1*60*60*24*1000 , secure : true , sameSite : "None"}


// setting token and cookie details to cookie in frontend
res.cookie( "logintoken" , logintoken  , cookieoption  )


res.json({  error : false     ,  mssg:`u r welcome ${userdetails.username}`})


     


        
    } catch (error) {

        console.log("error at backend at signin controller");
        // console.log(error);
        res.json({error : true , mssg : "some internal error at server"})

        
    }








}



export async function logout(req, res){

    try {
 
     res.cookie( "logintoken" , undefined  , null  )
 
     res.json({      error: false ,mssg:"logged out successfullly"})
     
    } catch (error) {
 
     res.json({       error : true  ,mssg: "internal error at server"})
 
     console.log("error at backend controller function LOGOUT");
    //  console.log(error);
     
    }
     
 
 
 
 
 
 
 
 
 }
 
 