import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {
  Paper,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  IconButton,
  InputLabel,
  InputAdornment,
  FormControl,
  OutlinedInput,
  Container
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import { makeStyles } from "@material-ui/core/styles";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { login } from "../../actions/auth";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 4),
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  title: {
    marginBottom: 10
  },
  forgotPasswordGrid: {
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(3),
      justifyContent: "center"
    }
  }
}));

const Login = ({ login, isAuthenticated }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [values, setValues] = useState({
    showPassword: false
  });

  const { email, password } = formData;

  const handleChangeFormData = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const submitForm = async e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography className={classes.title} component="h1" variant="h5">
          Se Connecter
        </Typography>
        <form onSubmit={submitForm} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            autoComplete="email"
            autoFocus
            name="email"
            onChange={handleChangeFormData}
            value={email}
          />
          <FormControl variant="outlined" fullWidth margin="normal" required>
            <InputLabel htmlFor="outlined-adornment-password">
              Mot de passe
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              onChange={handleChangeFormData}
              name="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={110}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Se connecter
          </Button>
          <Grid container>
            <Grid
              container
              item
              className={classes.forgotPasswordGrid}
              xs={12}
              md={6}
            >
              <Link to="/" variant="body2">
                Mot de passe oublié ?
              </Link>
            </Grid>
            <Grid
              container
              item
              className={classes.forgotPasswordGrid}
              xs={12}
              md={6}
            >
              Pas encore de compte ?{" "}
              <Link to="/register" variant="body2">
                {" "}
                S'enregistrer
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
