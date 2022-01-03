import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Loading } from "../Loading/Loading";
import { ProjectList } from "./ProjectList";

import { getProjects } from "../../Actions/ProjectActions";

import "../../assets/css/projects.scss";

const Projects = () => {
  const dispatch = useDispatch();
  const projectList = useSelector((state) => state.timetracker.ProjectList);
  const isloading = useSelector((state) => state.loading.isLoading);

  const getProjectsCall = useCallback(
    () => dispatch(getProjects()),
    [dispatch]
  );

  useEffect(() => {
    getProjectsCall();
  }, [dispatch, getProjectsCall]);

  return (
    <>
      {isloading ? (
        <Loading />
      ) : (
        <div className="projects-container">
          <ProjectList projectList={projectList} />
        </div>
      )}
    </>
  );
};

export { Projects };
