import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/NavbarComp";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
}

export default App;
