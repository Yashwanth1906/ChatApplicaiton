import { MessageBar } from "@/components/message-bar";
import { MessageList } from "@/components/message-list";
import { DMList } from "@/components/message-show";
import { MessageTopBar } from "@/components/message-top-bar";
import { SearchBar } from "@/components/search-bar";
import { SidebarNav } from "@/components/sidebar-nav";
import { TopBar } from "@/components/top-bar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MainScreen (){
    const navigate = useNavigate();
    const [isAuthenticated,setIsAuthenticated] : any= useState(null);
    const [body,setBody] = useState("groups");
    console.log(body)

    useEffect(()=>{
        axios.get("http://localhost:6969/api/v1/users/isauth",{
            withCredentials:true
        }).then((res)=>{
            if(res.data.authenticated === true){
                setIsAuthenticated(true);
            } else {
                alert("Login first bth");
                setIsAuthenticated(false);
            }
        })
    })

    if(isAuthenticated === null){
        return(
            <div>Loading</div>
        )
    }

    if(isAuthenticated === true){
        return(
            <div className="flex flex-col h-screen bg-[#0a0a1f] text-[#7af3ff] font-mono">
              <TopBar />
              <div className="flex flex-1 overflow-hidden">
                <SidebarNav changeBody={setBody} />
                <div className="w-80 border-r border-[#3a3a5a] bg-[#0f0f2a]">   // this div needs to conditionally rendered according to the group or dm useState
                  <SearchBar body={body}/>
                  <DMList body={body}/>
                </div>
                <div className="flex-1 flex flex-col bg-[#0a0a1f]">
                  <MessageTopBar />
                  <MessageList />
                  <MessageBar />
                </div>
              </div>
            </div>
        )
    }
    if(isAuthenticated === false){
        navigate("/signin")
    }
}