import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import './App.css'
import { ChartCandle } from './component/ChartCandle/ChartCandle'

function App() {
  const [count, setCount] = useState(0)
  const socket = io('http://localhost:3333/')


  useEffect(()=>{
    
    if(socket){

      socket.on('NewCandle', (msg)=>{
        console.log(msg)
      })
    }

  },[])
  return (
    <div className="App">
      
      <ChartCandle/>
    </div>
  )
}

export default App
