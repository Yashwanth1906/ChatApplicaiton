import express from "express"
import { prisma } from "../db";

export const adminRouter = express.Router();

adminRouter.post("/creategroup",async(req: any,res : any)=>{
    try{
        const {name,description,adminId} = req.body;
        // const group = await prisma.
        res.send("Summa")
    }catch(e){
        console.log(e);
        res.status(505).send(e)
    }
})