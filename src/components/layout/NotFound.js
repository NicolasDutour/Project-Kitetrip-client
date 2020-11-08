import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    height: "calc(100vh - 54px)"
  },
  title: {
    color: "red",
    marginBottom: theme.spacing(2)
  },
  homeContainer: {
    height: "100%"
  },
  homeWrapper: {
    height: "100%"
  }
}));

const NotFound = () => {
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
            ERREUR !
          </Typography>
          <Typography variant="h3" className={classes.title}>
            Cette page n'existe pas !
          </Typography>
        </Grid>
      </Container>
    </div>
  );
};

export default NotFound;
