import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';

const AlertaAtencao = (props) => {

    const [open, setOpen] = useState(true);

    const tipoAlerta = () => {
        let tipo = '';
        switch (props.tipoAlerta) {
            case 'success':
                tipo = 'Sucesso!';
                break;
            case 'warning':
                tipo = 'Atênção!';
                break;
            case 'error':
                tipo = 'Erro!';
                break;
            case 'info':
                tipo = 'Informação!';
                break;
            default:
                tipo = '';
                break;
        }
        return tipo;
    }

    return (
        <>
            {
                open && tipoAlerta(props.tipoAlerta) ?
                    <Alert
                        severity={props.tipoAlerta}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}>
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        <AlertTitle>{tipoAlerta(props.tipoAlerta)}</AlertTitle>
                        {props.mensagem}
                        <strong>{props.causa}</strong>
                    </Alert>
                    :
                    null
            }
        </>
    )
}

export default AlertaAtencao;