import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePerformer } from "../../Actions/ProjectActions";
import { useParams } from "react-router-dom";

const ProjectPerformers = ({
  id,
  user_picture,
  username,
  position,
  performers,
}) => {
  const dispatch = useDispatch();
  const { name } = useParams();

  const { is_superuser } = useSelector(
    (state) => state.timetracker.CurrentUser
  );

  const deleteProjectPerformer = () => {
    console.log(id);
    console.log(name);
    const filterPerformers = performers.filter((item) => item.id !== id);
    const objectInArray = filterPerformers.map((a) => a.id);

    const data = {
      name: name,
      performers: objectInArray,
    };

    dispatch(deletePerformer(id, name, data));
  };

  return (
    <div className="user-performers">
      <Link to={`/users/${username}`} key={id}>
        <div className="user-performers-items">
          <img className="user-picture" src={user_picture} alt="userpicture" />
          <p className="users-username-text">{username}</p>
          <span>-</span>
          <p>{position}</p>
        </div>
      </Link>

      {is_superuser && !!is_superuser && performers.length !== 1 ? (
        <div>
          <MdOutlineDelete
            className="project-trash"
            onClick={() => deleteProjectPerformer()}
          />
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
};
export { ProjectPerformers };
