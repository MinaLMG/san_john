import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import MainMenu from "./components/MainMenu";

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
