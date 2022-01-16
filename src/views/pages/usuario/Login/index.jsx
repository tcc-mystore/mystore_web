import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ModalCarregando from '../../../components/ModalCarregando';
import Alerta from '../../../components/Alerta';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(0),
    },
    submit: {
        margin: theme.spacing(0, 0, 0),
    },
}));

const Login = (props) => {
    const classes = useStyles();

    const [aguardando, setAguardando] = useState(false);
    const [email, setEmail] = useState("paulistensetecnologia@gmail.com");
    const [senha, setSenha] = useState("123456");
    const [alerta, setAlerta] = useState("");
    const [mensagem, setMensagem] = useState("");

    const logar = (e) => {
        e.preventDefault();
        setAguardando(true);
        props.handleLogin({ email, senha }, (retorno) => {
            if (retorno.erro) {
                if (retorno.erro.mensagem) {
                    setAlerta("error");
                    setMensagem(retorno.erro.mensagem);
                }
                if (retorno.erro.status === 401) {
                    setAlerta("warning");
                    setMensagem("Acesso negado ou dados incorretos!");
                }
                setAguardando(false);
            } else {
                setAlerta("");
                setMensagem("");
                setAguardando(false);
            }
        });
    }

    return (
        <>
            <Alerta tipoAlerta={alerta} mensagem={mensagem} />
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            <form className={classes.form} noValidate onSubmit={logar}>
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
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
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
                    value={senha}
                    onChange={(ev) => setSenha(ev.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={!email || !senha}
                >
                    Entrar
                </Button>
                <ModalCarregando aguardando={aguardando} pagina="Entrando no sistema" />
                <Grid container>
                    <Grid item xs>
                        <Link to="/mystore/recuperar-senha" variant="body2">
                            Esqueceu a senha?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/mystore/criar-conta" variant="body2">
                            Criar conta
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

export default Login;