import React, {useState} from "react";
import {
  AppBar,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import {Drawer} from '@material-ui/core';
import ToolbarTool from "../ToolbarTool";
import DrawerList from "../DrawerList";


const NavBar = (props: any) => {
  const classes = useStyles();
  const [drawerShow, setDrawerShow] = useState(false);

  const toggleDrawer = (visibility:boolean) => {
    setDrawerShow(visibility);
  }

  return <div className={classes.root}>
    <AppBar position="static" color={"secondary"}>
      <ToolbarTool
        toggleDrawer={toggleDrawer}
      />
    </AppBar>
    <Drawer
      anchor={"left"}
      open={drawerShow}
      onClose={() => toggleDrawer(false)}
    >
      <DrawerList/>
    </Drawer>
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