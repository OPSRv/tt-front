import { NavLink, useNavigate } from "react-router-dom";
import "../../assets/css/header.scss";
import { useDispatch, useSelector } from "react-redux";
import { CgLogOut } from "react-icons/cg";
import { LoadingSmall } from "../Loading/LoadingSmall";
import { outLogin } from "../../Actions/AuthActions";
import { Link } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { is_superuser } = useSelector(
    (state) => state.timetracker.CurrentUser
  );

  const { isAuthenticated } = useSelector((state) => state.timetracker);
  const currentUser = useSelector((state) => state.timetracker.CurrentUser);

  const isLogOut = () => {
    dispatch(outLogin());
    navigate("/login");
  };

  return (
    <>
      <div className="header-wrapper">
        {is_superuser && !!is_superuser ? (
          <Link to="/project-create">
            <button className="btn-blue">
              <FaPlusSquare />
              New project
            </button>
          </Link>
        ) : (
          <span></span>
        )}

        {isAuthenticated && currentUser && currentUser.username ? (
          currentUser && currentUser.username ? (
            <div className="header-user">
              <img
                className="header-userpicture"
                src={currentUser.user_picture}
                alt="user_picture"
              />
              <p className="header-text-name">{currentUser.username}</p>
              <CgLogOut onClick={() => isLogOut()} />
            </div>
          ) : (
            <div className="header-wrapper">
              <LoadingSmall />
            </div>
          )
        ) : (
          <div className="header-auth">
            <NavLink to="login">Log in</NavLink>
            <span> & </span>
            <NavLink to="signup">Sign up</NavLink>
          </div>
        )}
      </div>
    </>
  );
};

export { Header };
