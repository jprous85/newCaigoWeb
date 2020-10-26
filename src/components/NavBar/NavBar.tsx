import React, {useState} from "react";
import {
  AppBar,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import ToolbarTool from "./ToolbarTool";
import LoginModal from "../AccountModal/LoginModal";

const NavBar = (props: any) => {
  const classes = useStyles();
  const [showAccountModal, setShowAccountModal] = useState(false);
  const { setUid } = props;

  return <div className={classes.root}>
    <AppBar position="sticky" color={"transparent"} elevation={0}>
      <ToolbarTool
        showAccountModal={showAccountModal}
        setShowAccountModal={setShowAccountModal}
      />
    </AppBar>
    <LoginModal
      setUid={setUid}
      showAccountModal={showAccountModal}
      setShowAccountModal={setShowAccountModal}
    />
    {props.children}
  </div>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    }
  }),
);

export default NavBar;