import { Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function MessageBar() {
  return (
    <div className="h-24 border-t border-[#3a3a5a] p-4 bg-[#13132b]">
      <div className="bg-[#1a1a3a] rounded-lg p-2 flex items-center gap-2 border border-[#3a3a5a]">
        <Input 
          placeholder="Write a message..." 
          className="bg-transparent border-0 focus-visible:ring-0 flex-1 text-[#7af3ff] placeholder-[#4a4a6a]"
        />
        <Button size="sm" className="bg-[#00ff9d] text-[#0a0a1f] hover:bg-[#00cc7a]">
          <Send className="w-4 h-4 mr-2" />
          Send
        </Button>
      </div>
    </div>
  )
}
