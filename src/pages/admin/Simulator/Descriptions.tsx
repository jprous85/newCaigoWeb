import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";

const Descriptions = (props: any) => {
  const {title, bodyText} = props;
  const classes = useStyles();

  return (
    <div>
      <h5>{title}</h5>
      <p className={classes.bodyText}>{bodyText}</p>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bodyText: {
      fontSize: 12,
      marginTop: -20
    }
  })
);

export default Descriptions;