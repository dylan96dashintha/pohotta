import React from "react";
import { useLocation } from "react-router-dom";
import {Link} from "react-router-dom";
import "./Dashboard.scss";

const Dashboard = (props: any) => {
    let location = useLocation();
    

    return <div className="page-container">
        <p><Link className="breadcrumbs" to={location.pathname}> Dashboard /</Link></p>
        <h1>Tulossa myöhemmin</h1>
    </div>;
};
export default Dashboard;
