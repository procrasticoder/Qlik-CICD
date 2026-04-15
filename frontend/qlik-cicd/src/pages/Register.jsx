import { useState } from "react";
import CompanyRegForm from "../components/CompanyRegForm";
import IndividualRegForm from "../components/IndividualRegForm";
import Header from "../components/Header";
import "../style/page/registration.css";

function Register() {
  const [isCompany, setIsCompany] = useState(true);
  return (
    <>
      <Header />
      <div className="container container-bg">
        <div
          style={{
            width: "400px",
            height: "fit content",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            <div
              className="registraion-toggle active-toggle"
              onClick={(e) => {
                document
                  .querySelectorAll(".registraion-toggle")
                  .forEach((el) => {
                    el.classList.remove("active-toggle");
                  });
                e.target.classList.add("active-toggle");

                setIsCompany(true);
              }}
            >
              Company
            </div>
            <div
              className="registraion-toggle"
              onClick={(e) => {
                document
                  .querySelectorAll(".registraion-toggle")
                  .forEach((el) => {
                    el.classList.remove("active-toggle");
                  });
                e.target.classList.add("active-toggle");

                setIsCompany(false);
              }}
            >
              Individual
            </div>
          </div>
          <div style={{}}>
            <h2 style={{ padding: "10px", margin: "0px" }}>
              {" "}
              {isCompany ? "Registration" : "Sing Up"}
            </h2>
            {isCompany ? <CompanyRegForm /> : <IndividualRegForm />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
