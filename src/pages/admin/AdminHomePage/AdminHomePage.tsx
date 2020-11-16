import React, {useState} from "react";
import {Button, createStyles, Divider, Grid, Link, Theme} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import makeStyles from "@material-ui/core/styles/makeStyles";

import { CSVReader } from 'react-papaparse';
import ReactMap from "../../../components/MapView/ReactMap";
import Modal from "../../../components/Modal";
import {useHistory} from "react-router-dom";

const AdminHomePage = () => {

  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const [dialogMap, setDialogMap] = useState(false);
  const [btnCSVToJson, setBtnCSVToJson] = useState(true);

  const handleOnFileLoad = (data:any) => {
    setBtnCSVToJson(false);
  }
  
  const handleRemoveFile = () => {
    setBtnCSVToJson(true);
  }

  const handleOnError = (err: any, file: any, inputElem: any, reason: any) => {
    setBtnCSVToJson(true);
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.container}>
        <Grid
          container
          item xs={12}
          direction={"row"}
          alignItems={"flex-start"}
          justify={"space-between"}
          className={classes.toolbar}
        >
          <Link
            variant={"overline"}
            color={"primary"}
            href={"/admin/create"}
          >Crear nuevo evento</Link>
          <Button
            variant={"outlined"}
            color={"secondary"}
            onClick={()=> setDialogMap(true)}
          >Importar desde CSV</Button>
        </Grid>


      </Grid>
      <Modal
        open={dialogMap}
        setOpen={setDialogMap}
        fullScreen={false}
        children={
          <>
            <CSVReader
              onFileLoad={handleOnFileLoad}
              onRemoveFile={handleRemoveFile}
              onError={handleOnError}
              addRemoveButton
              removeButtonColor='#ff2929'
            >
              <span>Click or Drop CSV file here to upload.</span>
            </CSVReader>
            <Button
              variant="outlined"
              color="primary"
              className={classes.btnModalCSV}
              disabled={btnCSVToJson}
            >
              Guardar datos en BBDD
            </Button>
          </>
        }
      />
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    container: {
      marginTop: 10
    },
    toolbar: {
      alignContent: "flex-end",
      width: "100%"
    },
    btnModalCSV: {
      marginTop: 15,
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: 10,
      width: "100%"
    }
  })
);

export default AdminHomePage;