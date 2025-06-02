import NavBar from "./components/navBar/navBar";
import Calendar from "./components/Calendar/calendar";
import { Routes, Route } from "react-router";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<NavBar />} />
      </Routes>
      <Calendar />
    </div>
  );
}
export default App;
