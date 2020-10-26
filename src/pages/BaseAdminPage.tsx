import React, {useEffect, useState} from "react";
import {Container, Paper} from '@material-ui/core';
import NavBarAdmin from "../components/NavBar/admin/NavBarAdmin";
import {useHistory} from "react-router-dom";

const BaseAdminPage = (props: any) => {
  const [logout, setLogout] = useState(false);
  const { user } = props;
  const history = useHistory();
  
  useEffect(()=> {
    if (logout) {
      window.localStorage.removeItem('c_uid');
      history.push('/');
    }
  }, [logout, history]);

  return (
    <Paper elevation={0}>
      <NavBarAdmin
        user={user}
        setLogout={setLogout}
      >
        <Container maxWidth={"xl"}>
          {props.children}
        </Container>
      </NavBarAdmin>
    </Paper>
  );
}

export default BaseAdminPage;