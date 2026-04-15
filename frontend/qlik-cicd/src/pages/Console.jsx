import Header from "../components/Header";
import ds from "../../structure.json";
import { useEffect, useState } from "react";
import SettingsPage from "./SettingsPage";
import UsersPage from "./UsersPage";

function Console() {
  const [activeTab, setActiveTab] = useState();

  useEffect(() => {
    setActiveTab(1);
  }, []);

  return (
    <>
      <Header />
      <div style={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            gap: "10px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          {ds.data["src/pages/Console.jsx"].optionBtns.map((btn, index) =>
            btn.isActive ? (
              <div
                className={
                  btn.default
                    ? "console-option-btn active-toggle"
                    : "console-option-btn"
                }
                style={{
                  minWidth: "100px",
                  padding: "5px 10px",
                  borderRadius: "5px 5px 0px 0px",
                  cursor: "pointer",
                  textAlign: "center",
                }}
                key={index}
                onClick={(e) => {
                  setActiveTab(btn.position);
                  document
                    .querySelectorAll(".console-option-btn")
                    .forEach((el) => {
                      el.classList.remove("active-toggle");
                    });
                  e.target.classList.add("active-toggle");
                }}
              >
                {btn.name}
              </div>
            ) : (
              ""
            ),
          )}
        </div>

        <div>
          <div>
            {activeTab === 1 ? (
              <SettingsPage />
            ) : activeTab === 2 ? (
              <UsersPage />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Console;
