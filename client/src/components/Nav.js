import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ForumIcon from "@material-ui/icons/Forum";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SettingsIcon from "@material-ui/icons/Settings";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";

import { __GetNotifications } from "../services/NotificationServices";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Nav(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });
  const [user, setUser] = useState();
  const [notif, setNotif] = useState();

  useEffect(() => {
    setUser(props.currentUser);
    getNotif();
  }, []);

  const getNotif = async () => {
    try {
      const data = await __GetNotifications(props.currentUser);
      setNotif(data.length);
    } catch (error) {
      throw error;
    }
  };

  const pushToLogin = () => {
    props.history.push("/login");
  };

  const pushToHome = () => {
    props.history.push("/");
  };

  const pushToSub = () => {
    props.history.push("/sub");
  };

  const pushToSubcriptions = () => {
    props.history.push("/subscriptions");
  };

  const pushToNotif = () => {
    props.history.push("/notifications");
  };

  const pushToAcount = () => {
    props.history.push("/account");
  };

  const logout = () => {
    localStorage.clear();
    props.verify();
    props.history.push("/");
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button onClick={pushToHome}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={pushToSub}>
          <ListItemIcon>
            <ForumIcon />
          </ListItemIcon>
          <ListItemText primary="Forums" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {user ? (
          <div>
            <ListItem button onClick={pushToSubcriptions}>
              <ListItemIcon>
                <SubscriptionsIcon />
              </ListItemIcon>
              <ListItemText primary="Subscriptions" />
            </ListItem>
            <ListItem button onClick={pushToNotif}>
              <ListItemIcon>
                <NotificationsIcon />
                {notif}
              </ListItemIcon>
              <ListItemText primary="Notifications" />
            </ListItem>
            <ListItem button onClick={pushToAcount}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItem>
            <ListItem button onClick={logout}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </div>
        ) : (
          <ListItem button onClick={pushToLogin}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            {["left"].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>
                  <MenuIcon />
                </Button>
                <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
