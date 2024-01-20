import JWT from 'jsonwebtoken'
import USERreference from '../modals/userSCHEMA.js';

async function check_login(req , res , next){

  // console.log("someone is trying to connect" , req.cookies.logintoken);
  const SECRET = process.env.SECRET || "sdssdfrwer4"

    
    try {

        // console.log(req.cookies , "cookies stored at check login");
      if(req.cookies.logintoken== 'undefined' || req.cookies.logintoken== undefined){
         return res.json({  loginerror : true  ,mssg:"oops!! u r not logged in :("}) }


      


      const {logintoken} = req.cookies
          
      const decodedDATA = JWT.verify(logintoken , SECRET)
    
     
      const {_id } = decodedDATA

      let userdetails = await USERreference.findOne({_id})



      req.userdetails = userdetails

      
    




      next()



    } catch (error) {

        console.log("error at check login function");
        // console.log(error);
        res.json({error  :true , mssg : "internal error at backend"})
        
    }



}



export default check_login