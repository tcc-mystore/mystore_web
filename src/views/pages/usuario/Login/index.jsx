import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(0),
    },
    submit: {
        margin: theme.spacing(0, 0, 0),
    },
}));

const Login = () => {
    const classes = useStyles();
    return (
        <>
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="E-mail"
                    name="email"
                    type="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Senha"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Entrar
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link to="/recuperar-senha" variant="body2">
                            Esqueceu a senha?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/criar-conta" variant="body2">
                            Criar conta
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}
export default Login;