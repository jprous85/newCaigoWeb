import React from "react";
import {Divider, ListItemIcon, Menu, MenuItem} from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {useTranslation} from "react-i18next";

const MenuProfile = (props: any) => {
  const { anchorEl, setAnchorEl } = props;
  const { t } = useTranslation();
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      id={"account-menu-dropdown"}
      keepMounted
      transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <ListItemIcon>
          <AccountBoxIcon/>
        </ListItemIcon>
        {t('profile')}
      </MenuItem>
      <Divider/>
      <MenuItem>
        <ListItemIcon>
          <ExitToAppIcon/>
        </ListItemIcon>
        {t('logout')}
      </MenuItem>
    </Menu>
  );
}

export default MenuProfile;