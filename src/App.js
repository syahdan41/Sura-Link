import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import HistoryPage from "./components/HistoryPage/HistoryPage";
import Project from "./components/Project/Project";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="History" element={<HistoryPage />}></Route>
        <Route path="Project" element={<Project />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
