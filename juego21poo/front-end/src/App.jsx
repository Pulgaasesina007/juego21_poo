import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home.jsx"
import GetStudents from "./pages/GetStudents"
import Login from "./pages/Login"
import {Navbar} from "./components/Navbar"
// import Register1 from "./pages/Register1.jsx"
import { Authprovider } from "./context/AuthContext.jsx"
import Register from "./pages/Register.jsx"
import FormStudents from "./pages/FormStudents.jsx"
import UserProfile from "./pages/UserProfile.jsx"
import ProtectedRoute from "./ProtectedRoute.jsx"
import { StudentProvider } from "./context/StudentContext.jsx"
import Blacjack from "./pages/Blacjack.jsx"

function App() {
  return (
   <Authprovider> 
     <StudentProvider>
      <BrowserRouter>
       <main className="container content-container mx-auto px-10 md:px-0">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route element={<ProtectedRoute/>}>
            <Route path="/students" element={<GetStudents/>}/>
            <Route path="/add-student" element={<FormStudents/>}/>
            <Route path="/juego21" element={<Blacjack/>}/>
            <Route path="/student/:id" element={<FormStudents/>} />
          </Route>
        </Routes>
       </main> 
      </BrowserRouter>
     </StudentProvider> 
   </Authprovider> 
 )
}

export default App
