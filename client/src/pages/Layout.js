import React from "react";
import Nav from "../components/Nav";

const Layout = ({ children, currentUser }) => {
  return (
    <div className="layout-grid">
      <div>
        <Nav currentUser={currentUser} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
