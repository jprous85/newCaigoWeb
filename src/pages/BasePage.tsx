import React from "react";
import {Container, Paper} from '@material-ui/core';
import NavBar from "../components/NavBar/NavBar";

const BasePage = (props: any) => {
  const { setUid } = props;

  return (
    <Paper elevation={0}>
      <NavBar
        setUid={setUid}
      >
        <Container maxWidth={"xl"}>
          {props.children}
        </Container>
      </NavBar>
    </Paper>
  );
}

export default BasePage;