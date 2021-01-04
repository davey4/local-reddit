import React from "react";
import Nav from "../components/Nav";

const Layout = ({ children, currentUser, verify, ...props }) => {
  return (
    <div className="layout-grid">
      <div>
        <Nav currentUser={currentUser} verify={verify} {...props} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
