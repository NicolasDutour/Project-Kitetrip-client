import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import Search from "./Search";

import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

import Trip from "./Trip";
import { getTrips, searchTrip } from "../../actions/trip";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  title: {
    marginBottom: theme.spacing(3)
  },
  buttonSave: {
    margin: theme.spacing(3, 0)
  },
  underTitle: {
    margin: theme.spacing(3, 0)
  },
  textButton: {
    color: "white",
    textDecoration: "none"
  }
}));

const Trips = ({ getTrips, trip: { trips, loading }, searchTrip }) => {
  const classes = useStyles();

  useEffect(() => {
    getTrips();
  }, [getTrips]);

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Search search={searchTrip} />
        {trips.length > 0 && (
          <Fragment>
            {trips.map(trip => (
              <Trip key={trip._id} trip={trip} />
            ))}
          </Fragment>
        )}
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    trip: state.trip
  };
};

export default connect(mapStateToProps, { getTrips, searchTrip })(Trips);
