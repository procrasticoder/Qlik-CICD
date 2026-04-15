function MessageBanner({ message, type }) {
  const closeBanner = () => {
    const banner = document.getElementById("messageBanner");
    if (banner) {
      banner.remove();
    }
  };
  const bannerStyle = {
    padding: "10px",
    // margin: "10px 0",
    // borderRadius: "5px",
    color: "#fff",
    backgroundColor:
      type === "error" ? "#f44336" : type === "warning" ? "#ff9800" : "#4caf50",
    position: "fixed",
    top: "0px",
    left: "0px",
    display: "flex",
    zIndex: "1000",
    width: "100%",
  };
  return (
    <div id="messageBanner" style={bannerStyle}>
      <div>{message}</div>
      <div
        style={{ position: "absolute", right: "30px", cursor: "pointer" }}
        onClick={closeBanner}
      >
        🗙
      </div>
    </div>
  );
}

export default MessageBanner;
