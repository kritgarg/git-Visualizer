import React from 'react'
import { useState } from 'react'


const App = () => {

  const [folder,setFolder]= useState("")
  const [isGitRepo , setIsGitRepo] = useState(false)

  const handleSelectfolder = async()=>{
    const result = await window.electronAPI.selectFolder()
    if(!result){
      return 
    }

    setFolder(result.path)
    setIsGitRepo(result.isGitrepo)
  }

  return (
    <div>
      <h1>Git visualizer </h1>
      <button onClick={handleSelectfolder}>select folder</button>
      <h3> selected folder : {folder}</h3>

      {folder && (<div> 
        {isGitRepo ? <h2 style={{color:"green"}}>valid Git repo</h2> : <h2 style={{color:"red"}}>not a valid Git repo</h2>}
      </div>)}
    </div>
  )
}

export default App
