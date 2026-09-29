const RoleBadge = ({ role }) => {
  const getClassName = () => {
    switch (role) {
      case "Admin":
        return "badge admin";

      case "Editor":
        return "badge editor";

      case "Viewer":
        return "badge viewer";

      default:
        return "badge";
    }
  };

  return (
    <span className={getClassName()}>
      {role || "Unknown"}
    </span>
  );
};

export default RoleBadge;