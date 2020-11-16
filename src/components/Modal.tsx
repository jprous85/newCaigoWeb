import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';

const { innerWidth: width, innerHeight: height } = window;

const Modal = (props: any) => {
  const {
    open, setOpen, title, children, fullScreen = true
  } = props;
  const classes = useStyles();

  const handleOnClose = () => {
    setOpen(!open);
  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleOnClose}
      >
        {title &&
        <DialogTitle>
          {title}
        </DialogTitle>}
        <DialogContent>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

  })
);

export default Modal;