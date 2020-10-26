import React from "react";
import {Container, Paper} from '@material-ui/core';
import NavBar from "../components/NavBar";
import {useTranslation} from "react-i18next";

const BasePage = (props: any) => {
  const { t, i18n } = useTranslation();

  console.log(props);
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

export default BasePage;