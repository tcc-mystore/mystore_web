import React, { useState } from 'react';
import { Alert } from 'reactstrap';

const AlertaAtencao = (props) => {

    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);

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
            <Alert color={props.tipoAlerta} isOpen={visible} toggle={onDismiss}>
                {tipoAlerta(props.tipoAlerta) + ' ' + props.mensagem}
            </Alert>
        </>
    )
}

export default AlertaAtencao;