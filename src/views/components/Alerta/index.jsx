import React, { useRef, useEffect } from 'react';
import { Messages } from 'primereact/messages';

const AlertaAtencao = (props) => {

    const mensagem = useRef(null);

    const tipoAlerta = () => {
        let tipo = '';
        switch (props.tipoAlerta) {
            case 'success':
                tipo = 'Sucesso!';
                break;
            case 'warn':
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

    useEffect(() => {
        props.tipoAlerta && mensagem.current.show({ 
            severity: props.tipoAlerta, 
            summary: <div>{tipoAlerta(props.tipoAlerta)}</div>, 
            detail: <div>{props.mensagem}</div>, 
            sticky: true });
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <>
            <Messages ref={mensagem} />
        </>
    )
}

export default AlertaAtencao;