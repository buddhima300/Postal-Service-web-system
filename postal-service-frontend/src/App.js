import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./pages/Dashboard";
import Encryption from "./pages/Encryption";
import Decryption from "./pages/Decryption";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      {/* creating the routine paths of the web application */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />}></Route>
          <Route path="/register" element={<RegisterForm />}></Route>
          <Route path="/homepage" element={<Dashboard />}></Route>
          <Route path="/encrypt" element={<Encryption />}></Route>
          <Route path="/decrypt" element={<Decryption />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>

      {/* <LoginForm /> */}
      {/* <RegisterForm /> */}
      {/* <Dashboard /> */}
      {/* <Encryption /> */}
      {/* <Decryption /> */}
    </div>
  );
}

export default App;
