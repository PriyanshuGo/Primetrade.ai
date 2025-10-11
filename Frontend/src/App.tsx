import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Authentication } from "@/pages/auth/Authentication";
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authentication />} />
          {/* Add additional routes here */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
