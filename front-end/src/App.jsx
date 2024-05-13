import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Explore from "./pages/Explore"
import Queue from "./pages/Queue"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/queue" element={<Queue />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<h1>404 not found</h1>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
