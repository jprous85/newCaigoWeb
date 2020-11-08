import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import Carousel from "./Carousel";
import Descriptions from "./Descriptions";
import {useTranslation} from "react-i18next";
import Information from "./Information";
import SocialMedia from "./SocialMedia";
import ReactMap from "../../../components/MapView/ReactMap";

const Simulator = (props: any) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const {event, setEvent} = props;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Carousel
          {...props}
        />
        <div className={classes.contentEvent}>
          <p className={classes.categories}>
            {event.categories && t(`category-filter-${event.categories}`)}
          </p>
          <h4 className={classes.title}>{event.title}</h4>

          <Information
            {...props}
          />

          <SocialMedia
            {...props}
          />

          {event.description &&
          <Descriptions
            title={"Description"}
            bodyText={event.description}
          />}

          {event.descriptionCovid &&
          <Descriptions
            title={"Description Covid"}
            bodyText={event.descriptionCovid}
          />}

          <div className={classes.linkMapForm}>
            <ReactMap
              setValues={setEvent}
              values={event}
              options
            />
          </div>

        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    container: {
      position: "fixed",
      width: 240,
      height: 475,
      borderRadius: 10,
      overflowY: "auto",
      "&::-webkit-scrollbar": {
        display: "none"
      }
    },
    contentEvent: {
      position: "absolute",
      top: 150,
      width: "91%",
      height: "10%",
      borderRadius: 10,
      backgroundColor: "white",
      paddingRight: 10,
      paddingLeft: 10,
    },
    title: {
      marginTop: -10
    },
    categories: {
      color: '#5a5a5a',
      marginTop: 16,
      fontSize: 15
    },
    linkMapForm: {
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: 150,
      height: 100
    }
  }),
);

export default Simulator;