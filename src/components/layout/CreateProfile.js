import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import {
  TextField,
  Grid,
  Container,
  Button,
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  Paper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { createProfile } from "../../actions/profile";

import { MobilePhoneMask, PostalCodeMask } from "../../helpers/CustomMask";

const genders = [
  {
    value: "male",
    label: "Monsieur"
  },
  {
    value: "female",
    label: "Madame"
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 50
  },
  grid: {
    width: "100%"
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
  }
}));

const CreateProfile = ({ createProfile, history }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    gender: "",
    description: "",
    mobilePhone: "",
    numberAddress: "",
    streetAddress: "",
    postalCode: "",
    city: "",
    carBrand: "",
    carColor: "",
    totalPlaces: ""
  });

  const {
    gender,
    description,
    mobilePhone,
    numberAddress,
    streetAddress,
    postalCode,
    city,
    carBrand,
    carColor,
    totalPlaces
  } = formData;

  const handleChangeFormData = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Paper className={classes.paper}>
          <form onSubmit={submitForm} noValidate>
            <Grid className={classes.gridContainer} container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Genre"
                  size="small"
                  variant="outlined"
                  name="gender"
                  onChange={handleChangeFormData}
                  value={gender}
                  InputLabelProps={{
                    shrink: true
                  }}
                >
                  {genders.map(gender => (
                    <MenuItem key={gender.value} value={gender.value}>
                      {gender.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChangeFormData}
                  value={description}
                  name="description"
                  className={classes.grid}
                  label="Description"
                  multiline
                  rows="4"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <InputLabel htmlFor="formatted-text-mask-input">
                    Téléphone Mobile
                  </InputLabel>
                  <Input
                    name="mobilePhone"
                    value={mobilePhone}
                    onChange={handleChangeFormData}
                    inputComponent={MobilePhoneMask}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  onChange={handleChangeFormData}
                  value={numberAddress}
                  name="numberAddress"
                  label="Numéro de rue"
                  type="number"
                  required
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} md={9}>
                <TextField
                  onChange={handleChangeFormData}
                  value={streetAddress}
                  name="streetAddress"
                  className={classes.grid}
                  label="Nom de rue"
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl>
                  <InputLabel htmlFor="formatted-text-mask-input">
                    Code Postal
                  </InputLabel>
                  <Input
                    name="postalCode"
                    value={postalCode}
                    onChange={handleChangeFormData}
                    inputComponent={PostalCodeMask}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  onChange={handleChangeFormData}
                  value={city}
                  name="city"
                  className={classes.grid}
                  label="Ville"
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  onChange={handleChangeFormData}
                  value={carBrand}
                  name="carBrand"
                  className={classes.grid}
                  label="Marque de voiture"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  onChange={handleChangeFormData}
                  value={carColor}
                  name="carColor"
                  className={classes.grid}
                  label="Couleur"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  onChange={handleChangeFormData}
                  value={totalPlaces}
                  name="totalPlaces"
                  id="standard-number"
                  label="Nombre de places disponibles"
                  type="number"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              className={classes.buttonSave}
              variant="contained"
              color="primary"
            >
              Sauvegarder
            </Button>
            <Button
              className={classes.buttonCancel}
              variant="contained"
              color="primary"
            >
              <Link className={classes.buttonCancelLink} to="/profile">
                Annuler
              </Link>
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  createProfile: (
    gender,
    description,
    mobilePhone,
    numberAddress,
    streetAddress,
    postalCode,
    city,
    carBrand,
    carColor,
    carPlateNumber,
    totalPlaces
  ) =>
    dispatch(
      createProfile(
        gender,
        description,
        mobilePhone,
        numberAddress,
        streetAddress,
        postalCode,
        city,
        carBrand,
        carColor,
        carPlateNumber,
        totalPlaces
      )
    )
});

export default connect(null, mapDispatchToProps)(withRouter(CreateProfile));
