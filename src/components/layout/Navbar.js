import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Avatar,
  SvgIcon,
  CircularProgress,
  IconButton,
  Grid
} from "@material-ui/core";

import { logout } from "../../actions/auth";

const useStyles = makeStyles(theme => ({
  menuButton: {
    [theme.breakpoints.up("lg")]: {
      display: "none"
    }
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    color: "#fff"
  },
  link: {
    fontSize: "1rem",
    textTransform: "capitalize",
    color: "#FFFFFF",
    "&:hover": {
      color: "#ECEFF1"
    },
    textDecoration: "none"
  },
  linkWrapper: {
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  }
}));

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export const Navbar = ({
  auth: { isAuthenticated, user, loading },
  logout
}) => {
  const classes = useStyles();

  const userLinks = user && (
    <Fragment>
      <Button>
        <Link className={classes.link} to="/createTrip">
          <Typography>Proposer un trajet </Typography>
        </Link>
      </Button>
      <Button>
        <Link className={classes.link} to="/profile">
          <Typography>Profil de {user.firstName} </Typography>
        </Link>
      </Button>
      <Button>
        <Typography className={classes.link} onClick={logout}>
          Se déconnecter
        </Typography>
      </Button>
      <Avatar className={classes.avatar}>
        {" "}
        {user.firstName.charAt(0).toUpperCase()}
        {user.lastName.charAt(0).toUpperCase()}{" "}
      </Avatar>
      {user.isAdmin === true && (
        <Button>
          <Link className={classes.link} to="/admin">
            Admin
          </Link>
        </Button>
      )}
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Button>
        <Link className={classes.link} to="/login">
          Se connecter
        </Link>
      </Button>
      <Button>
        <Link className={classes.link} to="/register">
          S'enregistrer
        </Link>
      </Button>
    </Fragment>
  );

  return (
    <AppBar position="static">
      <Container fixed>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/">
              <HomeIcon color="secondary" style={{ fontSize: 40 }} />
            </Link>
          </Typography>
          <Grid className={classes.buttonMobile} container justify="flex-end">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid className={classes.linkWrapper} container justify="flex-end">
            <Button>
              <Link className={classes.link} to="/trips">
                Trajets
              </Link>
            </Button>
            {loading ? (
              <CircularProgress color="secondary" />
            ) : isAuthenticated ? (
              userLinks
            ) : (
              guestLinks
            )}
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
