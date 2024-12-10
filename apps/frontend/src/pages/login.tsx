import { Shield } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '@/constants'

interface LoginCredentials{
  phoneno : string,
  password : string
}


export default function LoginPage() {
  const [credentails,setCredentails] = useState<LoginCredentials>({
    phoneno : "",
    password : ""
  })

  const navigate = useNavigate();

  const handlePhonenoChange = (e: any) =>{
    const {value} = e.target;
    setCredentails((prev)=>({
      ...prev,
      phoneno:value
    }))
  }

  const handlePasswordChange = (e : any) =>{
    const {value} = e.target;
    setCredentails((prev)=>({
      ...prev,
      password : value
    }))
  }

  const Login = async() =>{
    await axios.post(`${BACKEND_URL}/users/signinWithEmail`,{
      phoneno : credentails.phoneno,
      password : credentails.password
    }).then((res)=>{
      console.log(res)
      // if(res.data.status === 200){
      //   navigate("/")
      // } else {
      //   alert(res.data.message)
      // }
      navigate("/")
    }).catch((e)=>{
      alert(e)
    })
  }
  
  const google = ()=>{
    window.open("http://localhost:6969/api/v1/users/signinWithGoogle",'_self');
  }
  return (
    <div className="min-h-screen  flex items-center justify-center bg-[#0a0a1f] text-[#7af3ff] font-mono">
      <div className="w-full max-w-md p-8 space-y-8 bg-[#13132b] rounded-lg border border-[#3a3a5a]">
        <div className="text-center">
          <Shield className="w-12 h-12 mx-auto text-[#00ff9d]" />
          <h2 className="mt-6 text-3xl font-bold text-[#00ff9d]">SafeChat</h2>
          <p className="mt-2 text-sm">Secure. Encrypted. Developer-friendly.</p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input 
              type="tel" 
              placeholder="Phone Number" 
              className="bg-[#1a1a3a] border-[#3a3a5a] text-[#7af3ff] placeholder-[#4a4a6a]"
              onChange={handlePhonenoChange} value={credentails.phoneno}
            />
            <Input 
              type="password" 
              placeholder="Password" 
              className="bg-[#1a1a3a] border-[#3a3a5a] text-[#7af3ff] placeholder-[#4a4a6a]"
              onChange={handlePasswordChange} value={credentails.password}
            />
          </div>
          <Button className="w-full bg-[#00ff9d] text-[#0a0a1f] hover:bg-[#00cc7a]" onClick={Login}>
            Log in
          </Button>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full border-[#3a3a5a]" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#13132b] px-2 text-[#4a4a6a]">Or continue with</span>
          </div>
        </div>
        <Button variant="outline" className="w-full border-[#3a3a5a] text-[#7af3ff] hover:bg-[#1a1a3a]" onClick={google}>
          Continue with Google
        </Button>
        <div className="text-center text-sm">
          Haven't registered?{' '}
          <Link to={""} className="font-semibold text-[#00ff9d] hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}