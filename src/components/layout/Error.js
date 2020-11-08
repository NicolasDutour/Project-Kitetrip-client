import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  error: {
    width: "100%",
    marginTop: theme.spacing(1)
  }
}));

const Error = ({ errors }) => {
  const classes = useStyles();
  return (
    <div>
      {errors !== null &&
        errors.length > 0 &&
        errors.map(error => (
          <Alert
            className={classes.error}
            key={error.id}
            variant="filled"
            severity={error.errorType}
          >
            {error.msg}
          </Alert>
        ))}
    </div>
  );
};

const mapStateToProps = state => ({
  errors: state.error
});

export default connect(mapStateToProps)(Error);
