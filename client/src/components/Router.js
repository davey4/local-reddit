import { useEffect, useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { __CheckSession } from "../services/UserServices";

import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Sub from "../pages/Sub";
import Threads from "../pages/Threads";
import Forum from "../pages/Forum";
import Notifications from "../pages/Notifications";
import Account from "../pages/Account";
import Subscriptions from "../pages/Subscriptions";

const Router = (props) => {
  const [loading, updateLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const [currentUserName, setCurrentUserName] = useState("");

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
        setCurrentUserName(session.user.user_name);
        props.history.push("/");
      } catch (error) {
        localStorage.clear();
        setCurrentUser();
        setCurrentUserName("");
      }
    } else {
      setCurrentUser();
    }
  };

  const toggleAuthenticated = (user, userName) => {
    setCurrentUser(user);
    setCurrentUserName(userName);
  };

  return (
    <main>
      {loading ? (
        <h1>Page Loading....</h1>
      ) : (
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <Layout
                currentUser={currentUser}
                verify={verifyTokenValid}
                {...props}
              >
                <Home />
              </Layout>
            )}
          />
          <Route
            path="/signup"
            component={(props) => (
              <Layout
                currentUser={currentUser}
                verify={verifyTokenValid}
                {...props}
              >
                <Signup toggleAuthenticated={toggleAuthenticated} {...props} />
              </Layout>
            )}
          />
          <Route
            path="/login"
            component={(props) => (
              <Layout
                currentUser={currentUser}
                verify={verifyTokenValid}
                {...props}
              >
                <Login toggleAuthenticated={toggleAuthenticated} {...props} />
              </Layout>
            )}
          />
          <Route
            path="/sub"
            component={(props) => (
              <Layout
                currentUser={currentUser}
                verify={verifyTokenValid}
                {...props}
              >
                <Sub currentUser={currentUser} {...props} />
              </Layout>
            )}
          />
          <Route
            path="/threads"
            component={(props) => (
              <Layout
                currentUser={currentUser}
                verify={verifyTokenValid}
                {...props}
              >
                <Threads currentUser={currentUser} {...props} />
              </Layout>
            )}
          />
          <Route
            path="/forum"
            component={(props) => (
              <Layout
                currentUser={currentUser}
                verify={verifyTokenValid}
                {...props}
              >
                <Forum
                  currentUserName={currentUserName}
                  currentUser={currentUser}
                  {...props}
                />
              </Layout>
            )}
          />
          <Route
            path="/notifications"
            component={(props) => (
              <Layout
                currentUser={currentUser}
                verify={verifyTokenValid}
                {...props}
              >
                <Notifications currentUser={currentUser} {...props} />
              </Layout>
            )}
          />
          <Route
            path="/account"
            component={(props) => (
              <Layout
                currentUser={currentUser}
                verify={verifyTokenValid}
                {...props}
              >
                <Account currentUser={currentUser} {...props} />
              </Layout>
            )}
          />
          <Route
            path="/subscriptions"
            component={(props) => (
              <Layout
                currentUser={currentUser}
                verify={verifyTokenValid}
                {...props}
              >
                <Subscriptions currentUser={currentUser} {...props} />
              </Layout>
            )}
          />
        </Switch>
      )}
    </main>
  );
};

export default withRouter(Router);
