import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export function DMList({body} : {body:string}) {
  return (
    <div>
      {/* <button onClick={create}>

      </button> */}
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
    </div>
  )
}

