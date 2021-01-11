import React, { useContext } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import Link from "@material-ui/core/Link";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
// import { authContext } from "../../../contexts/AuthContext/AuthContext";
import '../SignUp/SignUp.css'
import { authContext } from "../../contexts/AuthContext";
import Navibar from "../Navibar/Navibar";
import { Link } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Kitep.kg
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1517414204284-fb7e98b2e255?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '70vh'
  },
  paper: {
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    borderRadius: " 5%",
    padding: "5%"
  },
  input: {
    marginTop: "20px"
  }
}));

const SignIn = (props) => {
  const { loginUser, hasAccount } = useContext(authContext)
  const classes = useStyles();

  return (
    <>
      {/* <Navibar /> */}
      <Grid className={classes.root}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <form onSubmit={(e) => loginUser(e, props.history)} className={classes.form}>
              <Typography component="h1" variant="h5">
                Вход
        </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    className={classes.input}
                    variant="outlined"
                    required
                    fullwidth="true"
                    id="email"
                    label="Адрес электронной почты"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.input}
                    variant="outlined"
                    required
                    fullwidth="true"
                    name="password"
                    label="Пароль"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />

                </Grid>
              </Grid>
              <Link to="/signup">
                <p style={{textDecoration: 'none'}}>Впервые у нас? Зарегистрируйтесь!</p>
              </Link>
              <button
                style={{ marginTop: "25px" }}
                type="submit"
                fullwidth="true"
                variant="contained"
                className={classes.submit}
              >
                Войти
          </button>
              {/* <Grid container>
              <Grid item>
                <Link onClick={() => hasnotAccount(props.history)} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </Grid>
    </>
  );
}

export default SignIn