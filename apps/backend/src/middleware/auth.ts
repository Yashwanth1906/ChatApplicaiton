import { prisma } from "../db";

export const auth = async(req : any, res : any, next : any) =>{
    console.log(req.user)
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

export const globalAuth = async(req : any, res : any) =>{
    try{
        console.log("Global AUth")
        console.log(req.user)
        if(req.isAuthenticated()){
            console.log("Users: ",req.user);
            const user = await prisma.user.findUnique({
                where:{
                    id : req.user.id
                },select:{
                    id : true,
                    name:true
                }
            })
            return res.json({authenticated : true,user: user})
        } else{
            res.json({authenticated: false,user: null})
        }
    } catch (e){
        console.log(e);
        return res.json({authenticated : false,user : null})
    }
}