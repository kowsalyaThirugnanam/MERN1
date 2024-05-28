import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  console.log("year", year);
  return (
    <footer>
      <p>Copyright @ {year} </p>
    </footer>
  );
}

export default Footer;
