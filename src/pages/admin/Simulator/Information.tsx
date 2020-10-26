import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme, Icon, Grid} from "@material-ui/core";
import EventIcon from '@material-ui/icons/Event';
import ScheduleIcon from '@material-ui/icons/Schedule';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';

import { CORPORATIVE_ROSE } from '../../../utils/Constants';
import {prepareSimulatorDate} from "../../../utils/Functions";
import {useTranslation} from "react-i18next";

const Information = (props: any) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const {event} = props;
  const day = prepareSimulatorDate(event, "date");
  return (
    <div>
      <Grid container>
        {(event.start_time && event.end_time) && <>
          <Grid item xs={12}>
            <EventIcon
              className={classes.icons}
            />
            <span className={classes.span}>{`${t(day.dayOfWeek)} ${day.day} de ${t(day.month)}`}</span>
          </Grid>
          <Grid item xs={12}>
            <ScheduleIcon
              className={classes.icons}
            />
            <span className={classes.span}>{prepareSimulatorDate(event, "hours")}</span>
          </Grid>
          </>}
        {!isNaN(event.price) &&
        <Grid item xs={12}>
          <LocalAtmIcon
            className={classes.icons}
          />
          <span className={classes.span}>{t('fromPrice', {price: event.price})}</span>
        </Grid>
        }
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icons: {
      marginLeft: 10,
      marginRight: 10,
      fontSize: 18,
      color: CORPORATIVE_ROSE
    },
    span: {
      position: "relative",
      bottom: 5,
      fontSize: 13
    }
  })
);

export default Information;