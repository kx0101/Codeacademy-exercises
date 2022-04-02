import React, { useState } from "react";

export default function EditProfile() {
  const [profile, setProfile] = useState({});

  const handleChange = ({ target }) => {
    const { name, value } = target
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }))
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(profile, '', 2));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={profile.firstName || ''}
        onChange={handleChange}
        name="firstName"
        type="text"
        placeholder="First Name"
      />
      <input
        value={profile.lastName || ''}
        type="text"
        onChange={handleChange}
        name="lastName"
        placeholder="Last Name"
      />
      <input
        value={profile.bday || ''}
        type="date"
        onChange={handleChange}
        name="bday"
      />
      <input
        value={profile.password || ''}
        type="password"
        onChange={handleChange}
        name="password"
        placeholder="Password"
      />
      <button type="submit">Submit</button>
    </form>
    
  );
}
