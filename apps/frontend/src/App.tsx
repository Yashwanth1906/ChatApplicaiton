import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  const google = () =>{
    window.open("http://localhost:6969/api/v1/users/signinWithGoogle",'_self');
  }

  return (
    <>
      <button onClick={google}>Sigin With google</button>
    </>
  )
}

export default App
