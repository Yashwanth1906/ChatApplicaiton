import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

export function MessageList() {
  return (
    <ScrollArea className="flex-1 p-6">
      {[...Array(5)].map((_, i) => (
        <div key={i} className={cn(
          "max-w-[80%] mb-4 p-3 rounded-lg border",
          i % 2 === 0 
            ? "ml-auto bg-[#1a1a3a] text-[#7af3ff] border-[#3a3a5a]" 
            : "bg-[#2a2a4a] text-[#00ff9d] border-[#4a4a6a]"
        )}>
          <div className="font-semibold mb-1 text-xs">
            {i % 2 === 0 ? 'You' : 'dev_1'}
          </div>
          <div className="font-mono text-sm">
            {i % 2 === 0 
              ? 'console.log("Hello!");' 
              : 'return new Promise((resolve) => resolve("Hi!"));'}
          </div>
          <div className="text-right text-xs mt-1 text-[#4a4a6a]">13:3{i}</div>
        </div>
      ))}
    </ScrollArea>
  )
}
