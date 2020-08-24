import React from "react";
import {Link} from "react-router-dom";
import "./Plan.scss";

const Plan = (props: any) => {
    return <div className="page-container">
        <Link className="breadcrumbs" to="/plan">Plan /</Link>
        <h1>Tulossa myöhemmin</h1>
    </div>;
};
export default Plan;
