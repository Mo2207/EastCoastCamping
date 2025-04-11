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
      You have succefully booked your camp. Enjoy your trip!
    </div>
  );
}

export default Regret;
