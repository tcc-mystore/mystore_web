import React from 'react';
import { Button, Tooltip } from 'reactstrap';
import PrintIcon from '@material-ui/icons/Print';

const BotaoImprimir = (props) => {
    return (
        <>
            <Button id="idImprimir"
                className="btn btn-light btn-sm m-1">
                <PrintIcon />
            </Button>
            <Tooltip placement="top" target="idImprimir">
                Imprimir Registro
            </Tooltip>
        </>
    );
};

export default BotaoImprimir;