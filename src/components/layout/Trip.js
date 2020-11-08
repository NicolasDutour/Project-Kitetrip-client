import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Avatar, Paper, Divider } from "@material-ui/core";

import moment from "moment";
import "moment/locale/fr";

moment.locale("fr");

const useStyles = makeStyles(theme => ({
  paperTrip: {
    padding: theme.spacing(1, 1),
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  titleDate: {
    marginBottom: theme.spacing(2)
  },
  titleCities: {
    marginBottom: theme.spacing(2),
    textAlign: "center"
  },
  dateSession: {
    paddingTop: theme.spacing(2)
  },
  divider: {
    marginBottom: theme.spacing(2)
  },
  description: {
    padding: theme.spacing(2, 2)
  },
  link: {
    textDecoration: "none"
  },
  placesLeft: {
    fontSize: 22,
    color: theme.palette.secondary.main
  }
}));

const Trip = ({ trip }) => {
  const classes = useStyles();
  return (
    <Link to={`/tripDetail/${trip._id}`} className={classes.link}>
      <Paper className={classes.paperTrip}>
        <Grid container>
          <Grid item xs={6}>
            <Typography
              className={classes.titleDate}
              variant="h6"
              component="h6"
            >
              {moment(trip.departureDate).format("dddd DD MMMM YYYY")}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              className={classes.titleCities}
              variant="h5"
              component="h2"
            >
              {trip.departureCity.charAt(0).toUpperCase()}
              {trip.departureCity.slice(1)} -{" "}
              {trip.destinationCity.charAt(0).toUpperCase()}
              {trip.destinationCity.slice(1)}
            </Typography>
          </Grid>
          <Grid container justify="center" alignItems="center" item xs={2}>
            <Avatar
              alt={trip.driver}
              src="./avatar.jpg"
              className={classes.large}
            />
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h6">{trip.driver}</Typography>
            <Grid container>
              <Grid item xs={12}>
                Il reste{" "}
                <span className={classes.placesLeft}>
                  {trip && trip.totalPlaces - trip.passengers.length}
                </span>{" "}
                place{trip.totalPlaces - trip.passengers.length > 1 ? "s" : ""}
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Grid item xs={12}>
            <Typography variant="body2" className={classes.dateSession}>
              Session créée le{" "}
              {moment(trip.createdAt).format("dddd DD MMMM YYYY")}{" "}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Link>
  );
};

export default Trip;
