import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(1),
        justifyContent: 'center',
        alignItems: 'center'
    },
}));

const CampoNumero = (props) => {
    const classes = useStyles();
    return (
        <TextField
            className={classes.root}
            id="filled-basic"
            label={props.titulo}
            value={props.valor}
            onChange={(val) => { props.alterarTexto(val.target.value) }}
            variant="filled" />
    );
}

export default CampoNumero;