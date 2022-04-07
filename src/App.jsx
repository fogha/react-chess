import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './screens/home/Home'
import Auth from './screens/auth/Auth'
import Game from './screens/game/Game'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './utils/firebase';

function App() {
  const [user, loading, error] = useAuthState(auth)
  
  if(loading) {
    return 'loading ... '
  }
  if(error) {
    return 'There was an error'
  }
  if(!user) {
    return <Auth />
  }

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/game/:id" element={<Game />} />
      </Routes>
    </Router>
  )
}

export default App