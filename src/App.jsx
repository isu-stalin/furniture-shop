import React from 'react'
import MainRouters from './pages'
import NetworkStatus from './components/network-status/NetworkStatus'
import './css/global.css'

const App = () => {
  
  return (
    <div>
      <NetworkStatus/>
      <MainRouters/>
    </div>
  )
}

export default App