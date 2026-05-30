import React from 'react'

function handle(){
  alert(window.electronAPI.test())
}

const App = () => {
  return (
    <div>
      <h1>hello</h1>
      <button onClick={handle}> test krit</button>
    </div>
  )
}

export default App
