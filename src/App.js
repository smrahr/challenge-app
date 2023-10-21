import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Create from "./components/Create";
import Edit from "./components/Edit";
import List from "./components/List";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
