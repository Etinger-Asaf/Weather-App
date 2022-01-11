import { Route, Routes, Navigate } from "react-router-dom";
import MainHeader from "./components/MainHeader/MainHeader";
import Home from "./components/Home/Home";
import Favorite from "./components/Favorite/Favorite";
import classes from "./App.module.css";
function App() {
  return (
    <div className={classes.app}>
      <MainHeader />
      <div className={classes.mainContainer}>
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/favorite" element={<Favorite />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
