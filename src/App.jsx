import style from "./App.module.css";
import NavBar from "./components/navBar/navBar";
import Calendar from "./components/Calendar/calendar";

function App() {
  return (
    <div className={style.container}>
      <NavBar />
      <Calendar></Calendar>
    </div>
  );
}

export default App;
