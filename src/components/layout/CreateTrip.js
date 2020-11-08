import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  TextField,
  Grid,
  Container,
  Button,
  Paper,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import "moment/locale/fr";

import { createTrip } from "../../actions/trip";
import { getCurrentProfile } from "../../actions/profile";

moment.locale("fr");

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 50
  },
  textButton: {
    color: "white",
    textDecoration: "none"
  },
  grid: {
    width: "100%"
  },
  button: {
    margin: theme.spacing(3, 0)
  },
  buttonSave: {
    margin: theme.spacing(3, 0)
  },
  buttonCancel: {
    margin: theme.spacing(3, 2)
  },
  buttonCancelLink: {
    color: "white",
    textDecoration: "none"
  },
  paper: {
    padding: theme.spacing(3, 4),
    marginTop: theme.spacing(2)
  },
  buttonsWrapper: {
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
      justifyContent: "center"
    }
  }
}));

const CreateTrip = ({
  getProfile,
  createTrip,
  history,
  auth: { user },
  profile: { profile }
}) => {
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const classes = useStyles();

  const [formData, setFormData] = useState({
    description: "",
    departureCity: "",
    destinationCity: "",
    departureDate: ""
  });

  const {
    description,
    departureCity,
    destinationCity,
    departureDate
  } = formData;

  const handleChangeFormData = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async e => {
    e.preventDefault();
    createTrip(formData, history);
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        {user && profile ? (
          <Paper className={classes.paper}>
            <form onSubmit={submitForm} noValidate>
              <Grid className={classes.gridContainer} container spacing={2}>
                <Grid item xs={12}>
                  <input
                    type="date"
                    name="departureDate"
                    value={departureDate}
                    onChange={handleChangeFormData}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    onChange={handleChangeFormData}
                    name="departureCity"
                    value={departureCity}
                    className={classes.grid}
                    label="Ville de départ"
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    onChange={handleChangeFormData}
                    name="destinationCity"
                    value={destinationCity}
                    className={classes.grid}
                    label="Ville d'arrivée"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleChangeFormData}
                    name="description"
                    value={description}
                    className={classes.grid}
                    label="Description"
                    multiline
                    rows="4"
                    placeholder="Détaillez ici le lieu de RDV précis et autres informations utiles"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                <Grid item container xs={12} className={classes.buttonsWrapper}>
                  <Grid item>
                    <Button
                      type="submit"
                      className={classes.buttonSave}
                      variant="contained"
                      color="primary"
                    >
                      Créer un trajet
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      className={classes.buttonCancel}
                      variant="contained"
                      color="primary"
                    >
                      <Link className={classes.buttonCancelLink} to="/trips">
                        Annuler
                      </Link>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Paper>
        ) : (
          <Fragment>
            <Typography variant="h6">
              Vous devez avoir un profil pour créer un trajet
            </Typography>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
            >
              <Link className={classes.textButton} to="/createProfile">
                Créer un profil
              </Link>
            </Button>
          </Fragment>
        )}
      </Container>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(getCurrentProfile()),
  createTrip: (
    description,
    departureCity,
    destinationCity,
    departureDateTime
  ) =>
    dispatch(
      createTrip(description, departureCity, destinationCity, departureDateTime)
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTrip);
