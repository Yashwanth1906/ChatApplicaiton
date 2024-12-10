import { MessageBar } from "@/components/message-bar";
import { MessageList } from "@/components/message-list";
import { DMList } from "@/components/message-show";
import { MessageTopBar } from "@/components/message-top-bar";
import { SearchBar } from "@/components/search-bar";
import { SidebarNav } from "@/components/sidebar-nav";
import { TopBar } from "@/components/top-bar";
import { BACKEND_URL } from "@/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
    id : string,
    name : string
}

export default function MainScreen (){
    const navigate = useNavigate();
    const [isAuthenticated,setIsAuthenticated] : any= useState(null);
    const [user,setUser] = useState<User>({id : "",name : ""});
    const [body,setBody] = useState("groups");
    console.log(body);

    const isAuth = async()=>{
        console.log("Auth called")
        await axios.get(`${BACKEND_URL}/auth`,{
            withCredentials:true
        }).then((res)=>{
            if(res.data.authenticated === true){
                setUser(res.data.user);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        })
    }
    useEffect(()=>{
        isAuth();
    },[])

    useEffect(()=>{
        if(isAuthenticated === false){
            navigate("/signin")
        }
    },[isAuthenticated,navigate])

    if(isAuthenticated === null){
        return(
            <div>Loading</div>
        )
    }
    return(
        <div className="flex flex-col h-screen bg-[#0a0a1f] text-[#7af3ff] font-mono">
            <TopBar />
            <div className="flex flex-1 overflow-hidden">
            <SidebarNav changeBody={setBody} />
            <div className="w-80 border-r border-[#3a3a5a] bg-[#0f0f2a]">
                <SearchBar body={body}/>
                <DMList body={body} userId={user.id}/>
            </div>
            <div className="flex-1 flex flex-col bg-[#0a0a1f]">
                <MessageTopBar />
                <MessageList />
                <MessageBar />
            </div>
            </div>
        </div>
    )
    // if(isAuthenticated === false){
    //     navigate("/signin")
    // }
}