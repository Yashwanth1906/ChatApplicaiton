import { Input } from "@/components/ui/input"

export function SearchBar({body}: {body : string}) {
  return (
    <div className="p-4">
      <Input 
        placeholder={`search ${body}`}
        className="bg-[#1a1a3a] border-[#3a3a5a] text-[#7af3ff] placeholder-[#4a4a6a]"
      />
    </div>
  )
}