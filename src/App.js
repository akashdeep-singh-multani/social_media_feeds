import logo from "./logo.svg";
import "./App.css";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

function App() {
  return (
    <div>
      <h1>Social Media Feed</h1>
      <Login />
      <Signup />
    </div>
  );
}

export default App;
