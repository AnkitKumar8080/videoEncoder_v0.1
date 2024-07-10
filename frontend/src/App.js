import { useContext } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import UserContext from "./context/UserContext";

function App() {
  const { user } = useContext(UserContext);
  return <div>{user ? <Home /> : <Login />}</div>;
}

export default App;
