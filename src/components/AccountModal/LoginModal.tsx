import React, {useState} from "react";
import {
  Dialog,
  DialogContentText,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Slide,
  TextField,
  createStyles,
  makeStyles,
  Theme,
  Divider, InputAdornment, IconButton, OutlinedInput, InputLabel, FormControl
} from "@material-ui/core";
import {TransitionProps} from "@material-ui/core/transitions";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import Account from "../../utils/traits/Account";
import {useHistory} from "react-router-dom";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

interface LoginModalState {
  email: string,
  password: string
}

const LoginModal = (props: any) => {
  const { showAccountModal, setShowAccountModal, setUid } = props;
  const [values, setValues] = useState<LoginModalState>({
    email: '',
    password: ''
  });
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  let code_login = '';

  const account = new Account();
  const classes = useStyles();

  const handleAccountModal = () => {
    setShowAccountModal(!showAccountModal);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const _handleLoginForm = () => {

    account.login(values.email, values.password)
      .then((e: any) => {
        if (e.operationType === 'signIn') {
          setShowAccountModal(false);
          code_login = e.user.uid;
          setUid(code_login);
          window.localStorage.setItem('c_uid', code_login);
          history.push("/admin");
        }
        if (e.code === 'auth/wrong-password') {
          code_login = 'auth/wrong-password';
        }
      });
  }

  return (
    <Dialog
      open={showAccountModal}
      keepMounted
      TransitionComponent={Transition}
      onClose={handleAccountModal}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{"Enter in your account"}</DialogTitle>
      <DialogContent>
        <form className={classes.root} autoComplete="on" onSubmit={_handleLoginForm}>
          <TextField id="outlined-basic"
                     label="Email"
                     variant="outlined"
                     value={values.email}
                     onChange={(e: any) => {
                       setValues({...values, email: `${e.target.value}`});
                     }}
          />
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={(e: any) => {
                setValues({...values, password: `${e.target.value}`});
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility/> : <VisibilityOff/>}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </form>
        <Divider className={classes.divider}/>
        <DialogContentText id="alert-dialog-slide-description">
          <small>There is not an account?, please, register here.</small>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAccountModal} color="primary">
          Disagree
        </Button>
        <Button onClick={_handleLoginForm} color="primary">
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '95%',
      },
    },
    divider: {
      margin: theme.spacing(1),
    }
  }),
);

export default LoginModal;