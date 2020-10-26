import React from 'react';
import {createStyles, IconButton, makeStyles, Theme, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuProfile from "./MenuProfile";

const Toolbar = (props: any) => {
  const {anchorEl, setAnchorEl} = props;
  const classes = useStyles();

  const handleAccountMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  return (
    <Toolbar>
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
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

export default Toolbar;