import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Container,
  Button,
  Typography,
  Paper,
  Avatar,
  Divider,
  CircularProgress
} from "@material-ui/core";

import { getCurrentProfile, deleteAccount } from "../../actions/profile";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 50
  },
  paperAccount: {
    padding: theme.spacing(2, 3),
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  paperDetailsInfos: {
    padding: theme.spacing(2, 3),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    display: "flex",
    flexDirection: "column"
  },
  grid: {
    width: "100%"
  },
  avatar: {
    marginRight: theme.spacing(3)
  },
  textButton: {
    color: "white",
    textDecoration: "none"
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  buttonSave: {
    margin: theme.spacing(3, 0)
  },
  buttonDeleteAccount: {
    margin: theme.spacing(3, 2),
    backgroundColor: theme.palette.secondary.main
  },
  title: {
    marginBottom: theme.spacing(3)
  },
  divider: {
    marginBottom: theme.spacing(2)
  },
  underTitle: {
    margin: theme.spacing(3, 0)
  },
  capitalize: {
    textTransform: "capitalize"
  }
}));

const Profile = ({
  getProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const classes = useStyles();

  const hasProfile = user && profile && (
    <Fragment>
      <Paper className={classes.paperAccount}>
        <Grid container justify="space-between">
          <Grid className={classes.title} item>
            <Typography variant="h5" component="h2">
              Mon Compte
            </Typography>
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
            >
              Modifier
            </Button>
          </Grid>
          <Grid container justify="flex-start">
            <Grid item className={classes.avatar}>
              <Avatar
                alt={user.firstName}
                src="./avatar.jpg"
                className={classes.large}
              />
            </Grid>
            <Grid item>
              <Typography paragraph className={classes.capitalize}>
                Prénom: {user.firstName}
              </Typography>
              <Typography paragraph className={classes.capitalize}>
                Nom: {user.lastName}
              </Typography>
              <Typography paragraph>Email: {user.email}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paperDetailsInfos}>
        <Grid container justify="space-between">
          <Grid className={classes.title}>
            <Typography variant="h5" component="h2">
              Informations Personnelles
            </Typography>
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
            >
              <Link className={classes.textButton} to="/editProfile">
                Modifier
              </Link>
            </Button>
          </Grid>
        </Grid>
        <Typography paragraph>Portable: {profile.mobilePhone}</Typography>
        <Divider className={classes.divider} />
        <Typography variant="h6" component="h3">
          Adresse
        </Typography>
        <Typography paragraph className={classes.capitalize}>
          {profile.numberAddress} {profile.streetAddress}
        </Typography>
        <Typography paragraph className={classes.capitalize}>
          {profile.postalCode} {profile.city}
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant="h6" component="h3">
          Voiture
        </Typography>
        <Typography paragraph className={classes.capitalize}>
          {profile.carBrand} {profile.carColor}
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant="h6" component="h3">
          Description
        </Typography>
        <Typography paragraph>{profile.description}</Typography>
      </Paper>
    </Fragment>
  );

  const hasNotProfile = (
    <Fragment>
      <Typography className={classes.underTitle} variant="h6">
        Vous n'avez pas encore de profil
      </Typography>
      <Button
        className={classes.buttonSave}
        variant="contained"
        color="primary"
      >
        <Link className={classes.textButton} to="/createProfile">
          Créer un profil
        </Link>
      </Button>
    </Fragment>
  );

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        {loading && profile === null ? (
          <CircularProgress />
        ) : (
          <Fragment>
            {" "}
            <Typography variant="h5" component="h2">
              Bonjour {user && user.firstName}
            </Typography>{" "}
            {profile !== null ? hasProfile : hasNotProfile}
            <Button
              onClick={deleteAccount}
              className={classes.buttonDeleteAccount}
              variant="contained"
              color="primary"
            >
              Supprimer mon compte
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
  deleteAccount: () => dispatch(deleteAccount())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
