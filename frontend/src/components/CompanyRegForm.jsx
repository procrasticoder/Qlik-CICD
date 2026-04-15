import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance"
import ShortUniqueId from "short-unique-id";

const apiUrl = import.meta.env.VITE_API_URL;

function CompanyRegForm() {
  const uid = new ShortUniqueId({ length: 5 });
  const [countryList, setCountryList] = useState([]);
  const [companyType, setCompanyType] = useState([]);
  const [companySubType, setCompanySubType] = useState([]);
  const [isCompanyTypeSelected, setIsCompanyTypeSelected] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    comp_id: "",
    comp_name: "",
    comp_type: "",
    comp_sub_type: "",
    comp_country: "",
    comp_admin_email: "",
    comp_admin_password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function submitForm(e) {
    e.preventDefault();

    const comp_id = `${formData.comp_type}${formData.comp_sub_type}${formData.comp_country}${uid.rnd()}`;

    const updatedFormData = {
      ...formData,
      comp_id: comp_id,
    };

    console.log("Submitting form with data:", updatedFormData);

    try {
      // refer to dev.md file for use of this api object
      const response = await api.post("/api/v1/company/register", updatedFormData);
      console.log("Success:", response.data);
      alert("Company registered successfully");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Registration failed");
    }
  }

  function navigateToLoginPage() {
    navigate("/");
  }

  function handleCompanyTypeChange(e) {
    if (isCompanyTypeSelected === false) setIsCompanyTypeSelected(true);
    getCompanySubType(apiUrl);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function getAllCountries(apiUrl) {
      api
      .get("/api/v1/masters/getAllCountries")
      .then(function (response) {
        setCountryList(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function getCompanyType(apiUrl) {
      api
      .get("/api/v1/masters/getAllCompanyTypes")
      .then(function (response) {
        setCompanyType(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function getCompanySubType(apiUrl) {
    const selectedCompanyType = document.getElementById("compType").value;
    api
    .get(`/api/v1/masters/getAllCompanySubTypes?companyCatId=${selectedCompanyType}`)
      .then(function (response) {
        setCompanySubType(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  useEffect(() => {
    getAllCountries(apiUrl);
    getCompanyType(apiUrl);
  }, []);

  return (
    <>
      <form onSubmit={submitForm}>
        <input
          placeholder="Company Name"
          name="comp_name"
          className="input"
          onChange={handleInputChange}
          required
        />
        {/* Company Type Dropdown */}
        <select
          name="comp_type"
          id="compType"
          className="input"
          style={{ width: "100%" }}
          onChange={handleCompanyTypeChange}
        >
          <option selected disabled>
            Select Company Type
          </option>
          {companyType.map((type) => (
            <option value={type.company_cat_id} key={type.company_cat_id}>
              {type.company_cat}
            </option>
          ))}
        </select>

        {/* Company Sub Type Dropdown */}
        <select
          name="comp_sub_type"
          id="compSubType"
          className="input"
          onChange={handleInputChange}
          style={{
            width: "100%",
            display: isCompanyTypeSelected ? "block" : "none",
          }}
        >
          <option selected disabled>
            Select Company Sub Type
          </option>
          {companySubType.map((subType) => (
            <option
              value={subType.company_sub_cat_id}
              key={subType.company_sub_cat_id}
            >
              {subType.company_sub_cat}
            </option>
          ))}
        </select>

        {/* Country Dropdown */}
        <select
          name="comp_country"
          id="countries"
          className="input"
          onChange={handleInputChange}
          style={{ width: "100%" }}
        >
          <option selected disabled>
            Select Country
          </option>
          {countryList.map((country) => (
            <option value={country.country_code} key={country.country_code}>
              {country.country_name}
            </option>
          ))}
        </select>

        <input
          placeholder="Admin Email"
          name="comp_admin_email"
          className="input"
          onChange={handleInputChange}
          required
        />
        <input
          placeholder="Password"
          name="comp_admin_password"
          className="input"
          onChange={handleInputChange}
          type="password"
          required
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button className="btn active-btn" type="submit">
            Register Company
          </button>
          <button className="btn active-btn" onClick={navigateToLoginPage}>
            Log In
          </button>
        </div>
      </form>
    </>
  );
}

export default CompanyRegForm;
