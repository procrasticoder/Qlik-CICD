import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useEffect, useState } from "react";

function SettingsPage() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.post("/api/v1/settings", {
          user_email: "ankit.mishra@lagozon.com",
        });
        setSettings(response.data.data[0]);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <>
      {settings && (
        <div>
          <h2>User Settings</h2>
          <p>Email : {settings.user_email}</p>
          <p>
            Name : {settings.first_name} {settings.last_name}
          </p>
          <p>Company ID : {settings.company_id}</p>
          <p>Company Name : {settings.comp_name}</p>
          <p>Company Type : {settings.comp_type}</p>
          <p>Company Sub Type : {settings.comp_sub_type}</p>
          <p>Country : {settings.country_name}</p>
          <p>Qlik Tenant : {settings.comp_qlik_tenant}</p>
          <p>
            Qlik API Key :{" "}
            <textarea
              name="qlik_api_key"
              id="qlik_api_key"
              value={settings.comp_qlik_api_key}
              readOnly
              style={{ maxWidth: "100%", height: "100px" }}
            ></textarea>
          </p>
        </div>
      )}
    </>
  );
}

export default SettingsPage;
