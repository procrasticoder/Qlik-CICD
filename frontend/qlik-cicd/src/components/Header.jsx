import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  function navigateToLoginPage() {
    navigate("/");
  }
  return (
    <div
      style={{
        padding: "5px 20px",
        height: "50px",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <h1
        style={{ padding: "0px", margin: "0px", cursor: "default" }}
        onClick={navigateToLoginPage}
      >
        <span style={{ color: "#007bff" }}>Q</span>
        <span>Flow</span>
      </h1>
    </div>
  );
}

export default Header;
