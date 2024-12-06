export function MessageTopBar() {
    return (
      <div className="h-16 border-b border-[#3a3a5a] px-6 flex items-center bg-[#13132b]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#2a2a4a] flex items-center justify-center border border-[#3a3a5a]">
            <span className="text-xs text-[#00ff9d]">{`>_`}</span>
          </div>
          <span className="font-semibold text-[#00ff9d]">dev_1</span>
        </div>
      </div>
    )
  }  