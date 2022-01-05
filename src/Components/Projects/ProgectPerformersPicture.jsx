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
        <span></span>
      )}
    </div>
  );
};
export { ProgectPerformersPicture };
