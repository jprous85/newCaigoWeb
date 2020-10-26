import React from 'react';
import {createStyles, IconButton, makeStyles, Theme, Typography, Toolbar} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuProfile from "./MenuProfile";

const ToolbarTool = (props: any) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const {toggleDrawer} = props;

  const handleAccountMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Toolbar>
      <IconButton edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  onClick={() => toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" className={classes.title}>
        News
      </Typography>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleAccountMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <MenuProfile
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </Toolbar>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default ToolbarTool;