import React from "react";
import {Container, Paper} from '@material-ui/core';
import NavBar from "../components/NavBar/NavBar";
const BaseAdminPage = (props: any) => {

  return (
    <Paper elevation={0}>
      <NavBar>
        <Container maxWidth={"xl"}>
          {props.children}
        </Container>
      </NavBar>
    </Paper>
  );
}

export default BaseAdminPage;