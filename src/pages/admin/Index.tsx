import React, {useEffect, useState} from 'react';
import BaseAdminPage from "../BaseAdminPage";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as firebase from "firebase";
import {firebaseApp} from "../../utils/firebase";
import {Redirect, useHistory} from "react-router-dom";
import Create from './Create/Create';
import Grid from '@material-ui/core/Grid';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Paper, Theme} from "@material-ui/core";

const NoMatches = () => {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const db = firebase.firestore(firebaseApp);
  const history = useHistory();
  const path = window.location.pathname.split('/');

  useEffect(() => {
    const uid = window.localStorage.getItem('c_uid');
    if (uid) {
      const docRef = db.collection('users').doc(uid);
      docRef.get().then((doc) => {
        if (doc.exists) {
          // @ts-ignore
          setUser(doc.data());
        } else {
          console.log('No such document!');
        }
      }).catch((error) => {
        console.log('Error getting document:', error);
      });
    }
    else history.push("/");
  }, [db, history]);

  if (Object.keys(user).length === 0) return (
    <CircularProgress color="secondary"/>
  );

  let component = <Redirect to={"/"}/>

  if (path[1] === 'admin') component = <div>Home admin</div>;
  if (path[2] === 'create') component = <Create/>

  return (
    <div>
      <BaseAdminPage
        user={user}
      >
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {component}
            </Grid>
          </Grid>
        </div>
      </BaseAdminPage>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

export default NoMatches;