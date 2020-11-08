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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { register } from "../../actions/auth";
import { setError } from "../../actions/error";

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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  title: {
    marginBottom: 10
  }
}));

const Register = ({ register, setError, isAuthenticated }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleChangeFormData = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [values, setValues] = useState({
    showPassword: false
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const submitForm = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Les mots de passe doivent être identiques", "error");
    } else {
      register(firstName, lastName, email, password);
    }
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
          S'enregistrer
        </Typography>
        <form onSubmit={submitForm} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Prénom"
                autoFocus
                onChange={handleChangeFormData}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Nom"
                name="lastName"
                autoComplete="lname"
                onChange={handleChangeFormData}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={handleChangeFormData}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                fullWidth
                margin="normal"
                required
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Mot de passe
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={password}
                  name="password"
                  onChange={handleChangeFormData}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={110}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                variant="outlined"
                onChange={handleChangeFormData}
                name="confirmPassword"
                value={confirmPassword}
                className={classes.grid}
                id="outlined-password-input"
                label="Confirmer mot de passe"
                type="password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            S'enregistrer
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              Déjà un compte ?{" "}
              <Link to="/login" variant="body2">
                {" "}
                Se connecter
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
  register: (firstName, lastName, email, password) =>
    dispatch(register(firstName, lastName, email, password)),
  setError: (msg, errorType) => dispatch(setError(msg, errorType))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
