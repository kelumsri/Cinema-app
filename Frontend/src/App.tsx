import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import CardDetails from "./pages/Bookticket"; 
import Loginpage from "./pages/Loginpage";
import Admin from "./pages/Admin";
import Test from "./components/Userprofile/ProfileDropDown";
import Cookies from 'js-cookie';
import MyBooking from "./pages/MyBooking";


function App() {
  

  // console.log("app roll - ",userRole);

  const ProtectedRoute = ({ element, allowedRoles }: { element: JSX.Element, allowedRoles: string[] }) => {
    const userRole = Cookies.get("userRole") || null;
    if (!userRole) {
      return <Navigate to="/" />;
    }
    if (allowedRoles.includes(userRole)) {
      return element;
    }
    // Redirect to login page if user role doesn't match
    return <Navigate to="/" />;
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Loginpage/>}/>
          <Route path="/home" element={<ProtectedRoute element={<Home/>} allowedRoles={["USER", "ADMIN"]}/>}/>
          <Route path="/admin" element={<ProtectedRoute element={<Admin/>} allowedRoles={["ADMIN"]}/>}/>
          <Route path="/card/:id" element={<ProtectedRoute element={<CardDetails/>} allowedRoles={["USER", "ADMIN"]}/>}/>
          <Route path="/search/:id" element={<ProtectedRoute element={<CardDetails/>} allowedRoles={["USER", "ADMIN"]}/>}/>
          {/* Add a catch-all route to redirect to login page if route not found */}
          <Route path="/summary" element={<ProtectedRoute element={<MyBooking/>} allowedRoles={["USER", "ADMIN"]}/>}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
