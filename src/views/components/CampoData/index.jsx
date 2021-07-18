import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(1),
        justifyContent: 'center',
        alignItems: 'center'
    },
}));

const CampoData = (props) => {
    const classes = useStyles();

    const [tipo, setTipo] = useState("text");

    const ajustaData = (dataOriginal) => {
        dataOriginal ?
            props.alterarTexto(format(new Date(dataOriginal), 'yyyy-MM-dd', { locale: pt }))
            :
            props.alterarTexto("");
    }

    return (
        <TextField
            className={classes.root}
            id="filled-basic"
            label={props.titulo}
            value={props.valor}
            type={tipo}
            onChange={(event) => ajustaData(event.target.value)}
            onFocus={() => setTipo("date")}
            onBlur={() => { props.valor ? setTipo("date") : setTipo("text") }}
            variant="filled" />
    );
}

export default CampoData;