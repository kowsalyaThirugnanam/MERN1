import  React  from "react";

const fname = "Kowsalya";
const lname = "Thirugnanam";
const customStyle = {
    color: "red",
    fontSize: "22px",
    fontWeight: "Bold",
    fontFamily: "sans",
    marginLeft: "10px"
};
function Headers() {
   return <h1>Hello <span style={customStyle} > {`${fname} ${lname}`}</span> </h1>
}

export default Headers;