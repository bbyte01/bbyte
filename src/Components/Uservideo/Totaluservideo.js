import react from "react";

//import Sidebar from "../Homepage/Dashboard/Sidebar/Sidebar";
// import Navbar from "../Homepage/Dashboard/Navbar/Navbar";
import Uservideo from "./Uservideo";
function Totaluservideo() {
  return (
    <div>
      <div>
        {/* <Navbar /> */}
        <div
          style={{
            display: "flex",
          }}
        >
          {/* <Sidebar /> */}
          <div></div>
          <Uservideo />
        </div>
      </div>
    </div>
  );
}
export default Totaluservideo;
