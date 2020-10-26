import React from 'react';
import {useTranslation} from "react-i18next";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Grid, Theme} from "@material-ui/core";
import ShareIcon from '@material-ui/icons/Share';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const SocialMedia = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid container className={classes.content}>
      <Grid item xs={3} className={classes.socialIcons}>
        <FavoriteBorderIcon/>
      </Grid>
      <Grid item xs={6} style={attend} className={classes.attend}>
        {t('attend').toUpperCase()}
      </Grid>
      <Grid item xs={3} className={classes.socialIcons}>
        <ShareIcon/>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      marginTop: 20
    },
    socialIcons: {
      textAlign: "center"
    },
    attend: {
      textAlign: "center",
      paddingTop: 7,
      borderRadius: 15,
      color: "#fff",
      fontWeight: "bold",
      fontSize: 12
    }
  })
);

const attend = {
  background: 'linear-gradient(to right, #ff4800, #f0a336)'
}

export default SocialMedia;