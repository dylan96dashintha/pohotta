import React from "react";

import "./BaseScene.scss";

const BaseScene = (props: any) => {
    return <div className="page-container">
        {props.children}
    </div>;
};
export default BaseScene;
