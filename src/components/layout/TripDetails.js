import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Avatar,
  Paper,
  Divider,
  Container,
  CircularProgress,
  Breadcrumbs,
  Button,
  TextField,
  Chip
} from "@material-ui/core";

import {
  createComment,
  getTrip,
  deleteComment,
  addPassenger
} from "../../actions/trip";

import moment from "moment";
import "moment/locale/fr";

moment.locale("fr");

const useStyles = makeStyles(theme => ({
  paperTrip: {
    padding: theme.spacing(2, 2),
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  title: {
    marginBottom: theme.spacing(3)
  },
  titleCities: {
    marginBottom: theme.spacing(2),
    textAlign: "center"
  },
  dateSession: {
    paddingTop: theme.spacing(2)
  },
  description: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2, 2),
    borderTopColor: "black",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderBottomStyle: "solid"
  },
  link: {
    textDecoration: "none"
  },
  breadcrumbs: {
    marginTop: theme.spacing(3)
  },
  placesLeft: {
    fontSize: 22,
    color: theme.palette.secondary.main
  },
  carBrand: {
    textTransform: "capitalize"
  },
  carColor: {
    textTransform: "capitalize"
  },
  comment: {
    width: "100%",
    margin: theme.spacing(2, 0)
  },
  paperComment: {
    padding: theme.spacing(2, 2),
    marginTop: theme.spacing(3)
  },
  buttonSave: {
    margin: theme.spacing(2, 0)
  },
  buttonCancel: {
    margin: theme.spacing(2, 2),
    color: "white",
    backgroundColor: theme.palette.secondary.main
  },
  buttonCancelLink: {
    color: "white",
    textDecoration: "none"
  },
  buttonConnectLink: {
    color: "white",
    textDecoration: "none"
  },
  commentPaper: {
    marginLeft: theme.spacing(6),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2)
  },
  dateComment: {
    fontSize: 14,
    marginLeft: 10
  },
  titleComment: {
    marginTop: theme.spacing(3)
  },
  messageNotAuth: {
    margin: theme.spacing(3)
  },
  deleteCommentButton: {
    margin: theme.spacing(2, 0),
    backgroundColor: theme.palette.secondary.main
  }
}));

const TripDetail = ({
  createComment,
  addPassenger,
  getTrip,
  trip: { trip, loading },
  auth: { isAuthenticated, user },
  match
}) => {
  const classes = useStyles();

  useEffect(() => {
    getTrip(match.params.id);
  }, [getTrip, match.params.id]);

  const [text, setText] = useState("");

  const handleChangeFormData = e => {
    setText(e.target.value);
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const submitForm = async e => {
    e.preventDefault();
    createComment(trip._id, { text });
    setText("");
  };

  return (
    <Container maxWidth="md">
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
        className={classes.breadcrumbs}
      >
        <Link color="inherit" to="/trips">
          Tous les trajets
        </Link>
        <Typography color="textPrimary">
          {trip && trip.departureCity} - {trip && trip.destinationCity}
        </Typography>
      </Breadcrumbs>
      <Paper className={classes.paperTrip}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container>
            <Grid item xs={6}>
              <Typography className={classes.title} variant="h6" component="h6">
                {trip && moment(trip.departureDate).format("dddd DD MMMM YYYY")}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                className={classes.titleCities}
                variant="h5"
                component="h2"
              >
                {trip && trip.departureCity.charAt(0).toUpperCase()}
                {trip && trip.departureCity.slice(1)} -{" "}
                {trip && trip.destinationCity.charAt(0).toUpperCase()}
                {trip && trip.destinationCity.slice(1)}
              </Typography>
            </Grid>
            <Grid container justify="center" alignItems="center" item xs={2}>
              <Avatar
                alt="Remy Sharp"
                src="./avatar.jpg"
                className={classes.large}
              />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h6">{trip && trip.driver}</Typography>
              <Typography paragraph>
                Voiture:{" "}
                <span className={classes.carBrand}>
                  {trip && trip.carBrand}
                </span>{" "}
                <span className={classes.carColor}>
                  {trip && trip.carColor}
                </span>
              </Typography>
              <Grid container>
                <Grid item xs={9}>
                  Il reste{" "}
                  <span className={classes.placesLeft}>
                    {trip && trip.totalPlaces - trip.passengers.length}
                  </span>{" "}
                  place
                  {trip && trip.totalPlaces > 1 ? "s" : ""}
                </Grid>
                <Grid item xs={3}>
                  {(user && !isAuthenticated) ||
                  "" ||
                  (user && trip.user === user._id) ||
                  (trip.passengers.length > 0 &&
                    trip.passengers.filter(
                      passenger => passenger._id === user._id
                    )) ||
                  (trip && trip.totalPlaces - trip.passengers.length === 0) ? (
                    ""
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => addPassenger(trip._id)}
                    >
                      M'ajouter
                    </Button>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5" className={classes.titleComment}>
                    Passagers :
                  </Typography>
                  {isAuthenticated ? (
                    trip &&
                    trip.passengers.map(passenger => (
                      <Chip
                        key={passenger._id}
                        avatar={
                          <Avatar
                            alt={passenger.kiter}
                            src="/static/images/avatar/1.jpg"
                          />
                        }
                        label={passenger.kiter}
                        color="primary"
                        onDelete={handleDelete}
                      />
                    ))
                  ) : (
                    <Fragment>
                      <Typography
                        variant="body2"
                        className={classes.messageNotAuth}
                      >
                        Pour s'ajouter et voir les passagers veuillez vous
                        connecter
                      </Typography>
                      <Button variant="contained" color="primary">
                        <Link className={classes.buttonConnectLink} to="/login">
                          Se Connecter
                        </Link>
                      </Button>
                    </Fragment>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Divider />
            <Grid item xs={12}>
              <Typography className={classes.description}>
                {trip && trip.description}
              </Typography>
              <Typography variant="h5" className={classes.titleComment}>
                Commentaires :
              </Typography>
              {isAuthenticated ? (
                trip &&
                trip.comments.map(comment => (
                  <Paper key={comment._id} className={classes.commentPaper}>
                    <Typography variant="h6">
                      {comment.kiter}{" "}
                      <span className={classes.dateComment}>
                        le{" "}
                        {moment(comment.createdAt).format("dddd DD MMMM YYYY")}
                      </span>
                    </Typography>
                    <Typography className={classes.commentText}>
                      {comment.text}
                    </Typography>
                    <Button
                      onClick={deleteComment(trip._id, comment._id)}
                      className={classes.deleteCommentButton}
                      variant="contained"
                      color="primary"
                    >
                      Supprimer
                    </Button>
                  </Paper>
                ))
              ) : (
                <Fragment>
                  <Typography
                    variant="body2"
                    className={classes.messageNotAuth}
                  >
                    Pour ajouter et voir les commentaires veuillez vous
                    connecter
                  </Typography>
                  <Button variant="contained" color="primary">
                    <Link className={classes.buttonConnectLink} to="/login">
                      Se Connecter
                    </Link>
                  </Button>
                </Fragment>
              )}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" className={classes.dateSession}>
                Session créée le{" "}
                {trip && moment(trip.createdAt).format("dddd DD MMMM YYYY")}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Paper>
      {isAuthenticated && (
        <Grid item xs={12}>
          <Paper className={classes.paperComment}>
            <form onSubmit={submitForm}>
              <Grid className={classes.gridContainer} container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleChangeFormData}
                    name="text"
                    value={text}
                    className={classes.comment}
                    label="Commentaires"
                    multiline
                    rows="4"
                    placeholder="Ecrivez un commentaire , posez une question à votre chauffeur"
                    InputLabelProps={{
                      shrink: true
                    }}
                    required
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                className={classes.buttonSave}
                variant="contained"
                color="primary"
              >
                Ajouter
              </Button>
              <Button
                className={classes.buttonCancel}
                variant="contained"
                color="primary"
              >
                <Link className={classes.buttonCancelLink} to="/trips">
                  Annuler
                </Link>
              </Button>
            </form>
          </Paper>
        </Grid>
      )}
    </Container>
  );
};

const mapStateToProps = state => ({
  trip: state.trip,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getTrip,
  createComment,
  deleteComment,
  addPassenger
})(TripDetail);
