import React from "react";
import Form from "../../components/shared/form/Form";

const Login = () => {
  return (
    <>
      <div className="row g-0">
        <div className="col-md-8 form-banner">
          <img src="/images/banner1.jpg" alt="login img" />
        </div>
        <div className="col-md-4 form-container">
          <Form
            formTitle={"Login Page"}
            submitBtn={"Submit"}
            formType={"Login"}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
