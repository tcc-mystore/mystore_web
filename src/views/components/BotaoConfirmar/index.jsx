import React, { useState } from 'react';
import { Button, Spinner, Tooltip } from 'reactstrap';
import CheckIcon from '@material-ui/icons/Check';

const BotaoConfirmar = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    if (props.aguardando) {
        return (
            <>
                <Button
                    id="idConfirmar"
                    className="btn btn-success btn-lg" disabled>
                    Aguarde
                <Spinner className="ml-1" size="sm" color="light" />
                </Button>
                <Tooltip placement="top" isOpen={tooltipOpen} target="idConfirmar" toggle={toggle}>
                    Processando a confirmação...
                </Tooltip>
            </>
        )
    }

    return (
        <>
            <Button id="idConfirmar"
                className="btn btn-success mr-1 btn-lg">
                <CheckIcon />
                <span className="text-white"> Confirmar</span>
            </Button>
            <Tooltip placement="top" isOpen={tooltipOpen} target="idConfirmar" toggle={toggle}>
                Confirmar Operação
            </Tooltip>
        </>
    )

};

export default BotaoConfirmar;