import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { TextField, Grid, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  grid: {
    width: "100%"
  }
}));

const Search = ({ search }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    departureCity: "",
    departureDate: ""
  });

  const { departureCity, departureDate } = formData;

  const handleChangeFormData = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async e => {
    e.preventDefault();
    search(formData);
  };
  return (
    <form onSubmit={submitForm} noValidate>
      <Grid container spacing={2} className={classes.gridContainer}>
        <Grid item xs={12} md={3}>
          <input
            type="date"
            name="departureDate"
            value={departureDate}
            onChange={handleChangeFormData}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={handleChangeFormData}
            name="departureCity"
            value={departureCity}
            className={classes.grid}
            label="Ville de départ"
            required
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            type="submit"
            className={classes.buttonSave}
            variant="contained"
            color="primary"
          >
            Rechercher
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Search;
