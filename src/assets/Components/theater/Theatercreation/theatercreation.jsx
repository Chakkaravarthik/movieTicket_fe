import React, { useState } from "react";
import { theaterCreation } from "../../../Apis/theaterapi/theaterapi.js";

const TheaterRegistrationForm = () => {
  const [formData, setFormData] = useState({
    theatername: "",
    theateraddress: "",
    theaterphonenumber: "",
    theateremail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    let res = await theaterCreation(formData);
    if(res.code===1){
        console.log(res);
        setFormData({
            theatername: "",
            theateraddress: "",
            theaterphonenumber: "",
            theateremail: "",
        });
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Theater Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="theatername">Name:</label>
          <input
            type="text"
            id="name"
            name="theatername"
            value={formData.theatername}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="theateraddress">Address:</label>
          <textarea
            id="address"
            name="theateraddress"
            value={formData.theateraddress}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="theaterphonenumber">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="theaterphonenumber"
            value={formData.theaterphonenumber}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="theateremail">Email:</label>
          <input
            type="email"
            id="email"
            name="theateremail"
            value={formData.theateremail}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 15px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default TheaterRegistrationForm;
