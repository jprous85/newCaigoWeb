import React, {useEffect, useState} from "react";
import * as firebase from "firebase";
import {firebaseApp} from "../../utils/firebase";
import {useHistory} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import BaseAdminPage from "../BaseAdminPage";

const Create = () => {
  const [user, setUser] = useState({});
  const db = firebase.firestore(firebaseApp);
  const history = useHistory();

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
  }, []);

  if (Object.keys(user).length === 0) return (
    <CircularProgress color="secondary"/>
  );

  return (
    <div>
      <BaseAdminPage
        user={user}
      >
        create
      </BaseAdminPage>
    </div>
  )
}

export default Create;