import { prisma } from "../db";

export const auth = async(req : any, res : any, next : any) =>{
    try{
        if(req.isAuthenticated()){
            console.log("Users: ",req.user);
            // const user = await prisma.user.findUnique({
            //     where:{
            //         id : req.user.id
            //     },select:{
            //         id : true,
            //         name:true
            //     }
            // })
            // res.json({authenticated : true,user: user})
            next();
        } else{
            res.json({authenticated: false,user: null})
        }
    } catch (e){
        console.log(e);
        next(e);
    }
}