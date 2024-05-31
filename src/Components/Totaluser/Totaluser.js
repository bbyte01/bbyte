import react, { useEffect, useState } from "react";

//import Sidebar from "../Homepage/Dashboard/Sidebar/Sidebar";
//import Navbar from "../Homepage/Dashboard/Navbar/Navbar";
import Usertable from "../Homepage/Usertable/Usertable";
import axios from "axios";
import { Config } from "../../Config/config";
const { API_URL } = Config;



function Totaluser() {
  const [userData, setUserData] = useState([])

  const gettotaluser= () => {
    const config = {
      method: "GET",
      url: `${API_URL}user/all`,
      // headers: {
      //   Token: localStorage.getItem("authToken")
      // }
    };

    axios(config)
      .then((response) => {
        setUserData(response.data)
        // console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(()=> {
    gettotaluser()
  },[])
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
          <Usertable 
            userData={userData}
          />
        </div>
      </div>
    </div>
  );
}
export default Totaluser;
