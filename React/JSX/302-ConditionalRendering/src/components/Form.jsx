import React from "react";

function Form(props) {
  return (
    <form className="form">
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />

      {!props.displayForm ? (
        <div>
          <input type="password" placeholder="Confirm Password" />
          <button type="submit">Register</button>
        </div>
      ) : (
        <button type="submit">Login</button>
      )}
    </form>
  );
}

export default Form;
