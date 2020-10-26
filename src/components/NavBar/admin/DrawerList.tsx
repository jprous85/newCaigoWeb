import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleAltOutlined from '@material-ui/icons/PeopleAltOutlined';
import FormatListBulletedOutlined from '@material-ui/icons/FormatListBulletedOutlined';
import {useTranslation} from "react-i18next";
import Divider from '@material-ui/core/Divider';
import Account from "../../../utils/traits/Account";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const DrawerList = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const account = new Account();

  const logout = () => {
    history.push("/");
  }

  return (
    <List component="nav" className={classes.root} aria-label="contacts">

      <ListItem button component={Link} to={"/users"}>
        <ListItemIcon>
          <PeopleAltOutlined />
        </ListItemIcon>
        <ListItemText primary={t('users')} />
      </ListItem>

      <ListItem button component={Link} to={"/events"}>
        <ListItemIcon>
          <FormatListBulletedOutlined/>
        </ListItemIcon>
        <ListItemText primary={t('events')} />
      </ListItem>
      <Divider/>
      <ListItem button onClick={() => logout()}>
        <ListItemIcon>
          <ExitToAppIcon/>
        </ListItemIcon>
        <ListItemText primary={t('logout')} />
      </ListItem>
    </List>
  );
}

export default DrawerList;