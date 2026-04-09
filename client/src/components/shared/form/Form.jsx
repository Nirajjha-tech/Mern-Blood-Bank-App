import React, { useState } from "react";
import InputType from "./inputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [role, setRole] = useState("donor");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          if (formType === "Login")
            return handleLogin(e, email, password, role);
          else if (formType === "Register")
            return handleRegister(
              e,
              name,
              email,
              role,
              password,
              organisationName,
              hospitalName,
              website,
              phone,
              address
            );
        }}
      >
        <h1 className="text-center">{formTitle}</h1>
        <hr />

        <div className="d-flex mb-3">
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="donorRadio"
              value="donor"
              checked={role === "donor"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="donorRadio" className="form-check-label">
              Donor
            </label>
          </div>

          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="adminRadio"
              value="admin"
              checked={role === "admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="adminRadio" className="form-check-label">
              Admin
            </label>
          </div>

          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="organisationRadio"
              value="organisation"
              checked={role === "organisation"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="organisationRadio" className="form-check-label">
              Organisation
            </label>
          </div>

          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="hospitalRadio"
              value="hospital"
              checked={role === "hospital"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="hospitalRadio" className="form-check-label">
              Hospital
            </label>
          </div>
        </div>

        {formType === "Login" && (
          <>
            <InputType
              labelText={"Email"}
              labelFor={"email"}
              inputType={"email"}
              name={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputType
              labelText={"Password"}
              labelFor={"password"}
              inputType={"password"}
              name={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}

        {formType === "Register" && (
          <>
            <InputType
              labelText={"Name"}
              labelFor={"name"}
              inputType={"text"}
              name={"name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <InputType
              labelText={"Address"}
              labelFor={"address"}
              inputType={"text"}
              name={"address"}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <InputType
              labelText={"Email"}
              labelFor={"email"}
              inputType={"email"}
              name={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputType
              labelText={"Password"}
              labelFor={"password"}
              inputType={"password"}
              name={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <InputType
              labelText={"Phone"}
              labelFor={"phone"}
              inputType={"number"}
              name={"phone"}
              value={phone}
              onChange={(e) => setPhone(Number(e.target.value))}
            />

            {role === "organisation" && (
              <>
                <InputType
                  labelText={"Organisation Name"}
                  labelFor={"organisationName"}
                  inputType={"text"}
                  name={"organisationName"}
                  value={organisationName}
                  onChange={(e) =>
                    setOrganisationName(e.target.value)
                  }
                />

                <InputType
                  labelText={"Website"}
                  labelFor={"website"}
                  inputType={"text"}
                  name={"website"}
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </>
            )}

            {role === "hospital" && (
              <InputType
                labelText={"Hospital Name"}
                labelFor={"hospitalName"}
                inputType={"text"}
                name={"hospitalName"}
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
              />
            )}
          </>
        )}

        <div className="d-flex flex-row justify-content-between mt-3">
          {formType === "Login" ? (
            <p>
              Not Registered yet? <Link to="/register">Register Here!</Link>
            </p>
          ) : (
            <p>
              Already Registered? <Link to="/login">Log in Here!</Link>
            </p>
          )}
          <button className="btn btn-primary" type="submit">
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;