import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { Input } from "./ui/input";
import axios from "axios";

interface Group {
  name : string,
  description : string,
  adminId : string
}

export function DMList({body,userId} : {body:string,userId : string}) {
  const [create,setCreate] = useState<Boolean>(false);
  const [group,setGroup] = useState<Group>({
    name:"",
    description:"",
    adminId:userId
  })
  const [joinGroupId,setJoinGroupId] = useState<string>("");
  const [joinGroup,setJoinGroup] = useState<Boolean>(false);
  const [groups,setGroups] = useState<Group[]>([]);
  const createGroup = async()=>{
    try{
      await axios.post("http://localhost:6969/api/v1/admin/creategroup",{
        name : group.name,
        description : group.description,
        adminId : group.adminId
      }).then((res)=>{
        if(res.data.group){
          alert("Group Create successfully")
        } else{
          alert("Failed")
        }
      })
      
    }catch(e){
      console.log(e);
    }
  }
  const gnamechnage = (e : any) =>{
    const {value} = e.target;
    console.log(value);
    setGroup((prev)=>({
      ...prev,
      name: value
    }))
  }

  const gdescchnage = (e : any) =>{
    const {value} = e.target;
    setGroup((prev)=>({
      ...prev,
      description : value
    }))
  }

  const joinGroupSubmit = async()=>{
    try{
      await axios.post("http://localhost:6969/api/v1/admin/joingroup",{
        groupId : joinGroupId,
        userId : userId
      }).then((res)=>{
        if(res.data.success){
          alert("Joined Group")
        } else {
          alert("Failed")
        }
      })
    } catch(e){
      console.log(e);
    }
  }
  const groupCreatePopUp = () =>{
    return(
      <div>
          <label>Name: </label><Input placeholder="Enter the Group Name" onChange={gnamechnage} value={group.name}/>
          <label>Description : </label><Input placeholder="Enter the Group Description" onChange={gdescchnage} value={group.description}/>
          <button onClick={createGroup}>Create</button>
      </div>
    )
  }

  const groupJoinPopUp = () =>{
    return(
      <div>
        <label>Group Id:</label><Input placeholder="Enter the groupId" onChange={(e) => setJoinGroupId(e.target.value)} value={joinGroupId}/>
        <button onClick={joinGroupSubmit}>Join Group</button>
      </div>
    )
  }

  return (
  <>
    <div className="">
      <button onClick={()=>{setCreate(true);setJoinGroup(false)}}>Create Group</button>
      <button onClick={()=>{setJoinGroup(true); setCreate(false)}}>Join Group</button>
    </div>
    <div>
      {create && groupCreatePopUp()}
      {joinGroup && groupJoinPopUp()}
    </div>
    <ScrollArea className="h-[calc(100vh-128px)]">
      {[...Array(20)].map((_, i) => (
        <div key={i}>
          <div className={cn(
            "p-4 hover:bg-[#1a1a3a] cursor-pointer transition-colors duration-200",
            i === 0 && "bg-[#1a1a3a]"
          )}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#2a2a4a] flex items-center justify-center border border-[#3a3a5a]">
                <span className="text-xs text-[#00ff9d]">{`>_`}</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-[#00ff9d]">dev_{i + 1}</span>
                  <span className="text-xs text-[#4a4a6a]">13:37</span>
                </div>
                <div className="text-sm truncate text-[#7af3ff]">
                  const message = &quot;Hello World!&quot;;
                </div>
              </div>
            </div>
          </div>
          <Separator className="bg-[#3a3a5a]" />
        </div>
      ))}
    </ScrollArea>
  </>
  )
}

