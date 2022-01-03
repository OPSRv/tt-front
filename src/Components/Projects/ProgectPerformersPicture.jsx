const ProgectPerformersPicture = ({ userPicture }) => {
  return (
    <div className="project-user-picture-wrapper">
      {userPicture.length !== 0 ? (
        userPicture.map(({ id, user_picture }) => {
          return (
            <img
              key={id}
              src={user_picture}
              alt="user_picture"
              className="project-user-picture"
            />
          );
        })
      ) : (
        <span className="no-project">
          You are not assigned to any of the projects ...
        </span>
      )}
    </div>
  );
};
export { ProgectPerformersPicture };
