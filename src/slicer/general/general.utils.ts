

export const handleBuildHistory = (prevHistory:string[],nextHistory:string)=>{
  if(!Array.isArray(prevHistory)) return ["/"]
  if (prevHistory.length>=5) prevHistory.shift()
  if(prevHistory[prevHistory.length-1]===nextHistory) return  [...prevHistory]
  return [...prevHistory,nextHistory]
}

export const handleRemoveLastEndpoint = (prevHistory:string[])=>{
  if(!Array.isArray(prevHistory)) return ["/"]
  if (prevHistory.length<1) return [...prevHistory]
  prevHistory.pop()
  return [...prevHistory]
}