import { prisma } from "../db";


export const createGroup = async(req: any,res : any)=>{
    try{
        const {name,description} = req.body;
        console.log("Create Group user :",req.user)
        const result = await prisma.$transaction(async(tx)=>{
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
            // res.status(200).send(group,adminAdd,userAdd);
            return {group,adminAdd,userAdd};
        })
        return res.status(200).json({success : true, message : result})
    }catch(e){
        console.log(e);
        res.status(505).send(e);
    }
}

export const joinGroup = async (req: any, res: any) => {
    try {
        const { groupId, userId } = req.body;
        console.log("From JoinGroup Controller"+ groupId,userId)
        const result = await prisma.$transaction(async (tx) => {
            const existingMembership = await tx.userGroups.findUnique({
                where: {
                    userId_groupId: { userId, groupId }
                }
            });
            if (existingMembership) {
                throw new Error("User is already a member of this group");
            }
            const userGroup = await tx.userGroups.create({
                data: {
                    userId :userId,
                    groupId : groupId
                }
            });
            console.log(userGroup);
            return userGroup;
        });
        return res.status(200).json({ success: true, message: "Joined the group successfully", data: result });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ success: false, error: e });
    }
};
