import React, { useState } from "react";

const NormalFormProvider = () => {
  const [providerData, setproviderData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleOnChange = (e) => {
    const {name, value} = e.target;
    setproviderData((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log("this is formdata",providerData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>firstName</label>
        <input
          type="text"
          required
          name="firstName"
          value={providerData.firstName}
          onChange={handleOnChange}
        />
      </div>
      <div>
        <label>lastName</label>
        <input
          type="text"
          required
          name="lastName"
          value={providerData.lastName}
          onChange={handleOnChange}
        />
      </div>
      <div>
        <label>email</label>
        <input
          type="email"
          name="email"
          required
          value={providerData.email}
          onChange={handleOnChange}
        />
      </div>
      <button type="submit">
        createProvider
      </button>
    </form>
  );
};

export default NormalFormProvider;
