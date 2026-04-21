import {Route,Routes} from 'react-router-dom'
import Login from './pages/auth/Login';
import HomePage from './pages/HomePage';
import Register from './pages/auth/Register';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from './components/Routes/ProtectedRoute';
import Donar from './pages/Dashboard/Donar';
import Hospital from './pages/Dashboard/Hospital';
import Organisation from './pages/Dashboard/Organisation';
import Consumer from './pages/Dashboard/Consumer';
import Donation from './pages/Dashboard/Donation';
function App(){
return (
  <div>
    <ToastContainer/>
    <Routes>   
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
       <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor"
          element={
            <ProtectedRoute>
              <Donar />
            </ProtectedRoute>
          }
        />
         <Route
          path="/hospital"
          element={
            <ProtectedRoute>
              <Hospital />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organisation"
          element={
            <ProtectedRoute>
              <Organisation/>
            </ProtectedRoute>
          }
        />
         <Route
          path="/consumer"
          element={
            <ProtectedRoute>
              <Consumer/>
            </ProtectedRoute>
          }
        />
         <Route
          path="/donation"
          element={
            <ProtectedRoute>
              <Donation/>
            </ProtectedRoute>
          }
        />
    </Routes>
  </div>
);
}
export default App;
