import react from "react";
import Sidebar from "../Dashboard/Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import DashboardContent from "./DashboardContent/DashboardContent";
import './dashboard.css'

function Dashboardon() {
  return (
    <div>
        <Navbar />
        <div
            className="dashboard"
        >
            <div 
                className="sidebar"
            >
                <Sidebar />
            </div>
            <div
                className="dashboard-content"
            >
                <DashboardContent />
            </div>
            
        </div>
    </div>
  );
}

export default Dashboardon;
