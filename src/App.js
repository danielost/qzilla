import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/NavbarComp";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
}

export default App;
