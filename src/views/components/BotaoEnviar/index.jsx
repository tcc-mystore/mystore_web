import React, { useState } from 'react';
import { Button, Spinner, Tooltip } from 'reactstrap';
import SendIcon from '@material-ui/icons/Send';

const BotaoEnviar = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    if (props.aguardando) {
        return (
            <>
                <Button
                    id="idEnviar"
                    color="primary"
                    className="btn btn-lg" disabled>
                    Aguarde
                <Spinner className="ml-1" size="sm" color="light" />
                </Button>
                <Tooltip placement="top" isOpen={tooltipOpen} target="idEnviar" toggle={toggle}>
                    Processando a envio...
                </Tooltip>
            </>
        )
    }

    return (
        <>
            <Button id="idEnviar"
                color="primary"
                className="btn btn-lg" onClick={props.onClickEnviar} disabled={props.desabilitado}>
                <SendIcon />
                <span className="text-white ml-1">Enviar</span>
            </Button>
            <Tooltip placement="top" isOpen={tooltipOpen} target="idEnviar" toggle={toggle}>
                Confirmar Enviar
            </Tooltip>
        </>
    )

};

export default BotaoEnviar;