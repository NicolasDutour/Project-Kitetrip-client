import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, Typography, Button } from "@material-ui/core";

import homeImage from "../../assets/img/home1.jpg";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${homeImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    height: "calc(100vh - 54px)"
  },
  paper: {
    padding: theme.spacing(2, 4),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  title: {
    color: "white",
    [theme.breakpoints.down("sm")]: {
      fontSize: "32px"
    }
  },
  titleLink: {
    color: "white",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px"
    }
  },
  homeContainer: {
    height: "100%"
  },
  homeWrapper: {
    height: "100%"
  },
  buttonTrips: {
    margin: theme.spacing(3, 2),
    color: "white"
  },
  buttonTripsLink: {
    color: "white",
    textDecoration: "none",
    textTransform: "Capitalize"
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="md" className={classes.homeContainer}>
        <Grid
          container
          spacing={3}
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.homeWrapper}
        >
          <Typography variant="h2" className={classes.title}>
            Bienvenue sur Kite Trip
          </Typography>
          <Button
            className={classes.buttonTrips}
            variant="contained"
            color="primary"
          >
            <Link className={classes.buttonTripsLink} to="/trips">
              <Typography variant="h5" className={classes.titleLink}>
                Trouvez votre Kite Session
              </Typography>
            </Link>
          </Button>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
