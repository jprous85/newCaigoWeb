import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ImageUploader from 'react-images-upload';
import {
  createStyles,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  FormControlLabel,
  Switch,
  Theme,
  InputLabel,
  TextareaAutosize,
  TextField,
  Link
} from "@material-ui/core";
import { Editor } from "@tinymce/tinymce-react";
import Simulator from "./../Simulator/Simulator";
import {CATEGORIES} from "../../../utils/Constants";
import {useTranslation} from "react-i18next";
// @ts-ignore
import Styles from "./../../../Styles/Styles.css";
// @ts-ignore
import ScrollHidden from "./../../../Styles/ScrollHidden.css";
import ReactMap from "../../../components/MapView/ReactMap";
import Modal from "../../../components/Modal";

const samsung = '/samsung.png';

interface EventsState {
  title: string;
  description: string;
  descriptionCovid: string;
  categories: string;
  pictures: any;
  start_time: string;
  end_time: string;
  online: boolean;
  price: number;
  coords: any
}

const Create = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const textEditor: any = process.env.REACT_APP_TEXT_EDITOR;
  const [priceSwitch, setPriceSwitch] = useState(true);
  const [dialogMap, setDialogMap] = useState(false);
  const [values, setValues] = React.useState<EventsState>({
    pictures: {},
    title: '',
    description: '',
    descriptionCovid: '',
    categories: '',
    start_time: '',
    end_time: '',
    online: false,
    price: NaN,
    coords:
      {
        lat: 41.11906295304845,
        lng: 1.2453862698945128
      }
  });

  const onDrop = (picture: any) => {
    let array_temp: any[] = [];
    if (picture.length >= 3) picture = picture.slice(0, 3);
    picture.map((p: any) => {
      array_temp.push(p);
    });
    setValues({...values, pictures: array_temp});
  }

  const handleCategoryChange = (e: any) => {
    setValues({...values, categories: e.target.value })
  }

  const handleOnlineChange = () => {
    setValues({...values, online: !values.online})
  }

  const handlePriceSwitchChange = () => {
    setPriceSwitch(!priceSwitch);
    setValues({...values, price: NaN})
  }

  const prepareDate = (date: string) => {
    const d = date.split('.')[0];
    const h = d.split(':');
    return `${h[0]}:${h[1]}`
  }

  const handleChangeDate = (type: string, e: any) => {
    const date = (e)? new Date(e).toISOString() : '';
    setValues({...values, [type]: date})
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={8}>
          <Paper elevation={2} className={classes.formCreate}>
            <FormControl fullWidth onSubmit={() => {console.log('submit');}}>

              <ImageUploader
                withIcon={false}
                buttonText='Choose images'
                onChange={onDrop}
                imgExtension={['.jpg', '.gif', '.png']}
                maxFileSize={5242880}
                withPreview
                withLabel
                style={Styles}
                buttonClassName={(values.pictures.length >= 3) ? classes.btnDisabled : classes.btnNODisabled}
              />
              <FormControl>
                <InputLabel id="categoryLabel" className={classes.labelCategories}>Select a category</InputLabel>
                <Select
                  labelId={"categoryLabel"}
                  id={"category"}
                  value={values.categories}
                  onChange={handleCategoryChange}
                  className={classes.inputs}
                >
                  {CATEGORIES.map((c: any) =>
                    <MenuItem key={c} value={c}>{t(`category-filter-${c}`)}</MenuItem>
                  )}
                </Select>
              </FormControl>
              <FormControl>
                <TextField id="title"
                           label="Title"
                           fullWidth
                           className={classes.inputs}
                           onChange={(e: any) => {
                             setValues({...values, title: `${e.target.value}`});
                           }}
                />
              </FormControl>

              <Grid container>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="datetime-local"
                    label="Start time"
                    type="datetime-local"
                    defaultValue={prepareDate(values.start_time)}
                    className={classes.inputs}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => {
                      handleChangeDate('start_time', e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="datetime-local"
                    label="End time"
                    type="datetime-local"
                    defaultValue={prepareDate(values.end_time)}
                    className={classes.inputs}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => {
                      handleChangeDate('end_time', e.target.value);
                    }}
                  />
                </Grid>
              </Grid>

              <FormControlLabel
                className={classes.onlineChecked}
                control={
                  <Switch
                    checked={priceSwitch}
                    onChange={handlePriceSwitchChange}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Gratis"
              />

              {!priceSwitch &&
                <FormControl>
                  <TextField id="price"
                             label="price"
                             type={"number"}
                             fullWidth
                             className={classes.inputs}
                             onChange={(e: any) => {
                               setValues({...values, price: parseFloat(e.target.value || NaN)});
                             }}
                  />
                </FormControl>
              }

              <FormControl>
                <span
                  style={{marginTop: 15, marginBottom: 10, color: '#777'}}
                >
                  {t('description')}
                </span>
                <Editor
                  apiKey={textEditor}
                  value={values.description}
                  initialValue={values.description}
                  init={{
                    height: 200,
                    menubar: false,
                    plugins: [
                      'advlist autolink lists link image',
                      'charmap print preview anchor help',
                      'searchreplace visualblocks code',
                      'insertdatetime media table paste wordcount'
                    ],
                    toolbar:
                      'undo redo | formatselect | bold italic | \
                      alignleft aligncenter alignright | \
                      bullist numlist outdent indent | help'
                  }}
                  onEditorChange={(e: any) => {
                    setValues({...values, description: `${e}`});
                  }}
                />
              </FormControl>
              <FormControl>
                <span
                  style={{marginTop: 15, marginBottom: 10, color: '#777'}}
                >
                  {t('descriptionCovid')}
                </span>
                <Editor
                  apiKey={textEditor}
                  value={values.descriptionCovid}
                  initialValue={values.descriptionCovid}
                  init={{
                    height: 200,
                    menubar: false,
                    plugins: [
                      'advlist autolink lists link image',
                      'charmap print preview anchor help',
                      'searchreplace visualblocks code',
                      'insertdatetime media table paste wordcount'
                    ],
                    toolbar:
                      'undo redo | formatselect | bold italic | \
                      alignleft aligncenter alignright | \
                      bullist numlist outdent indent | help'
                  }}
                  onEditorChange={(e: any) => {
                    setValues({...values, descriptionCovid: `${e}`});
                  }}
                />
              </FormControl>

              <div
                className={classes.contentLinkMap}
              >
                <span
                  style={{marginTop: 15, marginBottom: 10, color: '#777'}}
                >
                {t('ubication')}
              </span>
                <div className={classes.linkMapForm}>
                  <Link
                    className={classes.linkMapLink}
                    onClick={()=> {
                      setDialogMap(true);
                    }}
                  >
                    <ReactMap
                      setValues={setValues}
                      values={values}
                      options
                    />
                  </Link>
                </div>
              </div>

              <FormControlLabel
                className={classes.onlineChecked}
                control={
                  <Switch
                    checked={values.online}
                    onChange={handleOnlineChange}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Online"
              />

              <Modal
                open={dialogMap}
                setOpen={setDialogMap}
                title={"Buscador"}
                children={
                  <>
                    <ReactMap
                      setValues={setValues}
                      values={values}
                    />
                    <Link
                      onClick={()=> {
                        setDialogMap(false)
                      }}
                    >Salir</Link>
                  </>
                }
              />

            </FormControl>


          </Paper>
        </Grid>
        <Grid item xs={4}>
          <img src={samsung} className={classes.samsung} alt={"samsung"}/>
          <div className={classes.samsungContainer}>
            <div className={classes.samsungContent} style={ScrollHidden}>
              <Simulator
                event={values}
                setEvent={setValues}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    container: {
      marginTop: 10
    },
    formCreate: {
      padding: 20,
    },
    inputs: {
      width: '97%',
      margin: 7
    },
    labelCategories: {
      marginLeft: 10
    },
    btnDisabled: {
      display: 'none'
    },
    btnNODisabled: {
      display: "block"
    },
    onlineChecked: {
      marginTop: 10,
    },
    samsung: {
      width: 372,
      position: "fixed",
    },
    samsungContainer: {
      position: "absolute",
      width: 372,
      height: 567.05
    },
    samsungContent: {
      position: "absolute",
      top: 40,
      right: 66,
      height: 487,
      width: 240,
      borderRadius: 24,
      overflowY: "auto",
      "&::-webkit-scrollbar": {
        display: "none"
      }
    },
    contentLinkMap: {
      marginTop: 20,
      width: "100%"
    },
    linkMapForm: {
      marginTop: 10,
      marginBottom: 10,
      width: "100%",
      height: 200,
      alignSelf: "center"
    },
    linkMapLink: {
      "&::hover": {
        cursor: "pointer"
      }
    }
  }),
);

export default Create;