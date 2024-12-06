import { MessagesSquare, Users, Clock, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export function SidebarNav({changeBody} : any) {
  const navigate = useNavigate();
  const logout = async() =>{
      await axios.get("http://localhost:6969/api/v1/users/logout",{
        withCredentials:true
      }).then((res)=>{
        if(res.data.isLoggedOut){
          navigate("/signin")
        } else {
          alert("failed to logout");
        }
      })
  }
  return (
    <div className="w-20 border-r border-[#3a3a5a] flex flex-col items-center py-4 gap-6 bg-[#13132b]">
      <Button variant="ghost" className="w-12 h-12 p-0 hover:bg-[#2a2a4a] text-[#00ff9d]" onClick={()=> changeBody("chats")}>
        <MessagesSquare className="w-6 h-6" />
      </Button>
      <Button variant="ghost" className="w-12 h-12 p-0 hover:bg-[#2a2a4a] text-[#ff00a0]" onClick={() => changeBody("groups")}>
        <Users className="w-6 h-6" />
      </Button>
      <Button variant="ghost" className="w-12 h-12 p-0 hover:bg-[#2a2a4a] text-[#ffff00]" onClick={() => changeBody("status")}>
        <Clock className="w-6 h-6" />
      </Button>
      <Button variant="ghost" className="w-12 h-12 p-0 hover:bg-[#2a2a4a] text-[#00ffff]" onClick={logout}>
        <User className="w-6 h-6"/>
      </Button>
    </div>
  )
}
