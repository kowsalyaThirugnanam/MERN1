import React, { useState } from "react";

function App() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: "",
  });

  function handleChange(events) {
    const { name, value } = events.target;
    console.log(name, value);
    setContact((preValue) => {
      console.log("preValue", preValue);
      switch (name) {
        case "fName":
          return {
            fName: value,
            lName: preValue.lName,
            email: preValue.email,
          };
          break;
        case "lName":
          return {
            fName: preValue.fName,
            lName: value,
            email: preValue.email,
          };
          break;
        case "email":
          return {
            fName: preValue.fName,
            lName: preValue.lName,
            email: value,
          };
          break;
        default:
          break;
      }

      // if (name === "fName") {
      //   return {
      //     fName: value,
      //     lName: preValue.lName,
      //     email: preValue.email,
      //   };
      // } else if (name === "lName") {
      //   return {
      //     fName: preValue.fName,
      //     lName: value,
      //     email: preValue.email,
      //   };
      // } else if (name === "email") {
      //   return {
      //     fName: preValue.fName,
      //     lName: preValue.lName,
      //     email: value,
      //   };
      // }
    });
  }

  function submitForm(event) {
    console.log(contact);
    event.preventDefault();
  }
  return (
    <div className="container">
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p>{contact.email}</p>
      <form onSubmit={submitForm}>
        <input
          name="fName"
          value={contact.fName}
          placeholder="First Name"
          onChange={handleChange}
        />
        <input
          name="lName"
          value={contact.lName}
          placeholder="Last Name"
          onChange={handleChange}
        />
        <input
          name="email"
          value={contact.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
