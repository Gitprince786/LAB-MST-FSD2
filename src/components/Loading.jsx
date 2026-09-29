const Loading = ({
  message = "Loading...",
  fullScreen = true,
}) => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: fullScreen ? "100vh" : "200px",
    gap: "20px",
  };

  const spinnerStyle = {
    width: "60px",
    height: "60px",
    border: "6px solid #e5e7eb",
    borderTop: "6px solid #2563eb",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

      <div style={containerStyle}>
        <div style={spinnerStyle}></div>

        <h3>{message}</h3>
      </div>
    </>
  );
};

export default Loading;