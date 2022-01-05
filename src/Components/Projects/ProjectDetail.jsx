import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { GiUnstableProjectile } from "react-icons/gi";
import { ProjectPerformers } from "./ProjectPerformers";
import { Loading } from "../Loading/Loading";
import { getProjectDetail } from "../../Actions/ProjectActions";
import { ProjectDelete } from "./ProjectDelete";
import { FaPlusSquare } from "react-icons/fa";

const ProjectDetail = () => {
  const dispatch = useDispatch();

  const project = useSelector((state) => state.timetracker.ProjectDetail);
  const { pathname } = useLocation();

  const { is_superuser } = useSelector(
    (state) => state.timetracker.CurrentUser
  );

  const getProjectIdCall = useCallback(
    () => dispatch(getProjectDetail(pathname)),
    [dispatch, pathname]
  );

  useEffect(() => {
    getProjectIdCall();
  }, [dispatch, getProjectIdCall]);

  const isloading = useSelector((state) => state.loading.isLoading);
  return (
    <>
      {isloading ? (
        <Loading />
      ) : (
        <div className="project">
          <div className="projectId-title">
            <h1>
              {" "}
              <GiUnstableProjectile /> {project.name}{" "}
            </h1>
            {is_superuser && !!is_superuser ? (
              <ProjectDelete project={project} />
            ) : (
              <span></span>
            )}
          </div>

          <p className="project-description">{project.description}</p>
          <div className="project-performers">
            <div className="project-item">
              <h3>Performers:</h3>
              {project.performers ? (
                project.performers.map(
                  ({ username, id, user_picture, position }) => {
                    return (
                      <div key={id}>
                        <ProjectPerformers
                          user_picture={user_picture}
                          username={username}
                          position={position}
                          key={id}
                          id={id}
                          performers={project.performers}
                        />
                      </div>
                    );
                  }
                )
              ) : (
                <span></span>
              )}
            </div>
            <div className="project-item">
              <div className="project-task-title">
                <h3>Task</h3>
                <Link to="task-create">
                  <FaPlusSquare />
                </Link>
              </div>

              {project.tasks ? (
                project.tasks.map((item) => {
                  return (
                    <Link to={`/task/${item.theme}`} key={item.id}>
                      <div className="user-performers">
                        <div className="user-performers-items">
                          <p>{item.theme}</p>
                        </div>
                        <div></div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <span>no tasks</span>
              )}
            </div>
          </div>
          <div className="btn-container">
            <Link to="/projects">
              <button className="btn-blue">Back</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
export { ProjectDetail };
