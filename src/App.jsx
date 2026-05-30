import React from 'react'
import { useState } from 'react'


const App = () => {

  const [folder,setFolder]= useState("")
  const [isGitRepo , setIsGitRepo] = useState(false)
  const [data , setData] = useState([])

  const handleSelectfolder = async()=>{
    const result = await window.electronAPI.selectFolder()
    if(!result){
      return 
    }
    console.log(result)

    setFolder(result.path)
    setIsGitRepo(result.isGitrepo)
    setData(result.commits)
  }

  return (
    <div>
      <h1>Git visualizer </h1>
      <button onClick={handleSelectfolder}>select folder</button>
      <h3> selected folder : {folder}</h3>


      {folder && (<div> 
        {isGitRepo ? <h2 style={{color:"green"}}>valid Git repo</h2> : <h2 style={{color:"red"}}>not a valid Git repo</h2>}
      </div>)}

      <p>{data.map((commit)=>(<div style={{border : "2px solid blue" , background:"black" , color:"white" , margin:"10px" , padding:"10px"}} key={commit.hash}> 
        
        <h1> commit hash : {commit.hash}</h1>
        <p> parents : {commit.parents}</p>
        <p>Author : {commit.author}</p>
        <p>Data : {commit.data}</p>
        <p>Message : {commit.message}</p>
        </div>))}</p>

    </div>
  )
}

export default App
