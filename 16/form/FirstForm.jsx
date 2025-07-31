import { useState } from "react";

function FirstForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit =( (event) => {
   event.preventDefault(); // Prevents page reload
    alert(`Name: ${formData.name}, Email: ${formData.email}`);
  });
 

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Enter Name"
          onChange={handleChange}
        />
        <br />
        <input
          name="email"
          type="text"
          placeholder="Enter Email"
          onChange={handleChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FirstForm;
