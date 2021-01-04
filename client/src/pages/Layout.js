import React from "react";
import Nav from "../components/Nav";

const Layout = ({ children, currentUser, ...props }) => {
  return (
    <div className="layout-grid">
      <div>
        <Nav currentUser={currentUser} {...props} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
