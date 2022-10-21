import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import MainMenu from "./components/MainMenu";
import Login from "./components/Login/Login";

function App() {
  function requ() {
    axios.get("/").then((response) => {
      if (response.status === 200) {
        console.log(response);
      } else {
      }
    });
  }

  return (
    <div className="App">
      <MainMenu></MainMenu>
    </div>
  );
}

export default App;
