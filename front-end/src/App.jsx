import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Explore from "./pages/Explore"
import Queue from "./pages/Queue"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Explore" element={<Explore />} />
          <Route path="Queue" element={<Queue />} />
          <Route path="*" element={<h1>404 not found</h1>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
