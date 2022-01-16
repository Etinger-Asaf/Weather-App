import { NavLink } from "react-router-dom";
import classes from "../MainHeader/MainHeader.module.css";
const NavLinkBtn = ({ to, display }) => {
  return (
    <li className={classes.liNavItem}>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? `${classes.NavLink} ${classes.active}`
            : `${classes.NavLink}`
        }
        to={to}
      >
        {display}
      </NavLink>
    </li>
  );
};

export default NavLinkBtn;
