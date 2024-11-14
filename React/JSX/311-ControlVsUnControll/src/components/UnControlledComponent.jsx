import React, { useRef } from "react";

export default function UnControlledComponent() {
  const input = useRef(null);
  function Submit() {}
  function handleChange() {
    console.log(input.current.value);
  }
  return (
    <div>
      <h1>UnControlled Component </h1>
      <form onSubmit={Submit}>
        <input
          type="text"
          placeholder="This is an UnControlled Component"
          ref={input}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}
