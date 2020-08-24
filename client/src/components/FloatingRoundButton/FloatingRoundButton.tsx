import React from "react";

import "./FloatingRoundButton.scss";

const FloatingRoundButton = ({ buttonAction }: any) => {

return (
    <div className="floating-round-button-container">
    <div className="floating-round-button" onClick={() => buttonAction()}>
<label>+</label>
    </div>
    </div>
)
}
export default FloatingRoundButton;