import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";
const MainHeader = () => {
  return (
    <header className={classes.header}>
      <nav className={classes.navContainer}>
        <h2>Herolo Weather Task</h2>
        <ul className={classes.ulContainer}>
          <li className={classes.liNavItem}>
            <NavLink className={classes.NavLink} to="/home">
              Home
            </NavLink>
          </li>
          <li className={classes.liNavItem}>
            <NavLink className={classes.NavLink} to="/favorite">
              Favorite
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
