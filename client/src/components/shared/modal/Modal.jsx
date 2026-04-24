import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputType from "../form/InputType"
import API from "../../../services/Api";

const Modal = () => {
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodgroup, setBloodgroup] = useState("");
  const [quantity, setQuantity] = useState("");
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => state.auth);

  //  Submit handler
  const handleModalSubmit = async () => {
    try {
      // Form validation
      if (!bloodgroup || !quantity || !email) {
        return alert("Please provide all fields");
      }

      //  Payload
      const payload = {
        email,
        organisation: user._id,
        inventoryType,  
        bloodgroup,
        quantity,

      };

      console.log("FINAL PAYLOAD:", payload);

      // API call
      const { data } = await API.post("/inventory/create-inventory", payload);

      if (data?.success) {
        alert("New Record Created");
        window.location.reload();
      } else {
        window.location.reload();
        alert(data?.message);
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      alert(message);
    }
  };

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h1 className="modal-title fs-5">Manage Blood Record</h1>
          </div>

          {/* Body */}
          <div className="modal-body">
            {/* Radio */}
            <div className="d-flex mb-3">
              Blood Type: &nbsp;
              <div className="form-check">
                <input
                  type="radio"
                  name="inRadio"
                  checked={inventoryType === "in"}
                  value="in"
                  onChange={(e) => setInventoryType(e.target.value)}
                />
                <label>IN</label>
              </div>
              <div className="form-check ms-3">
                <input
                  type="radio"
                  name="inRadio"
                  checked={inventoryType === "out"}
                  value="out"
                  onChange={(e) => setInventoryType(e.target.value)}
                />
                <label>OUT</label>
              </div>
            </div>

            {/* Select */}
            <select
              className="form-select mb-3"
              value={bloodgroup}
              onChange={(e) => setBloodgroup(e.target.value)}
            >
              <option value="">Select Blood Group</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="B+">B+</option>
              <option value="A+">A+</option>
              <option value="B-">B-</option>
              <option value="A-">A-</option>
            </select>

            {/* Donor Email */}
            <InputType
              labelText="Email"
              labelFor="Email"
              inputType="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Quantity */}
            <InputType
              labelText="Quantity(ml)"
              labelFor="quantity"
              inputType="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>

            <button className="btn btn-primary" onClick={handleModalSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
