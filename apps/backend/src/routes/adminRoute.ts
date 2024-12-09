import express from "express"
import { prisma } from "../db";

export const adminRouter = express.Router();

adminRouter.post("/creategroup",async(req: any,res : any)=>{
    try{
        const {name,description,adminId} = req.body;
        const group = await prisma.group.create({
            data:{
                name: name,
                description : description,
                adminId : adminId
            }
        })
        res.status(200).send(group);
    }catch(e){
        console.log(e);
        res.status(505).send(e)
    }
})

adminRouter.post("/joingroup",async(req: any,res : any)=>{
    try{
        const {groupId,userId} = req.body;
        const updatedGroup = await prisma.group.update({
            where:{
                id : groupId
            },data:{
                // 
            }
        })
    } catch(e){
        console.log(e);
        res.status(500).json({success:false,err : e})
    }
})