import Qr from "./components/Qr";
import NextPage from "./components/NextPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
    <Route path="/" element = {<Qr/>}/>
    <Route path="/next" element = {<NextPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
