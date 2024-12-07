import { Shield } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Link } from 'react-router-dom'

export default function LoginPage() {
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
            />
            <Input 
              type="password" 
              placeholder="Password" 
              className="bg-[#1a1a3a] border-[#3a3a5a] text-[#7af3ff] placeholder-[#4a4a6a]"
            />
          </div>
          <Button className="w-full bg-[#00ff9d] text-[#0a0a1f] hover:bg-[#00cc7a]">
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