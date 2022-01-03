import { RiDashboardFill, RiProjectorLine } from "react-icons/ri";
import { Outlet, NavLink } from "react-router-dom";
import "../../assets/css/sidebar.scss";
import { GiTimeBomb } from "react-icons/gi";
import { Header } from "../Header/Header";

const SideBar = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <div className="sidebar">
        <div className="sidebar-icon">
          <GiTimeBomb />
          <span className="sidebar-text">TimeTracker</span>
        </div>
        <nav className="sidebar-nav">
          <div className="sidebar__item">
            <NavLink to="/">
              <RiDashboardFill />
              <span className="sidebar-nav-text">Dashboard</span>
            </NavLink>
          </div>
          <div className="sidebar__item">
            <NavLink to="/projects">
              <RiProjectorLine />
              <span className="sidebar-nav-text">Projects</span>
            </NavLink>
          </div>
        </nav>
      </div>

      <div className="container">
        <div className="container-wrapper">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export { SideBar };
