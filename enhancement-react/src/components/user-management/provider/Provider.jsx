import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "../../../style/Provider.style.css"; // Import custom CSS file

const onsubmit = (data) => {
  console.log("this is a onsubmit", data);
};

let count = 0;

const Provider = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log("check component re-render", count += 1);
  });

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onsubmit)} className="form-box">
        <h2 className="form-title">Create Provider</h2>

        {/* First Name */}
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            {...register("FirstName", {
              required: { value: true, message: "First Name is required" },
              maxLength: { value: 10, message: "Max 10 characters allowed" },
              minLength: { value: 3, message: "At least 3 characters required" },
            })}
            className="form-input"
          />
          {errors.FirstName && <p className="error">{errors.FirstName.message}</p>}
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            {...register("LastName", {
              required: { value: true, message: "Last Name is required" },
              maxLength: { value: 10, message: "Max 10 characters allowed" },
              minLength: { value: 3, message: "At least 3 characters required" },
            })}
            className="form-input"
          />
          {errors.LastName && <p className="error">{errors.LastName.message}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            {...register("email", {
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format",
              },
            })}
            className="form-input"
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Create Provider</button>
      </form>
    </div>
  );
};

export default Provider;

