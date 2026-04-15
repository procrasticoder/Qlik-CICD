import Button from "../components/button";
import Header from "../components/Header";
import "../style/page/login.css";

function Login() {
  return (
    <>
      <Header />
      <div className="container container-bg">
        <div className="form-container">
          <div>
            <h2>Welcome to Qlik Flow</h2>
          </div>
          <form action="">
            <input
              type="email"
              placeholder="Email"
              className="input"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input"
              required
            />
            <Button label="Log In" className="btn btn-login active-btn" />
          </form>
          <div
            style={{
              margin: "auto",
              width: "fit-content",
              gap: "5px",
              display: "flex",
              margin: "35px auto 10px",
              cursor: "default",
            }}
          >
            <span>Don't have an account?</span>
            <span
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                color: "#2563eb",
              }}
              onClick={() => (window.location.href = "/register")}
            >
              Register here.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
