import { Shield } from 'lucide-react'

export function TopBar() {
  return (
    <div className="h-12 bg-[#1a1a3a] flex items-center justify-between px-4 border-b border-[#3a3a5a]">
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-[#00ff9d]" />
        <span className="font-bold text-[#00ff9d]">SafeChat</span>
      </div>
      <span className="text-xs text-[#7af3ff]">Encrypted • Secure • Developer-friendly</span>
    </div>
  )
}