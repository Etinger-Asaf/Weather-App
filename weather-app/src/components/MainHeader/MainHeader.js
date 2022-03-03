import NavLinkBtn from "../MainHeader/NavLinkBtn";
import classes from "../MainHeader/MainHeader.module.css";

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <nav className={classes.navContainer}>
        <h2 className={classes.logo}>Weather App</h2>
        <ul className={classes.ulContainer}>
          <NavLinkBtn to={"/home"} display={"Home"} />
          <NavLinkBtn to={"/favorite"} display={"Favorite"} />
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
