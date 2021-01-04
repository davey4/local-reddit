import { useEffect, useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { __CheckSession } from "../services/UserServices";

import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Sub from "../pages/Sub";
import Threads from "../pages/Threads";

const Router = (props) => {
  const [loading, updateLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    updateLoading(false);
    verifyTokenValid();
  }, []);

  const verifyTokenValid = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const session = await __CheckSession();
        setCurrentUser(session.user.id);
        setAuthenticated(true);
        props.history.push("/");
      } catch (error) {
        localStorage.clear();
      }
    }
  };

  const toggleAuthenticated = (value, user) => {
    setAuthenticated(value);
    setCurrentUser(user);
  };

  return (
    <main>
      {loading ? (
        <h1>Page Loading....</h1>
      ) : (
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route path="/signup" component={(props) => <Signup {...props} />} />
          <Route
            path="/login"
            component={(props) => (
              <Login toggleAuthenticated={toggleAuthenticated} {...props} />
            )}
          />
          <Route path="/sub" component={(props) => <Sub {...props} />} />
          <Route
            path="/threads"
            component={(props) => <Threads {...props} />}
          />
        </Switch>
      )}
    </main>
  );
};

export default withRouter(Router);
