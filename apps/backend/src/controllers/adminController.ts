import { prisma } from "../db";


export const createGroup = async(req: any,res : any)=>{
    try{
        const {name,description} = req.body;
        console.log("Create Group user :",req.user)
        await prisma.$transaction(async(tx)=>{
            const group = await tx.group.create({
                data:{
                    name: name,
                    description : description
                }
            })
            const adminAdd = await tx.groupAdmin.create({
                data:{
                    userId : req.user.id,
                    groupId : group.id
                }
            })
            const userAdd = await tx.userGroups.create({
                data:{
                    userId : req.user.id,
                    groupId : group.id
                }
            })
            res.status(200).send(group);
        })
    }catch(e){
        console.log(e);
        res.status(505).send(e);
    }
}

export const joinGroup = async(req: any,res : any)=>{
    try{
        const {groupId,userId} = req.body;
        const updateUser = await prisma.userGroups.create({
            data:{
                userId : userId,
                groupId : groupId
            }
        })
        res.status(200).json({success:true,message:"Joined the group successfully"})
    } catch(e){
        console.log(e);
        res.status(500).json({success:false,err : e})
    }
}