import React from "react";

function Regret({ children }) {
  return (
    <div
      style={{ 
        height: 560, 
        clear: "both", 
        paddingTop: 120, 
        textAlign: "center",
        fontSize: 30
      }}
    >
      Hi,
      Your account has been deleted and we're really sorry to see you go.
    </div>
  );
}

export default Regret;
