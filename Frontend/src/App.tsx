import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Authentication } from "@/pages/auth/Authentication";
import './App.css'
import Dashboard from "./pages/dashborad/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "sonner"; // 👈 Import Toaster
import Profile from "./pages/dashborad/Profile";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Authentication />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-right" />

    </>
  )
}

export default App
