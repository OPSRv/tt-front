import { Link } from "react-router-dom";
import { GiUnstableProjectile } from "react-icons/gi";
import { MdSentimentDissatisfied } from "react-icons/md";
import { ProgectPerformersPicture } from "./ProgectPerformersPicture";
const ProjectList = ({ projectList }) => {
  return (
    <div className="projects-wrapper">
      {projectList ? (
        projectList.map(({ id, name, performers, tasks }) => {
          return (
            <Link to={name} key={id}>
              <div className="project-card">
                <GiUnstableProjectile />
                <p className="project-name">{name}</p>
                <p>Performers:</p>
                <ProgectPerformersPicture userPicture={performers} />
              </div>
            </Link>
          );
        })
      ) : (
        <span className="no-project">
          You are not assigned to any of the projects ...
          <MdSentimentDissatisfied />
        </span>
      )}
    </div>
  );
};
export { ProjectList };
