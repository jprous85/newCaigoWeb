import React from 'react';
import {createStyles, makeStyles, Theme, Typography, Toolbar, Button} from "@material-ui/core";

const ToolbarTool = (props: any) => {
  const { showAccountModal, setShowAccountModal } = props;
  const classes = useStyles();

  const handleAccountModal = () => {
    setShowAccountModal(!showAccountModal);
  };

  return (
    <Toolbar>
      <Typography variant="h6" className={classes.title}>
        Caigo
      </Typography>
      <Button color="inherit" onClick={handleAccountModal}>Login</Button>
    </Toolbar>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default ToolbarTool;