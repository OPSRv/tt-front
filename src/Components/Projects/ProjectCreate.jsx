import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createProject } from "../../Actions/ProjectActions";
import { getUsersList } from "../../Actions/UserActions";
// import { Loading } from "../Loading/Loading";

const Checkbox = ({
  type = "checkbox",
  name,
  checked = false,
  onChange,
  id,
}) => {
  return (
    <input
      type={type}
      name={name}
      checked={checked}
      onChange={onChange}
      className="input-checkbox"
      id={id}
    />
  );
};

const ProjectCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);

  const userList = useSelector((state) => state.timetracker.UserList);

  const [checkedItems, setCheckedItems] = useState({});

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  const filterObject = (object) => {
    Object.keys(object).forEach(function (key) {
      if (object[key] === false) {
        delete object[key];
      }
    });
    return Object.keys(object);
  };

  const handleChangeCheckbox = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  const onSendDataUs = (event) => {
    event.preventDefault();

    const getPerformersId = filterObject(checkedItems);

    let project_data = {
      name: projectName,
      description: description,
      performers: getPerformersId,
    };
    dispatch(createProject(project_data));
    navigate("/");
  };
  return (
    <div className="project-create">
      <form className="login-container" onSubmit={onSendDataUs}>
        <div className="user-checkbox-wrapper">
          <input
            onChange={(event) => setProjectName(event.target.value)}
            type="text"
            placeholder="Name project"
            autoComplete="name"
            name="name"
            required
            className="input-project"
          />
          <input
            onChange={(event) => setDescription(event.target.value)}
            type="textarea"
            placeholder="Description"
            name="description"
            required
            className="input-project"
          />
          <div className="user-grid">
            {userList.map((item) => (
              <div className="user-checkbox" key={item.id}>
                <label
                  htmlFor={item.id}
                  className={checkedItems[item.id] ? "check" : "nocheck"}
                >
                  <Checkbox
                    name={item.id}
                    checked={checkedItems[item.id]}
                    onChange={handleChangeCheckbox}
                    id={item.id}
                  />
                  <img
                    className="user-picture-small"
                    src={item.user_picture}
                    alt="userpicture"
                  />
                  <span>{item.username}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <button className="btn-save" type="submit">
          Create project
        </button>
      </form>
    </div>
  );
};
export { ProjectCreate };
